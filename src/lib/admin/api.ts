import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '@/lib/auth/options';

/**
 * Server-side session guard for admin API handlers. Middleware already blocks
 * unauthenticated requests, but every mutation re-checks here (defense in
 * depth — ground rule: guard server-side, not just at the edge).
 */
export async function requireAdmin(): Promise<boolean> {
  const session = await getServerSession(authOptions);
  return !!session;
}

export const unauthorized = () => NextResponse.json({ error: 'unauthorized' }, { status: 401 });
export const ok = (data: unknown) => NextResponse.json(data);
export const badRequest = (error: string) => NextResponse.json({ error }, { status: 400 });
export const conflict = (error: string, extra: Record<string, unknown> = {}) =>
  NextResponse.json({ error, ...extra }, { status: 409 });
