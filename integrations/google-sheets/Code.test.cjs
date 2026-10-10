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
      setFrozenRows() {}, setColumnWidths() {}, setColumnWidth() {},
      getRange: (row, col, height = 1, width = 1) => {
        const range = {
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
    console: { log() {} },
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
  const post = (record, token = 'test-token') => context.doPost({
    parameter: { token }, postData: { contents: JSON.stringify({
      type: 'INSERT', schema: 'public', table: 'join_requests', record,
    }) },
  });
  return { tabs, post, context, releases: () => releases };
}

const record = { id: 'test-id', created_at: '2026-10-09T12:00:00Z', name: 'Test', email: 'test@example.com', phone: '+919000000000' };

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
  assert.deepEqual(f.tabs.Members.rows[1], previous);
  assert.deepEqual(f.tabs.Members.rows[0].slice(0, 10), headings);
  assert.deepEqual(f.tabs.Members.rows[0].slice(10), ['Submission ID', 'Message']);
  for (const volunteering of ['Yes', 'No', 'Maybe']) {
    const entry = { ...record, id: `test-${volunteering}`, form_type: 'member', city: 'Bhubaneswar', social_media_id: '@new', age_range: '18–24', referral: 'Instagram', message: `Interested in volunteering: ${volunteering}\n\nHello` };
    f.post(entry);
    const row = f.tabs.Members.rows.at(-1);
    assert.equal(row[1], record.email);
    assert.equal(row[2], record.name);
    assert.equal(row[3], "'+919000000000");
    assert.deepEqual(row.slice(4, 9), ["'@new", 'Bhubaneswar', '18–24', '', 'Instagram']);
    assert.equal(row[9], volunteering);
    assert.equal(row[10], entry.id);
    assert.equal(row[11], entry.message);
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
  assert.deepEqual(f.tabs.Members.rows[1], previous);
  assert.deepEqual(f.tabs.Members.rows[0].slice(0, 5), headings);
  f.post({ ...record, form_type: 'member', city: 'New College', age_range: '25–34' });
  const headers = f.tabs.Members.rows[0];
  const row = f.tabs.Members.rows[2];
  assert.equal(row[3], 'New College');
  assert.equal(row[4], '25–34');
  assert.equal(row[headers.indexOf('Submitted At')].getTime(), Date.parse(record.created_at));
  assert.equal(f.post({ ...record, form_type: 'member' }).duplicate, true);
});
