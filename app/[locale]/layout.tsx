import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Providers } from '@/components/Providers';
import { Navbar } from '@/components/Navbar';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'ThatsMine Crypto Hub',
  description: 'Crypto news and forum experience.'
};

const locales = ['tr', 'en'];

export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!locales.includes(locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        <Providers>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <div className="min-h-screen bg-background text-foreground">
              <Navbar locale={locale} />
              <main className="mx-auto w-full max-w-6xl px-6 pb-20 pt-28">
                {children}
              </main>
            </div>
          </NextIntlClientProvider>
        </Providers>
      </body>
    </html>
  );
}
