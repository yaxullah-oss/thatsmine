import Link from 'next/link';
import { PageTransition } from '@/components/PageTransition';
import { mockCategories, mockThreads } from '@/data/mock';

export default function ForumPage({ params: { locale } }: { params: { locale: string } }) {
  return (
    <PageTransition>
      <h1 className="mb-8 text-3xl font-semibold">Forum</h1>
      <section className="mb-10 grid gap-4 md:grid-cols-2">
        {mockCategories.map((category) => (
          <Link
            key={category.slug}
            href={`/${locale}/forum/${category.slug}`}
            className="card hover:shadow-md"
          >
            <h2 className="text-lg font-semibold">
              {locale === 'tr' ? category.name_tr : category.name_en}
            </h2>
            <p className="text-sm text-foreground/70">Son konular ve tartışmalar</p>
          </Link>
        ))}
      </section>
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Son Konular</h2>
        <div className="grid gap-4">
          {mockThreads.map((thread) => (
            <Link key={thread.id} href={`/${locale}/thread/${thread.id}`} className="card">
              <h3 className="text-lg font-semibold">{thread.title}</h3>
              <p className="text-sm text-foreground/70">{thread.content}</p>
            </Link>
          ))}
        </div>
      </section>
    </PageTransition>
  );
}
