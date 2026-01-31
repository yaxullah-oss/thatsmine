'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useToast } from '@/components/ToastProvider';

export default function RegisterPage() {
  const t = useTranslations('auth');
  const { addToast } = useToast();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, username, password })
    });
    const data = await response.json();
    if (response.ok) {
      addToast(t('registerSuccess'), 'success');
      setEmail('');
      setUsername('');
      setPassword('');
      return;
    }
    addToast(data.message ?? t('registerError'), 'error');
  };

  return (
    <div className="mx-auto max-w-md space-y-6">
      <h1 className="text-3xl font-semibold">{t('registerTitle')}</h1>
      <form onSubmit={handleSubmit} className="card space-y-4">
        <input
          className="w-full rounded-xl border border-border bg-transparent p-3"
          placeholder={t('email')}
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          className="w-full rounded-xl border border-border bg-transparent p-3"
          placeholder={t('username')}
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <input
          className="w-full rounded-xl border border-border bg-transparent p-3"
          type="password"
          placeholder={t('password')}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <p className="text-xs text-foreground/60">{t('passwordHint')}</p>
        <button className="w-full rounded-full border border-border py-2">{t('submit')}</button>
      </form>
    </div>
  );
}
