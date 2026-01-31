import { mockNews } from '@/data/mock';
import { PageTransition } from '@/components/PageTransition';
import Image from 'next/image';
import Link from 'next/link';

export default function NewsDetail({
  params: { locale, slug }
}: {
  params: { locale: string; slug: string };
}) {
  const item = mockNews.find((news) => news.slug === slug);
  const labels = {
    notFound: locale === 'tr' ? 'Haber bulunamadı.' : 'News not found.',
    related: locale === 'tr' ? 'Benzer Haberler' : 'Related News'
  };

  if (!item) {
    return <div className="card">{labels.notFound}</div>;
  }

  const related = mockNews.filter((news) => news.slug !== slug).slice(0, 2);

  return (
    <PageTransition>
      <article className="space-y-6">
        <div className="relative h-64 w-full overflow-hidden rounded-2xl">
          <Image src={item.imageUrl} alt={item.title} fill className="object-cover" />
        </div>
        <div className="space-y-2">
          <p className="text-xs uppercase text-foreground/60">
            {item.source} · {new Date(item.publishedAt).toLocaleDateString(locale)}
          </p>
          <h1 className="text-3xl font-semibold">{item.title}</h1>
          <p className="text-lg text-foreground/80">{item.content}</p>
          <div className="flex flex-wrap gap-2">
            {item.tags.map((tag) => (
              <span key={tag} className="rounded-full border border-border px-3 py-1 text-xs">
                #{tag}
              </span>
            ))}
          </div>
        </div>
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">{labels.related}</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {related.map((news) => (
              <Link key={news.slug} href={`/${locale}/news/${news.slug}`} className="card">
                <h3 className="text-lg font-semibold">{news.title}</h3>
                <p className="text-sm text-foreground/70">{news.excerpt}</p>
              </Link>
            ))}
          </div>
        </section>
      </article>
    </PageTransition>
  );
}
