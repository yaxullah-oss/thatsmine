'use client';

import { PageTransition } from '@/components/PageTransition';
import { useQuery } from '@tanstack/react-query';
import { mockCategories, mockThreads } from '@/data/mock';
import Link from 'next/link';

interface Thread {
  id: string;
  title: string;
  content: string;
}

async function fetchThreads(category: string): Promise<Thread[]> {
  const response = await fetch(`/api/forum/threads?category=${category}`);
  if (!response.ok) throw new Error('Failed');
  return response.json();
}

export default function CategoryPage({
  params: { locale, category }
}: {
  params: { locale: string; category: string };
}) {
  const current = mockCategories.find((item) => item.slug === category);
  const { data: threads } = useQuery({
    queryKey: ['threads', category],
    queryFn: () => fetchThreads(category),
    initialData: mockThreads.filter((thread) => thread.category === category)
  });

  return (
    <PageTransition>
      <h1 className="mb-6 text-3xl font-semibold">
        {current ? (locale === 'tr' ? current.name_tr : current.name_en) : 'Kategori'}
      </h1>
      {threads.length === 0 ? (
        <div className="card">
          {locale === 'tr' ? 'Bu kategoride henüz konu yok.' : 'No threads yet.'}
        </div>
      ) : (
        <div className="grid gap-4">
          {threads.map((thread) => (
            <Link key={thread.id} href={`/${locale}/thread/${thread.id}`} className="card">
              <h2 className="text-lg font-semibold">{thread.title}</h2>
              <p className="text-sm text-foreground/70">{thread.content}</p>
            </Link>
          ))}
        </div>
      )}
    </PageTransition>
  );
}
