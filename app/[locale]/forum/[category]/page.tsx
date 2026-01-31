import { PageTransition } from '@/components/PageTransition';
import { mockCategories, mockThreads } from '@/data/mock';

export default function CategoryPage({
  params: { locale, category }
}: {
  params: { locale: string; category: string };
}) {
  const current = mockCategories.find((item) => item.slug === category);
  const threads = mockThreads.filter((thread) => thread.category === category);

  return (
    <PageTransition>
      <h1 className="mb-6 text-3xl font-semibold">
        {current ? (locale === 'tr' ? current.name_tr : current.name_en) : 'Kategori'}
      </h1>
      {threads.length === 0 ? (
        <div className="card">Bu kategoride henüz konu yok.</div>
      ) : (
        <div className="grid gap-4">
          {threads.map((thread) => (
            <div key={thread.id} className="card">
              <h2 className="text-lg font-semibold">{thread.title}</h2>
              <p className="text-sm text-foreground/70">{thread.content}</p>
            </div>
          ))}
        </div>
      )}
    </PageTransition>
  );
}
