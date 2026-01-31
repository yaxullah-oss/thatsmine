import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { mockNews } from '@/data/mock';

export async function GET() {
  try {
    const news = await prisma.news.findMany({ orderBy: { publishedAt: 'desc' } });
    if (news.length === 0) {
      return NextResponse.json(mockNews);
    }
    return NextResponse.json(news);
  } catch (error) {
    return NextResponse.json(mockNews);
  }
}
