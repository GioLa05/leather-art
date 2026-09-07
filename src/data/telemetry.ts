// Landing-page live-readout configuration. Extracted from the Telemetry
// component (the one "refactor while you're here" allowance — see DECISIONS.md)
// so it can be edited from /admin/telemetry. The label/sub copy lives in the
// i18n dictionary (telemetry.* keys); this file holds the numeric config.

export type TelLabelKey =
  | 'telemetry.vault'
  | 'telemetry.queue'
  | 'telemetry.hours'
  | 'telemetry.hands';
export type TelSubKey =
  | 'telemetry.vault.sub'
  | 'telemetry.queue.sub'
  | 'telemetry.hours.sub'
  | 'telemetry.hands.sub';

export interface TelItem {
  labelKey: TelLabelKey;
  subKey: TelSubKey;
  val: number;
  unit: string;
  drift: [number, number];
  barFrom: number;
  barTo: number;
  integer?: boolean;
}

export const TELEMETRY: TelItem[] = [
  {
    labelKey: 'telemetry.vault',
    subKey: 'telemetry.vault.sub',
    val: 60.4,
    unit: '%',
    drift: [58, 62],
    barFrom: 0,
    barTo: 100,
  },
  {
    labelKey: 'telemetry.queue',
    subKey: 'telemetry.queue.sub',
    val: 47,
    unit: 'hides',
    drift: [40, 68],
    barFrom: 0,
    barTo: 84,
    integer: true,
  },
  {
    labelKey: 'telemetry.hours',
    subKey: 'telemetry.hours.sub',
    val: 142,
    unit: 'hrs',
    drift: [120, 180],
    barFrom: 0,
    barTo: 240,
    integer: true,
  },
  {
    labelKey: 'telemetry.hands',
    subKey: 'telemetry.hands.sub',
    val: 11,
    unit: 'on bench',
    drift: [8, 16],
    barFrom: 0,
    barTo: 24,
    integer: true,
  },
];
