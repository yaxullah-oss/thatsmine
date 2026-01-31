import Link from 'next/link';
import { motion } from 'framer-motion';

interface ThreadCardProps {
  locale: string;
  thread: {
    id: string;
    title: string;
    content: string;
    category: string;
    author: string;
    createdAt: string;
    votes: number;
  };
}

export function ThreadCard({ locale, thread }: ThreadCardProps) {
  const detailsLabel = locale === 'tr' ? 'Detaya git →' : 'View details →';

  return (
    <motion.article whileHover={{ scale: 1.01 }} className="card">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-xs uppercase text-foreground/60">{thread.category}</p>
          <h3 className="text-lg font-semibold">{thread.title}</h3>
          <p className="text-sm text-foreground/70">{thread.content}</p>
          <p className="text-xs text-foreground/50">
            {thread.author} · {new Date(thread.createdAt).toLocaleDateString(locale)}
          </p>
        </div>
        <div className="text-sm font-semibold">+{thread.votes}</div>
      </div>
      <Link href={`/${locale}/thread/${thread.id}`} className="mt-4 inline-block text-sm">
        {detailsLabel}
      </Link>
    </motion.article>
  );
}
