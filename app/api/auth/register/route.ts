import { NextResponse } from 'next/server';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';

const registerSchema = z.object({
  email: z.string().email(),
  username: z.string().min(3),
  password: z
    .string()
    .min(8)
    .regex(/[A-Z]/, 'Password must contain uppercase')
    .regex(/[0-9]/, 'Password must contain number')
});

const messages = {
  tr: {
    invalid: 'Geçersiz veri',
    exists: 'Kullanıcı zaten var',
    success: 'Kayıt başarılı'
  },
  en: {
    invalid: 'Invalid data',
    exists: 'User already exists',
    success: 'Registration successful'
  }
};

function getLocale(request: Request) {
  const header = request.headers.get('accept-language');
  return header?.startsWith('en') ? 'en' : 'tr';
}

export async function POST(request: Request) {
  const locale = getLocale(request);
  const body = await request.json();
  const parsed = registerSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ message: messages[locale].invalid }, { status: 400 });
  }

  const { email, username, password } = parsed.data;

  const existing = await prisma.user.findFirst({
    where: { OR: [{ email }, { username }] }
  });

  if (existing) {
    return NextResponse.json({ message: messages[locale].exists }, { status: 409 });
  }

  const passwordHash = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: { email, username, passwordHash }
  });

  return NextResponse.json({ message: messages[locale].success }, { status: 201 });
}
