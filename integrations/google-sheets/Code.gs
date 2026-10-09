const FORM_TABS = {
  member: 'Members',
  partner: 'Partners',
  stall: 'Stalls',
  collab: 'Creators',
};
const FIELDS = ['id', 'created_at', 'name', 'email', 'phone', 'city', 'organization', 'stall_type', 'portfolio_url', 'message'];
const HEADERS = ['Submission ID', 'Submitted At', 'Full Name', 'Email', 'Phone', 'City', 'Organization / Stall', 'Stall Type', 'Portfolio / Social Link', 'Message'];

// Set SPREADSHEET_ID in Script Properties before running setup.
function setup() {
  const properties = PropertiesService.getScriptProperties();
  const id = properties.getProperty('SPREADSHEET_ID');
  if (!id) throw new Error('Set SPREADSHEET_ID in Script Properties first.');
  const book = SpreadsheetApp.openById(id);
  book.setSpreadsheetTimeZone('Asia/Kolkata');
  Object.values(FORM_TABS).forEach(function (name) {
    const sheet = book.getSheetByName(name) || book.insertSheet(name);
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
      sheet.getRange(1, 1, 1, HEADERS.length).setBackground('#D91515').setFontColor('#FFFFFF').setFontWeight('bold');
      sheet.setFrozenRows(1);
      sheet.setColumnWidths(1, HEADERS.length, 180);
      sheet.setColumnWidth(10, 360);
    }
  });
  if (!properties.getProperty('WEBHOOK_TOKEN')) {
    properties.setProperty('WEBHOOK_TOKEN', Utilities.getUuid() + Utilities.getUuid());
  }
  console.log(book.getUrl());
}

function doPost(e) {
  const properties = PropertiesService.getScriptProperties();
  const token = properties.getProperty('WEBHOOK_TOKEN');
  if (!token || !e || !e.parameter || e.parameter.token !== token) {
    throw new Error('Unauthorized');
  }
  const payload = JSON.parse(e.postData.contents);
  if (payload.type !== 'INSERT' || payload.table !== 'join_requests' || payload.schema !== 'public') {
    throw new Error('Unsupported event');
  }
  const record = payload.record;
  const tab = record && Object.prototype.hasOwnProperty.call(FORM_TABS, record.form_type)
    ? FORM_TABS[record.form_type] : null;
  if (!tab || !record.id || !record.name || !record.email) throw new Error('Invalid submission');
  if (record.form_type === 'member' && !String(record.phone || '').trim()) {
    throw new Error('Member phone required');
  }
  const lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try {
    const book = SpreadsheetApp.openById(properties.getProperty('SPREADSHEET_ID'));
    const sheet = book.getSheetByName(tab);
    if (!sheet) throw new Error('Run setup first');
    const lastRow = sheet.getLastRow();
    const duplicate = lastRow > 1 && sheet.getRange(2, 1, lastRow - 1, 1)
      .createTextFinder(String(record.id)).matchEntireCell(true).useRegularExpression(false).findNext();
    if (!duplicate) {
      const values = FIELDS.map(function (field) {
        if (field === 'created_at') {
          const date = new Date(record[field]);
          if (isNaN(date.getTime())) throw new Error('Invalid submission date');
          return date;
        }
        const value = String(record[field] == null ? '' : record[field]);
        // Treat user input as text, including phone prefixes and formula characters.
        return /^[\s]*[=+\-@]/.test(value) ? "'" + value : value;
      });
      const nextRow = lastRow + 1;
      sheet.getRange(nextRow, 1, 1, FIELDS.length).setNumberFormat('@');
      sheet.getRange(nextRow, 1, 1, FIELDS.length).setValues([values]);
      sheet.getRange(nextRow, 2).setNumberFormat('dd/MM/yyyy HH:mm');
      SpreadsheetApp.flush();
    }
    return ContentService.createTextOutput(JSON.stringify({ ok: true, duplicate: Boolean(duplicate) }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}
