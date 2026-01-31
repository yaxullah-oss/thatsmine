import { PageTransition } from '@/components/PageTransition';
import { ForumContent } from '@/components/ForumContent';

export default function ForumPage({ params: { locale } }: { params: { locale: string } }) {
  return (
    <PageTransition>
      <h1 className="mb-8 text-3xl font-semibold">{locale === 'tr' ? 'Forum' : 'Forum'}</h1>
      <ForumContent locale={locale} />
    </PageTransition>
  );
}
