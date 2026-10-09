import { test } from 'node:test';
import assert from 'node:assert/strict';
import worker from './worker.mjs';

const env = {
  ALLOWED_ORIGINS: 'https://joinoac.in,https://www.joinoac.in',
  GOOGLE_SHEETS_WEBHOOK_URL: 'https://script.google.com/macros/s/test/exec',
  WEBHOOK_TOKEN: 'private-token',
  SUBMISSION_LIMITER: { limit: async () => ({ success: true }) },
};
const input = {
  id: '6095d1ad-5085-42d9-bdcb-e6a1bc69ec20', form_type: 'member',
  name: ' Test Member ', email: 'test@example.com', phone: '+919000000000',
};
function request(body = input, { origin = 'https://joinoac.in', method = 'POST', path = '/submit' } = {}) {
  return new Request(`https://oac-forms.example.workers.dev${path}`, {
    method, headers: { Origin: origin, 'Content-Type': 'application/json', 'CF-Connecting-IP': '192.0.2.1' },
    ...(method === 'POST' ? { body: JSON.stringify(body) } : {}),
  });
}

test('saves all four categories using the existing Apps Script contract', async (t) => {
  const forwarded = [];
  t.mock.method(globalThis, 'fetch', async (url, options) => {
    assert.equal(typeof url, 'string');
    assert.equal(new URL(url).searchParams.get('token'), 'private-token');
    forwarded.push(JSON.parse(options.body));
    return Response.json({ ok: true });
  });
  for (const form_type of ['member', 'partner', 'stall', 'collab']) {
    const response = await worker.fetch(request({ ...input, form_type, organization: 'OAC Test' }), env);
    assert.equal(response.status, 200);
    assert.equal(response.headers.get('Access-Control-Allow-Origin'), 'https://joinoac.in');
    assert.equal((await response.json()).id, input.id);
  }
  assert.deepEqual(forwarded.map((payload) => payload.record.form_type), ['member', 'partner', 'stall', 'collab']);
  for (const payload of forwarded) {
    assert.equal(payload.type, 'INSERT');
    assert.equal(payload.table, 'join_requests');
    assert.equal(payload.schema, 'public');
    assert.equal(payload.record.name, 'Test Member');
    assert.ok(Date.parse(payload.record.created_at));
    assert.equal(payload.record.id, input.id);
  }
});

test('rejects invalid fields without forwarding them', async (t) => {
  const fetchMock = t.mock.method(globalThis, 'fetch', async () => { throw new Error('Must not forward'); });
  for (const invalid of [
    { phone: ' ' }, { name: ' ' }, { email: 'bad-email' }, { form_type: 'unknown' },
    { id: 'bad-id' }, { message: 'a'.repeat(4001) }, { city: {} },
    { portfolio_url: 'javascript:alert(1)' }, { form_type: 'partner', organization: '' },
    { form_type: 'stall', organization: '' },
  ]) {
    assert.equal((await worker.fetch(request({ ...input, ...invalid }), env)).status, 400);
  }
  assert.equal(fetchMock.mock.callCount(), 0);
});

test('permits optional phone for non-members and drops unknown fields', async (t) => {
  t.mock.method(globalThis, 'fetch', async (_, options) => {
    const payload = JSON.parse(options.body);
    assert.equal(payload.record.phone, '');
    assert.equal(payload.record.admin, undefined);
    return Response.json({ ok: true, duplicate: true });
  });
  assert.equal((await worker.fetch(request({ ...input, form_type: 'collab', phone: '', admin: true }), env)).status, 200);
});

test('handles origins, preflight, method and route restrictions', async () => {
  assert.equal((await worker.fetch(request(input, { origin: 'https://attacker.example' }), env)).status, 403);
  const preflight = await worker.fetch(request(input, { method: 'OPTIONS' }), env);
  assert.equal(preflight.status, 204);
  assert.equal(preflight.headers.get('Access-Control-Allow-Headers'), 'Content-Type');
  assert.equal((await worker.fetch(request(input, { method: 'GET' }), env)).status, 405);
  assert.equal((await worker.fetch(request(input, { path: '/other' }), env)).status, 404);
});

test('rejects missing configuration and rate-limited requests', async () => {
  assert.equal((await worker.fetch(request(), { ...env, WEBHOOK_TOKEN: '' })).status, 503);
  assert.equal((await worker.fetch(request(), { ...env, SUBMISSION_LIMITER: undefined })).status, 503);
  const limited = { ...env, SUBMISSION_LIMITER: { limit: async () => ({ success: false }) } };
  assert.equal((await worker.fetch(request(), limited)).status, 429);
});

test('does not report success for Google errors, login HTML, or timeouts', async (t) => {
  for (const result of [
    () => Response.json({ ok: false }),
    () => new Response('<html>Sign in</html>'),
    () => Response.json({ ok: true }, { status: 500 }),
    () => { throw new Error('Timed out; private-token'); },
  ]) {
    const mock = t.mock.method(globalThis, 'fetch', async () => result());
    const response = await worker.fetch(request(), env);
    assert.equal(response.status, 502);
    assert.equal((await response.text()).includes('private-token'), false);
    mock.mock.restore();
  }
});

test('rejects malformed JSON and oversized requests', async () => {
  const headers = { Origin: 'https://joinoac.in', 'Content-Type': 'application/json' };
  const malformed = new Request('https://worker.example/submit', { method: 'POST', headers, body: '{' });
  assert.equal((await worker.fetch(malformed, env)).status, 400);
  assert.equal((await worker.fetch(request({ ...input, extra: 'a'.repeat(17000) }), env)).status, 413);
});

test('reports actionable Google deployment errors without leaking the token', async (t) => {
  for (const [text, status, code] of [
    ['Script function not found: doPost', 200, 'script_missing_doPost'],
    ['Error: Unauthorized', 200, 'script_unauthorized'],
    ['accounts.google.com/ServiceLogin', 200, 'script_login_required'],
    ['Forbidden', 403, 'google_http_403'],
    ['<html>Script error</html>', 200, 'script_invalid_response'],
  ]) {
    const mock = t.mock.method(globalThis, 'fetch', async () => new Response(text, { status }));
    const response = await worker.fetch(request(), env);
    assert.equal(response.status, 502);
    assert.equal((await response.json()).code, code);
    mock.mock.restore();
  }
});
