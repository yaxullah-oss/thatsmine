'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useSession, signOut } from 'next-auth/react';
import { ThemeToggle } from './ThemeToggle';
import { LanguageSwitcher } from './LanguageSwitcher';
import { motion } from 'framer-motion';

export function Navbar({ locale }: { locale: string }) {
  const t = useTranslations('nav');
  const { data: session } = useSession();

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 z-50 w-full border-b border-border bg-background/70 backdrop-blur"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href={`/${locale}`} className="text-lg font-semibold">
          thats<span className="text-foreground/60">mine</span>
        </Link>
        <nav className="hidden gap-6 text-sm md:flex">
          <Link href={`/${locale}`} className="hover:text-foreground/70">
            {t('home')}
          </Link>
          <Link href={`/${locale}/news`} className="hover:text-foreground/70">
            {t('news')}
          </Link>
          <Link href={`/${locale}/forum`} className="hover:text-foreground/70">
            {t('forum')}
          </Link>
          <Link href={`/${locale}/about`} className="hover:text-foreground/70">
            {t('about')}
          </Link>
        </nav>
        <div className="flex items-center gap-3">
          <LanguageSwitcher locale={locale} />
          <ThemeToggle />
          {session?.user ? (
            <div className="flex items-center gap-2 text-sm">
              <Link href={`/${locale}/profile/${session.user.name ?? 'me'}`}>{t('profile')}</Link>
              <Link href={`/${locale}/settings`}>{t('settings')}</Link>
              <button
                type="button"
                onClick={() => signOut()}
                className="text-sm text-foreground/70 hover:text-foreground"
              >
                {t('logout')}
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-sm">
              <Link href={`/${locale}/auth/login`}>{t('login')}</Link>
              <Link href={`/${locale}/auth/register`}>{t('register')}</Link>
            </div>
          )}
        </div>
      </div>
    </motion.header>
  );
}
