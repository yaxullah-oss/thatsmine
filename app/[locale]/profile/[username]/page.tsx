import { PageTransition } from '@/components/PageTransition';

export default function ProfilePage({ params: { username } }: { params: { username: string } }) {
  return (
    <PageTransition>
      <div className="space-y-6">
        <h1 className="text-3xl font-semibold">{username}</h1>
        <div className="card">Açtığı konular burada listelenecek.</div>
        <div className="card">Yorumlar burada listelenecek.</div>
        <div className="card">Oylar burada listelenecek.</div>
      </div>
    </PageTransition>
  );
}
