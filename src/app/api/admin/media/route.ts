import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import { requireAdmin, unauthorized, ok, badRequest } from '@/lib/admin/api';

export const dynamic = 'force-dynamic';

const ASSETS_DIR = path.join(process.cwd(), 'public', 'assets');
// Listing/deletion still recognises SVG so any pre-existing file stays visible
// and removable...
const IMAGE_RE = /\.(png|jpe?g|gif|webp|avif|svg)$/i;
// ...but SVG is not accepted for upload: it can carry inline <script>, which
// would execute in this origin if the raw /assets/<name>.svg URL were ever
// opened as a top-level navigation.
const UPLOAD_RE = /\.(png|jpe?g|gif|webp|avif)$/i;
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
  if (!UPLOAD_RE.test(file.name) || !SAFE_NAME.test(file.name)) return badRequest('invalid filename');

  const buf = Buffer.from(await file.arrayBuffer());
  // Specimens store only the path string, so two different photos uploaded under
  // the same generic filename (IMG_0001.jpg) would silently swap the picture on
  // every specimen already pointing at it. Fold a content hash into the stored
  // name: distinct images can never collide, and re-uploading the same bytes is
  // idempotent.
  const ext = path.extname(file.name);
  const base = path.basename(file.name, ext);
  const hash = crypto.createHash('sha1').update(buf).digest('hex').slice(0, 8);
  const name = `${base}-${hash}${ext}`;

  fs.mkdirSync(ASSETS_DIR, { recursive: true });
  fs.writeFileSync(path.join(ASSETS_DIR, name), buf);
  return ok({ name, src: `/assets/${name}` });
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
