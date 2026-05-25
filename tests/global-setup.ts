import { backupDataFiles } from './data-snapshot';

/** Snapshot the editable data files before the run so we can restore them after. */
export default function globalSetup() {
  backupDataFiles();
}
