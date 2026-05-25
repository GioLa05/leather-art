import { VAULT_SPECIMENS, VaultSpecimen } from '@/data/specimens';

/**
 * Specimen serials (`sn`) use middot separators ("LA·001·2099") which are
 * awkward in a URL. We slugify to "LA-001-2099" for the `/vault/[serial]`
 * route and reverse on lookup.
 */
export function specimenSlug(s: VaultSpecimen): string {
  return s.sn.replace(/·/g, '-');
}

export function findSpecimenBySlug(slug: string): VaultSpecimen | undefined {
  const sn = decodeURIComponent(slug).replace(/-/g, '·');
  return VAULT_SPECIMENS.find((s) => s.sn === sn);
}

/** Ordered list (by index `i`) used for prev/next navigation. */
export function orderedSpecimens(): VaultSpecimen[] {
  return [...VAULT_SPECIMENS].sort((a, b) => a.i - b.i);
}
