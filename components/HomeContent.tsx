'use client';

import { useQuery } from '@tanstack/react-query';
import { NewsCard } from './NewsCard';
import { ThreadCard } from './ThreadCard';
import { mockNews, mockThreads } from '@/data/mock';

interface HomeContentProps {
  locale: string;
  latestNewsLabel: string;
  trendingThreadsLabel: string;
}

interface NewsItem {
  slug: string;
  title: string;
  excerpt: string;
  imageUrl: string;
  source: string;
  publishedAt: string;
}

interface ThreadItem {
  id: string;
  title: string;
  content: string;
  category: string;
  author: string;
  createdAt: string;
  votes: number;
}

async function fetchNews(): Promise<NewsItem[]> {
  const response = await fetch('/api/news');
  if (!response.ok) throw new Error('Failed');
  return response.json();
}

async function fetchThreads(): Promise<ThreadItem[]> {
  const response = await fetch('/api/forum/threads?sort=popular');
  if (!response.ok) throw new Error('Failed');
  return response.json();
}

export function HomeContent({ locale, latestNewsLabel, trendingThreadsLabel }: HomeContentProps) {
  const { data: news } = useQuery({
    queryKey: ['news'],
    queryFn: fetchNews,
    initialData: mockNews
  });
  const { data: threads } = useQuery({
    queryKey: ['threads', 'popular'],
    queryFn: fetchThreads,
    initialData: mockThreads
  });

  return (
    <>
      <section className="mb-16 space-y-6">
        <h2 className="text-2xl font-semibold">{latestNewsLabel}</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {news.map((item) => (
            <NewsCard key={item.slug} locale={locale} news={item} />
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">{trendingThreadsLabel}</h2>
        <div className="grid gap-6">
          {threads.map((thread) => (
            <ThreadCard key={thread.id} locale={locale} thread={thread} />
          ))}
        </div>
      </section>
    </>
  );
}
