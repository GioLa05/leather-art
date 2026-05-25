import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

/**
 * Protects the admin panel and its API. Unauthenticated `/admin/*` requests
 * redirect to /admin/login; unauthenticated `/api/admin/*` requests get 401.
 * Authenticated users hitting /admin/login bounce to the dashboard.
 *
 * This is the first line of defense; every admin API handler re-checks the
 * session server-side as well.
 */
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const authed = !!token;

  if (pathname.startsWith('/api/admin')) {
    if (!authed) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
    return NextResponse.next();
  }

  const isLogin = pathname === '/admin/login';
  if (isLogin) {
    if (authed) return NextResponse.redirect(new URL('/admin', req.url));
    return NextResponse.next();
  }

  if (!authed) {
    const url = new URL('/admin/login', req.url);
    url.searchParams.set('from', pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};
