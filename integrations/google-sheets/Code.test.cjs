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
      appendRow: (row) => rows.push(row),
      setFrozenRows() {}, setColumnWidths() {}, setColumnWidth() {},
      getRange: (row, col) => {
        const range = {
          setBackground: () => range, setFontColor: () => range,
          setFontWeight: () => range, setNumberFormat: () => range,
          setValues: (values) => { rows[row - 1] = values[0]; return range; },
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
