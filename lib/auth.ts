import { PrismaAdapter } from '@next-auth/prisma-adapter';
import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { prisma } from './prisma';
import { z } from 'zod';
import { checkRateLimit } from './rateLimit';

const credentialsSchema = z.object({
  identifier: z.string().min(3),
  password: z.string().min(8)
});

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt'
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        identifier: { label: 'Email or Username', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        const parsed = credentialsSchema.safeParse(credentials);
        if (!parsed.success) {
          return null;
        }
        const { identifier, password } = parsed.data;
        const allowed = checkRateLimit(`login:${identifier}`);
        if (!allowed) {
          return null;
        }
        const user = await prisma.user.findFirst({
          where: {
            OR: [{ email: identifier }, { username: identifier }]
          }
        });
        if (!user) return null;
        const valid = await bcrypt.compare(password, user.passwordHash);
        if (!valid) return null;
        return { id: user.id, email: user.email, name: user.username };
      }
    })
  ],
  pages: {
    signIn: '/auth/login'
  }
};
