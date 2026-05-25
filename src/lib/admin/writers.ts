import path from 'path';
import fs from 'fs';
import { Project } from 'ts-morph';
import prettier from 'prettier';
import { serialize, unionType } from './serialize';
import type { Lang } from '@/i18n/translations';

/**
 * File-based persistence for the admin panel. Edits are written back to the
 * real source files using ts-morph (locate the exported declaration, replace
 * its initializer) and then formatted with Prettier. No regex editing.
 *
 * Server-only: these touch the filesystem and must never reach the client.
 */

const ROOT = process.cwd();

function newProject(): Project {
  return new Project({
    tsConfigFilePath: path.join(ROOT, 'tsconfig.json'),
    skipAddingFilesFromTsConfig: true,
  });
}

async function formatAndWrite(filePath: string, source: string): Promise<void> {
  const cfg = (await prettier.resolveConfig(filePath)) ?? {};
  const formatted = await prettier.format(source, { ...cfg, filepath: filePath });
  fs.writeFileSync(filePath, formatted, 'utf8');
}

/** Replace the initializer of `export const <name> = ...` with a serialized value. */
export async function writeExport(relPath: string, exportName: string, value: unknown): Promise<void> {
  const filePath = path.join(ROOT, relPath);
  const project = newProject();
  const sf = project.addSourceFileAtPath(filePath);
  const decl = sf.getVariableDeclarationOrThrow(exportName);
  decl.setInitializer(serialize(value));
  await formatAndWrite(filePath, sf.getFullText());
}

// ─── Entity writers ───────────────────────────────────────────

export const writeVaultSpecimens = (value: unknown) =>
  writeExport('src/data/specimens.ts', 'VAULT_SPECIMENS', value);

export const writeLandingSpecimens = (value: unknown) =>
  writeExport('src/data/specimens.ts', 'LANDING_SPECIMENS', value);

export const writeCategories = (value: unknown) =>
  writeExport('src/data/categories.ts', 'CATS', value);

export const writeNav = (value: unknown) => writeExport('src/data/nav.ts', 'NAV', value);

export const writeTelemetry = (value: unknown) =>
  writeExport('src/data/telemetry.ts', 'TELEMETRY', value);

/**
 * Rewrite the i18n dictionary and/or marquee strings. When `i18n` is given, the
 * `TranslationKey` union type is regenerated from the EN keys so the file stays
 * type-safe. Both edits happen in one ts-morph pass to avoid a half-written file.
 */
export async function writeTranslationsFile(opts: {
  i18n?: Record<Lang, Record<string, string>>;
  marquee?: Record<Lang, string[]>;
}): Promise<void> {
  const filePath = path.join(ROOT, 'src/i18n/translations.ts');
  const project = newProject();
  const sf = project.addSourceFileAtPath(filePath);

  if (opts.i18n) {
    sf.getVariableDeclarationOrThrow('I18N').setInitializer(serialize(opts.i18n));
    const keys = Object.keys(opts.i18n.EN);
    sf.getTypeAliasOrThrow('TranslationKey').setType(unionType(keys));
  }
  if (opts.marquee) {
    sf.getVariableDeclarationOrThrow('MARQUEE').setInitializer(serialize(opts.marquee));
  }

  await formatAndWrite(filePath, sf.getFullText());
}
