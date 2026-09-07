import { GrainKind, OriginKind } from '@/data/specimens';

export interface Filters {
  tanLo: number;
  tanHi: number;
  grain: GrainKind | null;
  origins: Set<OriginKind>;
  wLo: number;
  wHi: number;
  dLo: string;
  dHi: string;
  sort: string;
}
