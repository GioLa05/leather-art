import { requireAdmin, unauthorized, ok, badRequest } from '@/lib/admin/api';
import { writeNav } from '@/lib/admin/writers';
import { NAV } from '@/data/nav';

export const dynamic = 'force-dynamic';

export async function GET() {
  if (!(await requireAdmin())) return unauthorized();
  return ok({ nav: NAV });
}

export async function PUT(req: Request) {
  if (!(await requireAdmin())) return unauthorized();
  const body = await req.json().catch(() => null);
  if (!body || !Array.isArray(body.nav)) return badRequest('invalid body');
  await writeNav(body.nav);
  return ok({ saved: true });
}
