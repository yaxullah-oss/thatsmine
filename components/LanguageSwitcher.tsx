'use client';

import { usePathname, useRouter } from 'next/navigation';

export function LanguageSwitcher({ locale }: { locale: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const nextLocale = locale === 'tr' ? 'en' : 'tr';

  const handleSwitch = () => {
    if (!pathname) return;
    const segments = pathname.split('/');
    segments[1] = nextLocale;
    router.push(segments.join('/'));
  };

  return (
    <button
      type="button"
      onClick={handleSwitch}
      className="rounded-full border border-border px-3 py-2 text-sm transition hover:bg-muted"
    >
      {nextLocale.toUpperCase()}
    </button>
  );
}
