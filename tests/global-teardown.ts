import { restoreDataFiles } from './data-snapshot';

/** Restore the data files to their pre-run state, regardless of test outcome. */
export default function globalTeardown() {
  restoreDataFiles();
}
