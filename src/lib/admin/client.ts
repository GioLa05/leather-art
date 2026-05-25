'use client';

/** Thin fetch helpers for the admin API. */

export async function getJSON<T>(url: string): Promise<T> {
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) throw new Error(`GET ${url} → ${res.status}`);
  return res.json();
}

export interface MutationResult {
  ok: boolean;
  status: number;
  data: unknown;
}

export async function sendJSON(
  url: string,
  method: 'PUT' | 'POST' | 'DELETE',
  body: unknown,
): Promise<MutationResult> {
  const res = await fetch(url, {
    method,
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  return { ok: res.ok, status: res.status, data };
}
