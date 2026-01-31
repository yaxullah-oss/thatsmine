import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const idSchema = z.object({ id: z.string().min(1) });

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const parsed = idSchema.safeParse(params);
  if (!parsed.success) {
    return NextResponse.json({ message: 'Invalid id' }, { status: 400 });
  }

  const thread = await prisma.thread.findUnique({
    where: { id: parsed.data.id },
    include: { comments: true, author: true, votes: true, category: true }
  });

  if (!thread) {
    return NextResponse.json({ message: 'Not found' }, { status: 404 });
  }

  return NextResponse.json({
    id: thread.id,
    title: thread.title,
    content: thread.content,
    category: thread.category.slug,
    author: thread.author.username,
    createdAt: thread.createdAt,
    comments: thread.comments,
    votes: thread.votes.reduce((sum, vote) => sum + vote.value, 0)
  });
}
