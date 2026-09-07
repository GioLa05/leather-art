import path from 'path';
import fs from 'fs';
import { requireAdmin, unauthorized, ok } from '@/lib/admin/api';
import { VAULT_SPECIMENS, LANDING_SPECIMENS } from '@/data/specimens';
import { CATS } from '@/data/categories';

export const dynamic = 'force-dynamic';

export async function GET() {
  if (!(await requireAdmin())) return unauthorized();

  const byCategory = CATS.filter((c) => !c.isAll).map((c) => ({
    id: c.id,
    count: VAULT_SPECIMENS.filter((s) => s.cat === c.id).length,
  }));

  const specimensFile = path.join(process.cwd(), 'src/data/specimens.ts');
  const lastEdited = fs.statSync(specimensFile).mtime.toISOString();

  return ok({
    totalVault: VAULT_SPECIMENS.length,
    totalLanding: LANDING_SPECIMENS.length,
    byCategory,
    cycle: 'MMXCIX · Δ-014',
    lastEdited,
  });
}
