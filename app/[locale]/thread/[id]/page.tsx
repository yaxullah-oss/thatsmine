'use client';

import { PageTransition } from '@/components/PageTransition';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { useToast } from '@/components/ToastProvider';

interface Comment {
  id: string;
  content: string;
}

interface ThreadData {
  id: string;
  title: string;
  content: string;
  votes: number;
  comments: Comment[];
}

async function fetchThread(id: string): Promise<ThreadData> {
  const response = await fetch(`/api/forum/thread/${id}`);
  if (!response.ok) throw new Error('Failed');
  return response.json();
}

export default function ThreadDetail({
  params: { locale, id }
}: {
  params: { locale: string; id: string };
}) {
  const { data: session } = useSession();
  const { addToast } = useToast();
  const [comment, setComment] = useState('');
  const { data, refetch, isLoading } = useQuery({
    queryKey: ['thread', id],
    queryFn: () => fetchThread(id)
  });

  const labels = {
    notFound: locale === 'tr' ? 'Konu bulunamadı.' : 'Thread not found.',
    comments: locale === 'tr' ? 'Yorumlar' : 'Comments',
    empty: locale === 'tr' ? 'Henüz yorum yok.' : 'No comments yet.',
    write: locale === 'tr' ? 'Yorum yaz' : 'Write a comment',
    submit: locale === 'tr' ? 'Gönder' : 'Submit',
    loginRequired: locale === 'tr' ? 'Giriş yapmanız gerekiyor.' : 'Please sign in.',
    success: locale === 'tr' ? 'Yorum eklendi.' : 'Comment added.',
    voteSuccess: locale === 'tr' ? 'Oyunuz kaydedildi.' : 'Vote saved.'
  };

  const handleVote = async (value: number) => {
    if (!session?.user) {
      addToast(labels.loginRequired, 'error');
      return;
    }
    const response = await fetch(`/api/forum/thread/${id}/vote`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ value })
    });
    if (response.ok) {
      addToast(labels.voteSuccess, 'success');
      refetch();
    } else {
      addToast('Error', 'error');
    }
  };

  const handleSubmit = async () => {
    if (!session?.user) {
      addToast(labels.loginRequired, 'error');
      return;
    }
    const response = await fetch(`/api/forum/thread/${id}/comment`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: comment })
    });
    if (response.ok) {
      setComment('');
      addToast(labels.success, 'success');
      refetch();
    } else {
      addToast('Error', 'error');
    }
  };

  if (isLoading) {
    return <div className="card">{locale === 'tr' ? 'Yükleniyor...' : 'Loading...'}</div>;
  }

  if (!data) {
    return <div className="card">{labels.notFound}</div>;
  }

  const comments = data.comments ?? [];

  return (
    <PageTransition>
      <article className="space-y-6">
        <div className="card space-y-4">
          <h1 className="text-2xl font-semibold">{data.title}</h1>
          <p className="text-sm text-foreground/70">{data.content}</p>
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleVote(1)}
              className="rounded-full border border-border px-4 py-2"
            >
              ⬆️
            </button>
            <button
              onClick={() => handleVote(-1)}
              className="rounded-full border border-border px-4 py-2"
            >
              ⬇️
            </button>
            <span className="text-sm font-semibold">{data.votes}</span>
          </div>
        </div>
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">{labels.comments}</h2>
          {comments.length === 0 ? (
            <div className="card text-sm text-foreground/70">{labels.empty}</div>
          ) : (
            <div className="space-y-3">
              {comments.map((commentItem) => (
                <div key={commentItem.id} className="card text-sm text-foreground/70">
                  {commentItem.content}
                </div>
              ))}
            </div>
          )}
        </section>
        <section className="card space-y-3">
          <h3 className="text-lg font-semibold">{labels.write}</h3>
          <textarea
            className="min-h-[120px] w-full rounded-xl border border-border bg-transparent p-3"
            placeholder={locale === 'tr' ? 'Yorumunuzu yazın...' : 'Write your comment...'}
            value={comment}
            onChange={(event) => setComment(event.target.value)}
          />
          <button
            onClick={handleSubmit}
            className="rounded-full border border-border px-5 py-2"
          >
            {labels.submit}
          </button>
        </section>
      </article>
    </PageTransition>
  );
}
