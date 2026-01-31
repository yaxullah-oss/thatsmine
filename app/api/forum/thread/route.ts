import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

const threadSchema = z.object({
  title: z.string().min(3),
  content: z.string().min(10),
  categoryId: z.string()
});

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const parsed = threadSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ message: 'Invalid data' }, { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user) {
    return NextResponse.json({ message: 'User not found' }, { status: 404 });
  }

  const thread = await prisma.thread.create({
    data: {
      title: parsed.data.title,
      content: parsed.data.content,
      categoryId: parsed.data.categoryId,
      authorId: user.id
    }
  });

  return NextResponse.json(thread, { status: 201 });
}
