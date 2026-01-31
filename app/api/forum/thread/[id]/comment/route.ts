import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

const commentSchema = z.object({
  content: z.string().min(3)
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
  const parsed = commentSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ message: 'Invalid data' }, { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user) {
    return NextResponse.json({ message: 'User not found' }, { status: 404 });
  }

  const comment = await prisma.comment.create({
    data: {
      content: parsed.data.content,
      threadId: idParsed.data.id,
      authorId: user.id
    }
  });

  return NextResponse.json(comment, { status: 201 });
}
