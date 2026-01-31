import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

const voteSchema = z.object({
  value: z.number().int().refine((value) => value === 1 || value === -1)
});

const idSchema = z.object({ id: z.string().min(1) });

export async function POST(request: Request, { params }: { params: { id: string } }) {
  const idParsed = idSchema.safeParse(params);
  if (!idParsed.success) {
    return NextResponse.json({ message: 'Invalid id' }, { status: 400 });
  }

  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const parsed = voteSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ message: 'Invalid data' }, { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user) {
    return NextResponse.json({ message: 'User not found' }, { status: 404 });
  }

  const vote = await prisma.vote.upsert({
    where: { userId_threadId: { userId: user.id, threadId: idParsed.data.id } },
    create: {
      userId: user.id,
      threadId: idParsed.data.id,
      value: parsed.data.value
    },
    update: {
      value: parsed.data.value
    }
  });

  return NextResponse.json(vote, { status: 200 });
}
