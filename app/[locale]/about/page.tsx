import { PageTransition } from '@/components/PageTransition';

export default function AboutPage() {
  return (
    <PageTransition>
      <div className="space-y-4">
        <h1 className="text-3xl font-semibold">About</h1>
        <p className="text-foreground/70">
          ThatsMine, kripto haberleri ve topluluk tartışmalarını tek bir yerde sunan modern bir
          platformdur.
        </p>
      </div>
    </PageTransition>
  );
}
