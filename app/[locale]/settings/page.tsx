import { PageTransition } from '@/components/PageTransition';
import { ThemeToggle } from '@/components/ThemeToggle';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { getTranslations } from 'next-intl/server';

export default async function SettingsPage({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations('settings');

  return (
    <PageTransition>
      <div className="space-y-6">
        <h1 className="text-3xl font-semibold">{t('title')}</h1>
        <div className="card flex items-center justify-between">
          <span>{t('theme')}</span>
          <ThemeToggle />
        </div>
        <div className="card flex items-center justify-between">
          <span>{t('language')}</span>
          <LanguageSwitcher locale={locale} />
        </div>
      </div>
    </PageTransition>
  );
}
