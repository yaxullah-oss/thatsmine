import { PageTransition } from '@/components/PageTransition';
import { mockThreads } from '@/data/mock';

export default function ThreadDetail({
  params: { locale, id }
}: {
  params: { locale: string; id: string };
}) {
  const thread = mockThreads.find((item) => item.id === id);
  const labels = {
    notFound: locale === 'tr' ? 'Konu bulunamadı.' : 'Thread not found.',
    comments: locale === 'tr' ? 'Yorumlar' : 'Comments',
    empty: locale === 'tr' ? 'Henüz yorum yok.' : 'No comments yet.',
    write: locale === 'tr' ? 'Yorum yaz' : 'Write a comment',
    submit: locale === 'tr' ? 'Gönder' : 'Submit'
  };

  if (!thread) {
    return <div className="card">{labels.notFound}</div>;
  }

  return (
    <PageTransition>
      <article className="space-y-6">
        <div className="card space-y-4">
          <h1 className="text-2xl font-semibold">{thread.title}</h1>
          <p className="text-sm text-foreground/70">{thread.content}</p>
          <div className="flex gap-3">
            <button className="rounded-full border border-border px-4 py-2">⬆️</button>
            <button className="rounded-full border border-border px-4 py-2">⬇️</button>
          </div>
        </div>
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">{labels.comments}</h2>
          <div className="card text-sm text-foreground/70">{labels.empty}</div>
        </section>
        <section className="card space-y-3">
          <h3 className="text-lg font-semibold">{labels.write}</h3>
          <textarea
            className="min-h-[120px] w-full rounded-xl border border-border bg-transparent p-3"
            placeholder={locale === 'tr' ? 'Yorumunuzu yazın...' : 'Write your comment...'}
          />
          <button className="rounded-full border border-border px-5 py-2">{labels.submit}</button>
        </section>
      </article>
    </PageTransition>
  );
}
