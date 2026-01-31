import { PageTransition } from '@/components/PageTransition';
import { NewsList } from '@/components/NewsList';

export default function NewsPage({ params: { locale } }: { params: { locale: string } }) {
  return (
    <PageTransition>
      <h1 className="mb-8 text-3xl font-semibold">
        {locale === 'tr' ? 'Kripto Haberler' : 'Crypto News'}
      </h1>
      <NewsList locale={locale} />
    </PageTransition>
  );
}
