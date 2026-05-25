import path from 'path';
import fs from 'fs';
import { requireAdmin, unauthorized, ok, badRequest } from '@/lib/admin/api';

export const dynamic = 'force-dynamic';

const ASSETS_DIR = path.join(process.cwd(), 'public', 'assets');
const IMAGE_RE = /\.(png|jpe?g|gif|webp|avif|svg)$/i;
// Reject anything that could escape the assets directory.
const SAFE_NAME = /^[A-Za-z0-9._-]+$/;

function listImages(): string[] {
  if (!fs.existsSync(ASSETS_DIR)) return [];
  return fs
    .readdirSync(ASSETS_DIR)
    .filter((f) => IMAGE_RE.test(f))
    .sort();
}

export async function GET() {
  if (!(await requireAdmin())) return unauthorized();
  return ok({ files: listImages().map((name) => ({ name, src: `/assets/${name}` })) });
}

export async function POST(req: Request) {
  if (!(await requireAdmin())) return unauthorized();
  const form = await req.formData().catch(() => null);
  const file = form?.get('file');
  if (!(file instanceof File)) return badRequest('no file');
  if (!IMAGE_RE.test(file.name) || !SAFE_NAME.test(file.name)) return badRequest('invalid filename');

  fs.mkdirSync(ASSETS_DIR, { recursive: true });
  const buf = Buffer.from(await file.arrayBuffer());
  fs.writeFileSync(path.join(ASSETS_DIR, file.name), buf);
  return ok({ name: file.name, src: `/assets/${file.name}` });
}

export async function DELETE(req: Request) {
  if (!(await requireAdmin())) return unauthorized();
  const body = await req.json().catch(() => null);
  const name = body?.name;
  if (typeof name !== 'string' || !SAFE_NAME.test(name) || !IMAGE_RE.test(name)) {
    return badRequest('invalid filename');
  }
  const target = path.join(ASSETS_DIR, name);
  if (fs.existsSync(target)) fs.unlinkSync(target);
  return ok({ deleted: name });
}
