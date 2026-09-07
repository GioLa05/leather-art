'use client';

import React, { Suspense, useState } from 'react';
import styled from 'styled-components';
import { useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { Screen, Eyebrow, H1, Field, Input, Button } from '@/components/admin/ui';

const Wrap = styled(Screen)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
`;

const Card = styled.form`
  width: 100%;
  max-width: 380px;
  border: 0.5px solid rgba(240, 228, 210, 0.3);
  padding: 32px;

  .lede { font-family: var(--mono); font-size: 12px; color: rgba(240,228,210,0.6); margin: 12px 0 24px; line-height: 1.5; }

  .err {
    font-family: var(--mono);
    font-size: 11px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #e8a;
    border: 0.5px solid #c46;
    padding: 10px 12px;
    margin-bottom: 16px;
  }
`;

function AdminLoginForm() {
  const params = useSearchParams();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // On failure NextAuth redirects back here with ?error=… ; show it on-brand.
  const error = !!params.get('error');
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    // redirect: true → NextAuth sets the session cookie and redirects in one
    // server response (no client cookie race). Success → callbackUrl; failure →
    // /admin/login?error=CredentialsSignin.
    await signIn('credentials', {
      username,
      password,
      callbackUrl: params.get('from') || '/admin',
    });
  }

  return (
    <Wrap as="div">
      <Card onSubmit={onSubmit}>
        <Eyebrow>§ ACCESS · VAULT OPERATOR</Eyebrow>
        <H1>Sign in.</H1>
        <p className="lede">Restricted terminal. Credentials required to access the archive console.</p>
        {error && <div className="err" data-testid="login-error">TRANSMISSION REJECTED · CHECK CREDENTIALS</div>}
        <Field>
          <span className="k">Operator</span>
          <Input
            name="username"
            autoComplete="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </Field>
        <Field>
          <span className="k">Passphrase</span>
          <Input
            name="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Field>
        <Button type="submit" $variant="primary" disabled={busy}>
          {busy ? 'Authenticating…' : 'Authenticate →'}
        </Button>
      </Card>
    </Wrap>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<Screen />}>
      <AdminLoginForm />
    </Suspense>
  );
}
