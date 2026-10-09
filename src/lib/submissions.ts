const endpoint = import.meta.env.VITE_FORMS_ENDPOINT;

export async function submitJoinRequest(payload: Record<string, string>) {
  if (!endpoint) throw new Error('Submissions are currently unavailable. Please email info@joinoac.in.');
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(35000),
  });
  const result = await response.json();
  if (!response.ok || result.ok !== true) {
    throw new Error(result.error || 'Could not confirm your submission. Please try again.');
  }
}
