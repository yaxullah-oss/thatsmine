import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface NewsCardProps {
  locale: string;
  news: {
    slug: string;
    title: string;
    excerpt: string;
    imageUrl: string;
    source: string;
    publishedAt: string;
  };
}

export function NewsCard({ locale, news }: NewsCardProps) {
  const readMore = locale === 'tr' ? 'Devamını oku →' : 'Read more →';

  return (
    <motion.article
      whileHover={{ scale: 1.02 }}
      className="card flex flex-col gap-4"
    >
      <div className="relative h-40 w-full overflow-hidden rounded-xl">
        <Image src={news.imageUrl} alt={news.title} fill className="object-cover" />
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-xs uppercase text-foreground/60">
          {news.source} · {new Date(news.publishedAt).toLocaleDateString(locale)}
        </p>
        <h3 className="text-lg font-semibold">{news.title}</h3>
        <p className="text-sm text-foreground/70">{news.excerpt}</p>
        <Link href={`/${locale}/news/${news.slug}`} className="text-sm text-foreground/80">
          {readMore}
        </Link>
      </div>
    </motion.article>
  );
}
