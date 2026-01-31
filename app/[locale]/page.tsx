import { getTranslations } from 'next-intl/server';
import { PageTransition } from '@/components/PageTransition';
import { HomeContent } from '@/components/HomeContent';

export default async function Home({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations('home');

  return (
    <PageTransition>
      <section className="mb-16 grid gap-10 md:grid-cols-[2fr,1fr]">
        <div className="space-y-6">
          <h1 className="text-4xl font-semibold">{t('heroTitle')}</h1>
          <p className="text-lg text-foreground/70">{t('heroSubtitle')}</p>
          <div className="card">{t('marketWidget')}: BTC 63,420 / ETH 3,410</div>
        </div>
        <div className="card space-y-3">
          <h2 className="text-lg font-semibold">Top Movers</h2>
          <ul className="space-y-2 text-sm text-foreground/70">
            <li>BTC +4.2%</li>
            <li>ETH +3.1%</li>
            <li>SOL +6.4%</li>
          </ul>
        </div>
      </section>

      <HomeContent
        locale={locale}
        latestNewsLabel={t('latestNews')}
        trendingThreadsLabel={t('trendingThreads')}
      />
    </PageTransition>
  );
}
