import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { mockCategories } from '@/data/mock';

export async function GET() {
  try {
    const categories = await prisma.category.findMany({ orderBy: { name_tr: 'asc' } });
    if (categories.length === 0) {
      return NextResponse.json(mockCategories);
    }
    return NextResponse.json(categories);
  } catch (error) {
    return NextResponse.json(mockCategories);
  }
}
