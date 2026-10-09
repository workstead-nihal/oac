const fields = {
  name: 120, email: 254, phone: 40, city: 120, organization: 200,
  stall_type: 100, portfolio_url: 2048, message: 4000,
};
const forms = ['member', 'partner', 'stall', 'collab'];

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin');
    const allowed = (env.ALLOWED_ORIGINS || '').split(',').map((value) => value.trim());
    const headers = { 'Content-Type': 'application/json', 'Cache-Control': 'no-store', Vary: 'Origin' };
    const reply = (status, body) => new Response(JSON.stringify(body), { status, headers });
    if (!origin || !allowed.includes(origin)) return reply(403, { error: 'Origin not allowed' });
    headers['Access-Control-Allow-Origin'] = origin;
    headers['Access-Control-Allow-Methods'] = 'POST, OPTIONS';
    headers['Access-Control-Allow-Headers'] = 'Content-Type';
    if (new URL(request.url).pathname !== '/submit') return reply(404, { error: 'Not found' });
    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers });
    if (request.method !== 'POST') return reply(405, { error: 'Use POST' });
    if (!env.GOOGLE_SHEETS_WEBHOOK_URL || !env.WEBHOOK_TOKEN || !env.SUBMISSION_LIMITER) {
      return reply(503, { error: 'Submissions are temporarily unavailable' });
    }
    const { success } = await env.SUBMISSION_LIMITER.limit({
      key: request.headers.get('CF-Connecting-IP') || 'local',
    });
    if (!success) return reply(429, { error: 'Please wait a minute before trying again' });
    if (!request.headers.get('Content-Type')?.startsWith('application/json')) {
      return reply(415, { error: 'Use JSON' });
    }
    if (Number(request.headers.get('Content-Length')) > 16384) {
      return reply(413, { error: 'Submission is too large' });
    }
    let input;
    try {
      const body = await request.text();
      if (new TextEncoder().encode(body).length > 16384) return reply(413, { error: 'Submission is too large' });
      input = JSON.parse(body);
    } catch {
      return reply(400, { error: 'Invalid JSON' });
    }
    if (!input || !forms.includes(input.form_type) ||
      typeof input.id !== 'string' || !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(input.id)) {
      return reply(400, { error: 'Invalid submission' });
    }
    const record = { id: input.id, form_type: input.form_type, created_at: new Date().toISOString() };
    for (const [field, maxLength] of Object.entries(fields)) {
      const value = input[field] ?? '';
      if (typeof value !== 'string' || value.length > maxLength) return reply(400, { error: `Invalid ${field}` });
      record[field] = value.trim();
    }
    if (!record.name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(record.email)) {
      return reply(400, { error: 'Please enter your name and a valid email address' });
    }
    if (record.form_type === 'member' && !record.phone) return reply(400, { error: 'Member phone number is required' });
    if (['partner', 'stall'].includes(record.form_type) && !record.organization) {
      return reply(400, { error: 'Organization or stall name is required' });
    }
    if (record.portfolio_url) {
      try {
        if (!['https:', 'http:'].includes(new URL(record.portfolio_url).protocol)) throw new Error();
      } catch {
        return reply(400, { error: 'Please enter a valid portfolio URL' });
      }
    }
    try {
      const url = new URL(env.GOOGLE_SHEETS_WEBHOOK_URL);
      if (url.origin !== 'https://script.google.com' || !url.pathname.endsWith('/exec')) throw new Error();
      url.searchParams.set('token', env.WEBHOOK_TOKEN);
      // Retain the deployed script's INSERT envelope; Supabase is no longer involved.
      const response = await fetch(url, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'INSERT', schema: 'public', table: 'join_requests', record }),
        signal: AbortSignal.timeout(25000),
      });
      const result = await response.json();
      if (!response.ok || result.ok !== true) throw new Error();
      return reply(200, { ok: true, id: record.id });
    } catch {
      return reply(502, { error: 'Could not confirm your submission. Please retry or email info@joinoac.in' });
    }
  },
};
