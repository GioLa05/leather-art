import fs from 'fs';
import path from 'path';

/** Source files the admin panel can rewrite; snapshotted so test runs restore them. */
export const DATA_FILES = [
  'src/data/specimens.ts',
  'src/data/categories.ts',
  'src/data/nav.ts',
  'src/data/telemetry.ts',
  'src/i18n/translations.ts',
];

const BACKUP_DIR = path.join(process.cwd(), '.data-backup');

export function backupDataFiles() {
  fs.mkdirSync(BACKUP_DIR, { recursive: true });
  for (const rel of DATA_FILES) {
    fs.copyFileSync(path.join(process.cwd(), rel), path.join(BACKUP_DIR, rel.replace(/\//g, '__')));
  }
}

export function restoreDataFiles() {
  for (const rel of DATA_FILES) {
    const backup = path.join(BACKUP_DIR, rel.replace(/\//g, '__'));
    if (fs.existsSync(backup)) fs.copyFileSync(backup, path.join(process.cwd(), rel));
  }
}
