import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';

/**
 * Single-admin credentials auth. The username + bcrypt password hash live in
 * `.env.local` (ADMIN_USERNAME / ADMIN_PASSWORD_HASH). JWT session strategy so
 * no database is needed. Sign-in page is the branded /admin/login.
 */
export const authOptions: NextAuthOptions = {
  session: { strategy: 'jwt' },
  pages: { signIn: '/admin/login' },
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        username: { label: 'Operator', type: 'text' },
        password: { label: 'Passphrase', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) return null;
        const user = process.env.ADMIN_USERNAME;
        const hash = process.env.ADMIN_PASSWORD_HASH;
        if (!user || !hash) return null;
        if (credentials.username !== user) return null;
        const ok = await bcrypt.compare(credentials.password, hash);
        return ok ? { id: 'admin', name: user } : null;
      },
    }),
  ],
};
