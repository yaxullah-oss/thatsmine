import { PageTransition } from '@/components/PageTransition';
import { NewsList } from '@/components/NewsList';

export default function NewsPage({ params: { locale } }: { params: { locale: string } }) {
  return (
    <PageTransition>
      <h1 className="mb-8 text-3xl font-semibold">Kripto Haberler</h1>
      <NewsList locale={locale} />
    </PageTransition>
  );
}
