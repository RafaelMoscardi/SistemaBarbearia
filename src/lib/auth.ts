import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { compare } from 'bcryptjs'
import { prisma } from '@/lib/prisma'

// Role types for the application
type Role = 'OWNER' | 'MANAGER' | 'BARBER' | 'CLIENT'

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: '/auth/login',
    error: '/auth/error',
  },
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          console.log('🔐 Tentativa de login:', credentials?.email)

          if (!credentials?.email || !credentials?.password) {
            console.log('❌ Credenciais incompletas')
            throw new Error('Email e senha são obrigatórios')
          }

          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
            include: {
              organization: true,
              unit: true,
            },
          })

          console.log('👤 Usuário encontrado:', user ? 'Sim' : 'Não')

          if (!user || !user.password) {
            console.log('❌ Usuário não encontrado ou sem senha')
            throw new Error('Email ou senha inválidos')
          }

          const isPasswordValid = await compare(credentials.password, user.password)
          console.log('🔑 Senha válida:', isPasswordValid)

          if (!isPasswordValid) {
            console.log('❌ Senha inválida')
            throw new Error('Email ou senha inválidos')
          }

          if (!user.isActive) {
            console.log('❌ Conta desativada')
            throw new Error('Conta desativada')
          }

          console.log('✅ Login bem-sucedido para:', user.email)
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            organizationId: user.organizationId,
            unitId: user.unitId,
            image: user.image,
          }
        } catch (error) {
          console.error('🚨 Erro na autenticação:', error)
          throw error
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (trigger === 'update' && session) {
        return { ...token, ...session }
      }

      if (user) {
        token.id = user.id
        token.role = user.role as Role
        token.organizationId = user.organizationId
        token.unitId = user.unitId
        token.image = user.image
      }

      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.role = token.role as Role
        session.user.organizationId = token.organizationId as string
        session.user.unitId = token.unitId as string | null
        session.user.image = token.image as string | null
      }

      return session
    },
  },
  events: {
    async signIn({ user }) {
      await prisma.auditLog.create({
        data: {
          organizationId: user.organizationId!,
          actorUserId: user.id,
          action: 'LOGIN',
          entity: 'USER',
          entityId: user.id,
        },
      })
    },
    async signOut({ token }) {
      if (token?.id) {
        await prisma.auditLog.create({
          data: {
            organizationId: token.organizationId as string,
            actorUserId: token.id as string,
            action: 'LOGOUT',
            entity: 'USER',
            entityId: token.id as string,
          },
        })
      }
    },
  },
}