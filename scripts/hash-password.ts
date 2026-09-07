/**
 * Hash a plaintext admin password for ADMIN_PASSWORD_HASH in .env.local.
 *
 *   npm run hash-password -- 'your-passphrase'
 *
 * Prints a ready-to-paste env line. NOTE: bcrypt hashes contain `$`, which
 * Next's dotenv-expand would otherwise treat as variable interpolation — so the
 * `$` characters are escaped as `\$` in the emitted line.
 */
import bcrypt from 'bcryptjs';

const plaintext = process.argv[2];
if (!plaintext) {
  console.error("Usage: npm run hash-password -- '<password>'");
  process.exit(1);
}

const hash = bcrypt.hashSync(plaintext, 10);
const escaped = hash.replace(/\$/g, '\\$');
console.log(`ADMIN_PASSWORD_HASH=${escaped}`);
