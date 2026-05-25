/**
 * Serialize a plain JS value to a TypeScript source literal. Output is compact;
 * Prettier reformats it on write. Used to regenerate the data arrays/objects in
 * src/data/*.ts and src/i18n/translations.ts from the in-memory admin model.
 *
 * Only handles JSON-ish values (string, number, boolean, null, arrays, plain
 * objects) — which is everything the editable data files contain.
 */
export function serialize(value: unknown): string {
  if (value === null) return 'null';
  if (value === undefined) return 'undefined';
  const t = typeof value;
  if (t === 'number') {
    if (!Number.isFinite(value as number)) throw new Error('cannot serialize non-finite number');
    return String(value);
  }
  if (t === 'boolean') return String(value);
  if (t === 'string') return quoteString(value as string);
  if (Array.isArray(value)) return `[${value.map(serialize).join(', ')}]`;
  if (t === 'object') {
    const entries = Object.entries(value as Record<string, unknown>)
      .filter(([, v]) => v !== undefined)
      .map(([k, v]) => `${objectKey(k)}: ${serialize(v)}`);
    return `{ ${entries.join(', ')} }`;
  }
  throw new Error(`cannot serialize value of type ${t}`);
}

/** A bare identifier when valid, otherwise a quoted key. */
function objectKey(k: string): string {
  return /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(k) ? k : quoteString(k);
}

/** Single-quoted string literal with the minimal escaping needed. */
export function quoteString(s: string): string {
  return `'${s.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, '\\n').replace(/\r/g, '\\r')}'`;
}

/** Build a string-literal union type from a list of keys. */
export function unionType(keys: string[]): string {
  if (keys.length === 0) return 'never';
  return keys.map((k) => quoteString(k)).join(' | ');
}
