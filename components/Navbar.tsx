'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useSession, signOut } from 'next-auth/react';
import { ThemeToggle } from './ThemeToggle';
import { LanguageSwitcher } from './LanguageSwitcher';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

export function Navbar({ locale }: { locale: string }) {
  const t = useTranslations('nav');
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);

  const links = [
    { href: `/${locale}`, label: t('home') },
    { href: `/${locale}/news`, label: t('news') },
    { href: `/${locale}/forum`, label: t('forum') },
    { href: `/${locale}/about`, label: t('about') }
  ];

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
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-foreground/70">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
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
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="rounded-full border border-border px-3 py-2 text-sm md:hidden"
        >
          ☰
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/90 backdrop-blur"
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              className="mx-auto mt-24 w-[90%] max-w-sm rounded-2xl border border-border bg-card p-6"
            >
              <div className="mb-6 flex items-center justify-between">
                <span className="text-lg font-semibold">Menu</span>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-full border border-border px-3 py-1 text-sm"
                >
                  ✕
                </button>
              </div>
              <nav className="flex flex-col gap-4 text-sm">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="hover:text-foreground/70"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
              <div className="mt-6 flex items-center gap-3">
                <LanguageSwitcher locale={locale} />
                <ThemeToggle />
              </div>
              <div className="mt-6 space-y-2 text-sm">
                {session?.user ? (
                  <>
                    <Link href={`/${locale}/profile/${session.user.name ?? 'me'}`}>
                      {t('profile')}
                    </Link>
                    <Link href={`/${locale}/settings`}>{t('settings')}</Link>
                    <button
                      type="button"
                      onClick={() => signOut()}
                      className="text-left text-foreground/70 hover:text-foreground"
                    >
                      {t('logout')}
                    </button>
                  </>
                ) : (
                  <>
                    <Link href={`/${locale}/auth/login`}>{t('login')}</Link>
                    <Link href={`/${locale}/auth/register`}>{t('register')}</Link>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
