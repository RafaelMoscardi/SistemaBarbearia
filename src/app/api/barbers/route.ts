import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const unitId = searchParams.get('unitId')

    const barbers = await prisma.barber.findMany({
      where: {
        organizationId: session.user.organizationId,
        isActive: true,
        ...(unitId && { unitId }),
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
            phone: true,
            image: true,
          },
        },
        unit: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        displayName: 'asc',
      },
    })

    return NextResponse.json(barbers)
  } catch (error) {
    console.error('Error fetching barbers:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}