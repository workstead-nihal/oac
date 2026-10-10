const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

function fixture() {
  const tabs = {};
  const properties = { SPREADSHEET_ID: 'test-sheet', WEBHOOK_TOKEN: 'test-token' };
  const makeSheet = () => {
    const rows = [];
    return {
      rows,
      getLastRow: () => rows.length,
      getLastColumn: () => Math.max(0, ...rows.map((row) => row.length)),
      appendRow: (row) => rows.push([...row]),
      moveColumns: (range, destination) => {
        rows.forEach((row) => {
          while (row.length < rows[0].length) row.push('');
          const [value] = row.splice(range.column - 1, 1);
          row.splice(destination - 1, 0, value);
        });
      },
      setFrozenRows() {}, setColumnWidths() {}, setColumnWidth() {},
      getRange: (row, col, height = 1, width = 1) => {
        const range = {
          column: col,
          setBackground: () => range, setFontColor: () => range,
          setFontWeight: () => range, setNumberFormat: () => range,
          getValues: () => Array.from({ length: height }, (_, i) => Array.from({ length: width }, (_, j) => rows[row - 1 + i]?.[col - 1 + j] ?? '')),
          setValues: (values) => {
            values.forEach((valuesRow, i) => {
              rows[row - 1 + i] ||= [];
              valuesRow.forEach((value, j) => { rows[row - 1 + i][col - 1 + j] = value; });
            });
            return range;
          },
          createTextFinder: (id) => {
            const finder = {
              matchEntireCell: () => finder, useRegularExpression: () => finder,
              findNext: () => rows.slice(1).find((values) => values[col - 1] === id),
            };
            return finder;
          },
        };
        return range;
      },
    };
  };
  const book = {
    setSpreadsheetTimeZone() {}, getUrl: () => 'test-url',
    getSheetByName: (name) => tabs[name],
    insertSheet: (name) => (tabs[name] = makeSheet()),
  };
  let releases = 0;
  const context = {
    console: { log() {}, error() {} },
    PropertiesService: { getScriptProperties: () => ({
      getProperty: (key) => properties[key], setProperty: (key, value) => { properties[key] = value; },
    }) },
    SpreadsheetApp: { openById: () => book, flush() {} },
    LockService: { getScriptLock: () => ({ waitLock() {}, releaseLock: () => releases++ }) },
    Utilities: { getUuid: () => 'uuid' },
    ContentService: { MimeType: { JSON: 'json' }, createTextOutput: (text) => ({ setMimeType: () => JSON.parse(text) }) },
  };
  vm.createContext(context);
  vm.runInContext(fs.readFileSync(`${__dirname}/Code.gs`, 'utf8'), context);
  context.setup();
  const post = (record, token = 'test-token') => context.saveSubmission({
    parameter: { token }, postData: { contents: JSON.stringify({
      type: 'INSERT', schema: 'public', table: 'join_requests', record,
    }) },
  });
  return { tabs, post, context, releases: () => releases };
}

const record = { id: 'test-id', created_at: '2026-10-09T12:00:00Z', name: 'Test', email: 'test@example.com', phone: '+919000000000' };

test('recognizes current unnumbered member columns without adding duplicates', () => {
  const f = fixture();
  const headings = ['Submission ID', 'Submitted At', 'Email Address', 'Full Name', 'Mobile Number', 'Instagram handle', 'College/School & Place', 'Age range', 'How did you find us?', 'Want to volunteer?', 'Message'];
  f.tabs.Members.rows.splice(0, f.tabs.Members.rows.length, [...headings]);
  f.context.setup();
  assert.deepEqual(f.tabs.Members.rows[0], headings);
  f.post({ ...record, form_type: 'member', social_media_id: 'test_handle', city: 'Test College', age_range: '18–24', referral: 'Friend', message: 'Interested in volunteering: Yes\n\nHello' });
  const row = f.tabs.Members.rows[1];
  assert.equal(row[0], record.id);
  assert.equal(row[1].getTime(), Date.parse(record.created_at));
  assert.deepEqual(row.slice(2), [record.email, record.name, "'+919000000000", 'test_handle', 'Test College', '18–24', 'Friend', 'Yes', 'Hello']);
});

test('returns safe JSON for script failures instead of Google HTML', () => {
  const f = fixture();
  assert.equal(f.context.doPost().error, 'Unauthorized');
  const event = { parameter: { token: 'test-token' }, postData: { contents: JSON.stringify({ type: 'INSERT', schema: 'public', table: 'join_requests', record: { ...record, form_type: 'member' } }) } };
  delete f.tabs.Members;
  assert.equal(f.context.doPost(event).error, 'Run setup first');
  event.postData.contents = 'private malformed input';
  const result = f.context.doPost(event);
  assert.equal(result.ok, false);
  assert.equal(JSON.stringify(result).includes('private malformed input'), false);
});

test('routes all four categories to separate tabs and deduplicates deliveries', () => {
  const f = fixture();
  for (const [form_type, tab] of Object.entries({ member: 'Members', partner: 'Partners', stall: 'Stalls', collab: 'Creators' })) {
    assert.equal(f.post({ ...record, form_type }).ok, true);
    assert.equal(f.tabs[tab].rows.length, 2);
    assert.equal(f.post({ ...record, form_type }).duplicate, true);
    assert.equal(f.tabs[tab].rows.length, 2);
  }
  f.context.setup();
  assert.equal(Object.keys(f.tabs).length, 4);
  assert.equal(f.tabs.Members.rows.length, 2);
});

test('rejects unauthorized requests, unknown categories and blank member phones', () => {
  const f = fixture();
  assert.throws(() => f.post({ ...record, form_type: 'member' }, 'wrong'), /Unauthorized/);
  assert.throws(() => f.post({ ...record, form_type: 'unknown' }), /Invalid submission/);
  assert.throws(() => f.post({ ...record, form_type: 'member', phone: '  ' }), /phone required/);
  assert.equal(f.tabs.Members.rows.length, 1);
  assert.equal(f.post({ ...record, form_type: 'partner', phone: '' }).ok, true);
});

test('preserves phone prefixes and neutralizes spreadsheet formulas', () => {
  const f = fixture();
  f.post({ ...record, form_type: 'member', message: '=IMPORTXML("example")' });
  const row = f.tabs.Members.rows[1];
  assert.equal(row[4], "'+919000000000");
  assert.equal(row[9], '\'=IMPORTXML("example")');
  assert.equal(row[1].getTime(), Date.parse(record.created_at));
  assert.equal(f.releases(), 1);
});

test('releases lock when writing fails', () => {
  const f = fixture();
  assert.throws(() => f.post({ ...record, form_type: 'member', created_at: 'bad-date' }), /Invalid submission date/);
  assert.equal(f.releases(), 1);
  assert.equal(f.tabs.Members.rows.length, 1);
});

test('supports previous member headings while preserving extra columns and old rows', () => {
  const f = fixture();
  const headings = ['Timestamp', 'Email Address', '1. Full Name ', '2. Mobile Number', '3. Instagram handle  ', '4. College/School & Place', '5. Age range  ', '6. Interests  ', '7. How did you find us? ', '8. Want to volunteer?  '];
  const previous = ['Old timestamp', 'old@example.com', 'Old Member', '0123456789', '@old', 'College', '18–25', 'Art', 'Friend', 'Yes'];
  f.tabs.Members.rows.splice(0, f.tabs.Members.rows.length, [...headings], [...previous]);
  f.context.setup();
  assert.deepEqual(f.tabs.Members.rows[1].slice(2, 11), previous.slice(1));
  assert.deepEqual(f.tabs.Members.rows[0], ['Submission ID', 'Timestamp', ...headings.slice(1), 'Message']);
  for (const volunteering of ['Yes', 'No', 'Maybe']) {
    const entry = { ...record, id: `test-${volunteering}`, form_type: 'member', city: 'Bhubaneswar', social_media_id: '@new', age_range: '18–24', referral: 'Instagram', message: `Interested in volunteering: ${volunteering}\n\nHello` };
    f.post(entry);
    const row = f.tabs.Members.rows.at(-1);
    assert.equal(row[2], record.email);
    assert.equal(row[3], record.name);
    assert.equal(row[4], "'+919000000000");
    assert.deepEqual(row.slice(5, 10), ["'@new", 'Bhubaneswar', '18–24', '', 'Instagram']);
    assert.equal(row[10], volunteering);
    assert.equal(row[0], entry.id);
    assert.equal(row[11], 'Hello');
    assert.equal(f.post(entry).duplicate, true);
  }
  assert.equal(f.tabs.Members.rows.length, 5);
  f.context.setup();
  assert.equal(f.tabs.Members.rows[0].length, 12);
});

test('setup restores a missing timestamp without moving imported member data', () => {
  const f = fixture();
  const headings = ['Email Address', '1. Full Name', '2. Mobile Number', '4. College/School & Place', '5. Age range'];
  const previous = ['old@example.com', 'Old Member', '0123456789', 'College', '18–24'];
  f.tabs.Members.rows.splice(0, f.tabs.Members.rows.length, [...headings], [...previous]);
  f.context.setup();
  assert.deepEqual(f.tabs.Members.rows[1].slice(2, 7), previous);
  assert.deepEqual(f.tabs.Members.rows[0].slice(0, 7), ['Submission ID', 'Submitted At', ...headings]);
  f.post({ ...record, form_type: 'member', city: 'New College', age_range: '25–34' });
  const headers = f.tabs.Members.rows[0];
  const row = f.tabs.Members.rows[2];
  assert.equal(row[5], 'New College');
  assert.equal(row[6], '25–34');
  assert.equal(row[headers.indexOf('Submitted At')].getTime(), Date.parse(record.created_at));
  assert.equal(f.post({ ...record, form_type: 'member' }).duplicate, true);
});
