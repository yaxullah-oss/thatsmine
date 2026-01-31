'use client';

import { useTranslations } from 'next-intl';
import { signIn } from 'next-auth/react';
import { useState } from 'react';

export default function LoginPage() {
  const t = useTranslations('auth');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const result = await signIn('credentials', {
      identifier,
      password,
      redirect: false
    });
    if (result?.error) {
      setError(t('loginError'));
    }
  };

  return (
    <div className="mx-auto max-w-md space-y-6">
      <h1 className="text-3xl font-semibold">{t('loginTitle')}</h1>
      {error && <div className="card text-sm text-red-400">{error}</div>}
      <form onSubmit={handleSubmit} className="card space-y-4">
        <input
          className="w-full rounded-xl border border-border bg-transparent p-3"
          placeholder={t('email')}
          value={identifier}
          onChange={(event) => setIdentifier(event.target.value)}
        />
        <input
          className="w-full rounded-xl border border-border bg-transparent p-3"
          type="password"
          placeholder={t('password')}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <button className="w-full rounded-full border border-border py-2">{t('submit')}</button>
      </form>
    </div>
  );
}
