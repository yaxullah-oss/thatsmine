import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { mockThreads } from '@/data/mock';

const querySchema = z.object({
  category: z.string().optional(),
  sort: z.enum(['new', 'popular']).optional(),
  q: z.string().optional()
});

export async function GET(request: Request) {
  const url = new URL(request.url);
  const parsed = querySchema.safeParse({
    category: url.searchParams.get('category') ?? undefined,
    sort: url.searchParams.get('sort') ?? undefined,
    q: url.searchParams.get('q') ?? undefined
  });

  if (!parsed.success) {
    return NextResponse.json({ message: 'Invalid query' }, { status: 400 });
  }

  const { category, sort, q } = parsed.data;

  try {
    const where = {
      ...(category ? { category: { slug: category } } : {}),
      ...(q
        ? {
            OR: [
              { title: { contains: q, mode: 'insensitive' } },
              { content: { contains: q, mode: 'insensitive' } }
            ]
          }
        : {})
    };

    const threads = await prisma.thread.findMany({
      where,
      include: {
        category: true,
        author: true,
        votes: true
      },
      orderBy:
        sort === 'popular'
          ? { votes: { _count: 'desc' } }
          : { createdAt: 'desc' }
    });

    return NextResponse.json(
      threads.map((thread) => ({
        id: thread.id,
        title: thread.title,
        content: thread.content,
        category: thread.category.slug,
        author: thread.author.username,
        createdAt: thread.createdAt,
        votes: thread.votes.reduce((sum, vote) => sum + vote.value, 0)
      }))
    );
  } catch (error) {
    return NextResponse.json(mockThreads);
  }
}
