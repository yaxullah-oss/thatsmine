export const mockNews = [
  {
    slug: 'bitcoin-hashrate-surges',
    title: 'Bitcoin hash oranı yeni zirvede',
    excerpt: 'Madencilik zorluğu artarken ağ güvenliği güçleniyor.',
    content:
      'Bitcoin ağındaki toplam hash oranı yeni bir zirveye ulaştı. Bu durum, ağın güvenliğinin arttığını gösteriyor.',
    imageUrl: 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d',
    source: 'On-chain Daily',
    tags: ['bitcoin', 'madencilik'],
    publishedAt: new Date().toISOString()
  },
  {
    slug: 'eth-staking-demand',
    title: 'Ethereum staking talebi büyüyor',
    excerpt: 'Stake edilen ETH miktarı tüm zamanların en yüksek seviyesinde.',
    content: 'Ethereum staking havuzlarında kilitli ETH miktarı artmaya devam ediyor.',
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475',
    source: 'Layer News',
    tags: ['ethereum', 'staking'],
    publishedAt: new Date().toISOString()
  }
];

export const mockCategories = [
  { slug: 'general', name_tr: 'Genel', name_en: 'General' },
  { slug: 'bitcoin', name_tr: 'Bitcoin', name_en: 'Bitcoin' },
  { slug: 'altcoin', name_tr: 'Altcoin', name_en: 'Altcoins' },
  { slug: 'technical', name_tr: 'Teknik Analiz', name_en: 'Technical Analysis' },
  { slug: 'news', name_tr: 'Haber Tartışma', name_en: 'News Discussion' }
];

export const mockThreads = [
  {
    id: 'thread-1',
    title: 'Piyasa bugün nasıl?',
    content: 'Bugün piyasa duygusu nasıl? Görüşlerinizi paylaşın.',
    category: 'general',
    author: 'demo',
    createdAt: new Date().toISOString(),
    votes: 3
  }
];
