import { requireAdmin, unauthorized, ok, badRequest, conflict } from '@/lib/admin/api';
import { writeCategories } from '@/lib/admin/writers';
import { CATS } from '@/data/categories';
import { VAULT_SPECIMENS } from '@/data/specimens';

export const dynamic = 'force-dynamic';

export async function GET() {
  if (!(await requireAdmin())) return unauthorized();
  return ok({ categories: CATS });
}

export async function PUT(req: Request) {
  if (!(await requireAdmin())) return unauthorized();
  const body = await req.json().catch(() => null);
  if (!body || !Array.isArray(body.categories)) return badRequest('invalid body');

  // Constraint: a category that still has specimens cannot be removed.
  const nextIds = new Set<string>(body.categories.map((c: { id: string }) => c.id));
  const removed = CATS.filter((c) => !c.isAll && !nextIds.has(c.id)).map((c) => c.id);
  const blocking = removed.filter((id) => VAULT_SPECIMENS.some((s) => s.cat === id));
  if (blocking.length > 0) {
    const affected = VAULT_SPECIMENS.filter((s) => blocking.includes(s.cat)).map((s) => s.sn);
    return conflict('category not empty', { categories: blocking, affected });
  }

  await writeCategories(body.categories);
  return ok({ saved: true });
}
