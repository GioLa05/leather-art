import { requireAdmin, unauthorized, ok, badRequest } from '@/lib/admin/api';
import { writeTelemetry } from '@/lib/admin/writers';
import { TELEMETRY } from '@/data/telemetry';

export const dynamic = 'force-dynamic';

export async function GET() {
  if (!(await requireAdmin())) return unauthorized();
  return ok({ telemetry: TELEMETRY });
}

export async function PUT(req: Request) {
  if (!(await requireAdmin())) return unauthorized();
  const body = await req.json().catch(() => null);
  if (!body || !Array.isArray(body.telemetry)) return badRequest('invalid body');
  await writeTelemetry(body.telemetry);
  return ok({ saved: true });
}
