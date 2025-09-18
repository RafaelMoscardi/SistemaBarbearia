import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        isActive: true,
        password: true, // Para verificar se existe
      },
    })

    return NextResponse.json({
      count: users.length,
      users: users.map(user => ({
        ...user,
        hasPassword: !!user.password,
        password: undefined, // Remove da resposta por segurança
      })),
    })
  } catch (error) {
    console.error('Erro ao buscar usuários:', error)
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }
}