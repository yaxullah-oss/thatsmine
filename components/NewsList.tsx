'use client';

import { useQuery } from '@tanstack/react-query';
import { NewsCard } from './NewsCard';
import { mockNews } from '@/data/mock';

interface NewsItem {
  slug: string;
  title: string;
  excerpt: string;
  imageUrl: string;
  source: string;
  publishedAt: string;
}

async function fetchNews(): Promise<NewsItem[]> {
  const response = await fetch('/api/news');
  if (!response.ok) {
    throw new Error('Failed');
  }
  return response.json();
}

export function NewsList({ locale }: { locale: string }) {
  const { data } = useQuery({
    queryKey: ['news'],
    queryFn: fetchNews,
    initialData: mockNews
  });

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {data.map((news) => (
        <NewsCard key={news.slug} locale={locale} news={news} />
      ))}
    </div>
  );
}
