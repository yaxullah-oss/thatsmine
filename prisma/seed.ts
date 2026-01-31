import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash('Password123!', 10);

  const demoUser = await prisma.user.upsert({
    where: { email: 'demo@thatsmine.dev' },
    update: {},
    create: {
      email: 'demo@thatsmine.dev',
      username: 'demo',
      passwordHash
    }
  });

  const categories = [
    { slug: 'general', name_tr: 'Genel', name_en: 'General' },
    { slug: 'bitcoin', name_tr: 'Bitcoin', name_en: 'Bitcoin' },
    { slug: 'altcoin', name_tr: 'Altcoin', name_en: 'Altcoins' },
    { slug: 'technical', name_tr: 'Teknik Analiz', name_en: 'Technical Analysis' },
    { slug: 'news', name_tr: 'Haber Tartışma', name_en: 'News Discussion' }
  ];

  for (const category of categories) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: {},
      create: category
    });
  }

  const newsItems = [
    {
      slug: 'bitcoin-hashrate-surges',
      title: 'Bitcoin hash oranı yeni zirvede',
      excerpt: 'Madencilik zorluğu artarken ağ güvenliği güçleniyor.',
      content: 'Bitcoin ağındaki toplam hash oranı yeni bir zirveye ulaştı. Bu durum, ağın güvenliğinin arttığını gösteriyor.',
      imageUrl: 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d',
      source: 'On-chain Daily',
      tags: ['bitcoin', 'madencilik'],
      publishedAt: new Date()
    },
    {
      slug: 'eth-staking-demand',
      title: 'Ethereum staking talebi büyüyor',
      excerpt: 'Stake edilen ETH miktarı tüm zamanların en yüksek seviyesinde.',
      content: 'Ethereum staking havuzlarında kilitli ETH miktarı artmaya devam ediyor.',
      imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475',
      source: 'Layer News',
      tags: ['ethereum', 'staking'],
      publishedAt: new Date()
    }
  ];

  for (const item of newsItems) {
    await prisma.news.upsert({
      where: { slug: item.slug },
      update: {},
      create: item
    });
  }

  const general = await prisma.category.findFirst({ where: { slug: 'general' } });

  if (general) {
    await prisma.thread.create({
      data: {
        title: 'İlk konu: Piyasa bugün nasıl?',
        content: 'Bugün piyasa duygusu nasıl? Görüşlerinizi paylaşın.',
        categoryId: general.id,
        authorId: demoUser.id
      }
    });
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
