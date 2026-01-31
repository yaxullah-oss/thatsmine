'use client';

import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { mockCategories, mockThreads } from '@/data/mock';
import { useMemo, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useToast } from './ToastProvider';

interface Category {
  slug: string;
  name_tr: string;
  name_en: string;
}

interface Thread {
  id: string;
  title: string;
  content: string;
  category: string;
  author: string;
  createdAt: string;
  votes: number;
}

async function fetchCategories(): Promise<Category[]> {
  const response = await fetch('/api/forum/categories');
  if (!response.ok) throw new Error('Failed');
  return response.json();
}

async function fetchThreads(params: { sort: string; q: string; category?: string }): Promise<Thread[]> {
  const search = new URLSearchParams();
  if (params.sort) search.set('sort', params.sort);
  if (params.q) search.set('q', params.q);
  if (params.category) search.set('category', params.category);
  const response = await fetch(`/api/forum/threads?${search.toString()}`);
  if (!response.ok) throw new Error('Failed');
  return response.json();
}

export function ForumContent({ locale }: { locale: string }) {
  const { data: session } = useSession();
  const { addToast } = useToast();
  const [sort, setSort] = useState('new');
  const [query, setQuery] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [categorySlug, setCategorySlug] = useState('');

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
    initialData: mockCategories
  });

  const { data: threads, refetch } = useQuery({
    queryKey: ['threads', sort, query],
    queryFn: () => fetchThreads({ sort, q: query }),
    initialData: mockThreads
  });

  const localizedCategories = useMemo(
    () =>
      categories.map((category) => ({
        ...category,
        label: locale === 'tr' ? category.name_tr : category.name_en
      })),
    [categories, locale]
  );

  const handleCreate = async () => {
    if (!session?.user) {
      addToast(locale === 'tr' ? 'Giriş yapmanız gerekiyor.' : 'Please sign in.', 'error');
      return;
    }
    if (!title || !content || !categorySlug) {
      addToast(
        locale === 'tr' ? 'Tüm alanları doldurun.' : 'Please fill in all fields.',
        'error'
      );
      return;
    }
    const response = await fetch('/api/forum/thread', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content, categorySlug })
    });
    if (!response.ok) {
      addToast(locale === 'tr' ? 'Konu oluşturulamadı.' : 'Failed to create thread.', 'error');
      return;
    }
    addToast(locale === 'tr' ? 'Konu oluşturuldu.' : 'Thread created.', 'success');
    setTitle('');
    setContent('');
    setCategorySlug('');
    refetch();
  };

  return (
    <>
      <section className="mb-10 grid gap-4 md:grid-cols-2">
        {localizedCategories.map((category) => (
          <Link
            key={category.slug}
            href={`/${locale}/forum/${category.slug}`}
            className="card hover:shadow-md"
          >
            <h2 className="text-lg font-semibold">{category.label}</h2>
            <p className="text-sm text-foreground/70">
              {locale === 'tr' ? 'Son konular ve tartışmalar' : 'Latest discussions'}
            </p>
          </Link>
        ))}
      </section>

      <section className="mb-10 grid gap-6 md:grid-cols-[2fr,1fr]">
        <div className="card space-y-4">
          <h2 className="text-lg font-semibold">
            {locale === 'tr' ? 'Yeni konu aç' : 'Start a new thread'}
          </h2>
          <input
            className="w-full rounded-xl border border-border bg-transparent p-3"
            placeholder={locale === 'tr' ? 'Başlık' : 'Title'}
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
          <textarea
            className="min-h-[140px] w-full rounded-xl border border-border bg-transparent p-3"
            placeholder={locale === 'tr' ? 'İçerik' : 'Content'}
            value={content}
            onChange={(event) => setContent(event.target.value)}
          />
          <select
            className="w-full rounded-xl border border-border bg-transparent p-3"
            value={categorySlug}
            onChange={(event) => setCategorySlug(event.target.value)}
          >
            <option value="">{locale === 'tr' ? 'Kategori seç' : 'Select category'}</option>
            {localizedCategories.map((category) => (
              <option key={category.slug} value={category.slug}>
                {category.label}
              </option>
            ))}
          </select>
          <button onClick={handleCreate} className="rounded-full border border-border px-6 py-2">
            {locale === 'tr' ? 'Konu oluştur' : 'Create thread'}
          </button>
        </div>
        <div className="card space-y-3 text-sm text-foreground/70">
          <h3 className="text-base font-semibold text-foreground">
            {locale === 'tr' ? 'Kurallar' : 'Guidelines'}
          </h3>
          <ul className="space-y-2">
            <li>{locale === 'tr' ? 'Saygılı olun.' : 'Be respectful.'}</li>
            <li>{locale === 'tr' ? 'Spam yapmayın.' : 'Avoid spam.'}</li>
            <li>{locale === 'tr' ? 'Kaynak belirtin.' : 'Share sources.'}</li>
          </ul>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <h2 className="text-xl font-semibold">
            {locale === 'tr' ? 'Son Konular' : 'Latest Threads'}
          </h2>
          <div className="flex flex-col gap-2 md:flex-row">
            <input
              className="rounded-full border border-border bg-transparent px-4 py-2 text-sm"
              placeholder={locale === 'tr' ? 'Ara...' : 'Search...'}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
            <select
              className="rounded-full border border-border bg-transparent px-4 py-2 text-sm"
              value={sort}
              onChange={(event) => setSort(event.target.value)}
            >
              <option value="new">{locale === 'tr' ? 'En Yeni' : 'Newest'}</option>
              <option value="popular">{locale === 'tr' ? 'En Popüler' : 'Popular'}</option>
            </select>
          </div>
        </div>
        {threads.length === 0 ? (
          <div className="card">{locale === 'tr' ? 'Sonuç bulunamadı.' : 'No results.'}</div>
        ) : (
          <div className="grid gap-4">
            {threads.map((thread) => (
              <Link key={thread.id} href={`/${locale}/thread/${thread.id}`} className="card">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">{thread.title}</h3>
                    <p className="text-sm text-foreground/70">{thread.content}</p>
                  </div>
                  <span className="text-sm font-semibold">+{thread.votes}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
