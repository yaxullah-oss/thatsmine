# thatsMine — Full-stack Crypto News + Forum

Modern, animasyonlu ve production'a yakın bir kripto haber sitesi + forum projesi. TR/EN dil seçimi, dark/light tema, auth, Prisma + PostgreSQL ve NextAuth içermektedir.

## 📁 Dizin Yapısı

```
app/
  [locale]/
    about/
    auth/
      login/
      register/
    forum/
      [category]/
    news/
      [slug]/
    profile/
      [username]/
    settings/
    thread/
      [id]/
  api/
    auth/
    forum/
    news/
components/
lib/
messages/
prisma/
styles/
```

## ✅ Özellikler
- Next.js App Router + TypeScript + TailwindCSS
- Framer Motion animasyonları (sayfa geçişleri, hover, skeleton loading)
- NextAuth Credentials (JWT) + bcrypt hash
- PostgreSQL + Prisma ORM
- Zod validation
- next-intl (TR/EN)
- next-themes (dark/light)
- React Query cache/fetch
- Seed data (news + forum)

## ⚙️ Kurulum

```bash
npm install
```

### .env

```
cp .env.example .env
```

### Prisma migrate + seed

```bash
npm run prisma:migrate
npm run prisma:seed
```

### Dev server

```bash
npm run dev
```

## 🧪 Test Senaryoları
1. Kayıt ol (TR/EN form mesajlarını doğrula).
2. Giriş yap (email/username + şifre).
3. Konu aç (auth zorunlu, API test).
4. Yorum at (auth zorunlu).
5. Oy ver (upvote/downvote, tek oy).
6. Dil değiştir (TR/EN URL).
7. Tema değiştir (dark/light).
