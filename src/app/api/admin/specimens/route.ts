import { requireAdmin, unauthorized, ok, badRequest } from '@/lib/admin/api';
import { writeVaultSpecimens, writeLandingSpecimens } from '@/lib/admin/writers';
import { LANDING_SPECIMENS, VAULT_SPECIMENS } from '@/data/specimens';

export const dynamic = 'force-dynamic';

export async function GET() {
  if (!(await requireAdmin())) return unauthorized();
  return ok({ vault: VAULT_SPECIMENS, landing: LANDING_SPECIMENS });
}

export async function PUT(req: Request) {
  if (!(await requireAdmin())) return unauthorized();
  const body = await req.json().catch(() => null);
  if (!body || typeof body !== 'object') return badRequest('invalid body');

  if (Array.isArray(body.vault)) {
    // Serials must be unique within the vault.
    const serials = body.vault.map((s: { sn: string }) => s.sn);
    if (new Set(serials).size !== serials.length) return badRequest('duplicate serial');
    await writeVaultSpecimens(body.vault);
  }
  if (Array.isArray(body.landing)) {
    await writeLandingSpecimens(body.landing);
  }
  return ok({ saved: true });
}
