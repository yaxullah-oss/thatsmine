import { getTranslations } from 'next-intl/server';
import { PageTransition } from '@/components/PageTransition';
import { NewsCard } from '@/components/NewsCard';
import { ThreadCard } from '@/components/ThreadCard';
import { mockNews, mockThreads } from '@/data/mock';

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

      <section className="mb-16 space-y-6">
        <h2 className="text-2xl font-semibold">{t('latestNews')}</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {mockNews.map((news) => (
            <NewsCard key={news.slug} locale={locale} news={news} />
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">{t('trendingThreads')}</h2>
        <div className="grid gap-6">
          {mockThreads.map((thread) => (
            <ThreadCard key={thread.id} locale={locale} thread={thread} />
          ))}
        </div>
      </section>
    </PageTransition>
  );
}
