const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');

function load(endpoint, fetch) {
  const source = fs.readFileSync(`${__dirname}/submissions.ts`, 'utf8')
    .replace('import.meta.env.VITE_FORMS_ENDPOINT', 'globalThis.endpoint');
  const code = ts.transpile(source, { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.CommonJS });
  const context = { exports: {}, endpoint, fetch, AbortSignal };
  vm.runInNewContext(code, context);
  return context.exports.submitJoinRequest;
}

test('sends payload to Worker and only accepts confirmed success', async () => {
  const payload = { id: 'test-id', name: 'Test' };
  const submit = load('https://worker.example/submit', async (url, options) => {
    assert.equal(url, 'https://worker.example/submit');
    assert.equal(options.method, 'POST');
    assert.deepEqual(JSON.parse(options.body), payload);
    return Response.json({ ok: true });
  });
  await submit(payload);
});

test('surfaces configuration and backend failures instead of success', async () => {
  await assert.rejects(load('', async () => { throw new Error('Unexpected fetch'); })({}), /unavailable/);
  await assert.rejects(load('https://worker.example/submit', async () =>
    Response.json({ error: 'Member phone number is required' }, { status: 400 }))({}), /phone number is required/);
  await assert.rejects(load('https://worker.example/submit', async () => Response.json({ ok: false }))({}), /Could not confirm/);
  await assert.rejects(load('https://worker.example/submit', async () => { throw new Error('Network failure'); })({}), /Network failure/);
});
