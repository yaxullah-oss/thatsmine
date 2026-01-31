import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { mockNews } from '@/data/mock';
import { z } from 'zod';

const slugSchema = z.object({ slug: z.string().min(1) });

export async function GET(_: Request, { params }: { params: { slug: string } }) {
  const parsed = slugSchema.safeParse(params);
  if (!parsed.success) {
    return NextResponse.json({ message: 'Invalid slug' }, { status: 400 });
  }

  try {
    const item = await prisma.news.findUnique({ where: { slug: parsed.data.slug } });
    if (!item) {
      const fallback = mockNews.find((news) => news.slug === parsed.data.slug);
      if (!fallback) {
        return NextResponse.json({ message: 'Not found' }, { status: 404 });
      }
      return NextResponse.json(fallback);
    }
    return NextResponse.json(item);
  } catch (error) {
    const fallback = mockNews.find((news) => news.slug === parsed.data.slug);
    if (!fallback) {
      return NextResponse.json({ message: 'Not found' }, { status: 404 });
    }
    return NextResponse.json(fallback);
  }
}
