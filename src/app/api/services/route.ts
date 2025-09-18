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

    const services = await prisma.service.findMany({
      where: {
        organizationId: session.user.organizationId,
        isActive: true,
      },
      include: {
        servicePrices: {
          where: unitId ? { unitId } : {},
        },
      },
      orderBy: {
        name: 'asc',
      },
    })

    // Calculate final prices
    const servicesWithPrices = services.map(service => {
      const unitPrice = service.servicePrices.find(sp => sp.unitId === unitId)
      const finalPrice = unitPrice ? unitPrice.priceCents : service.defaultPriceCents

      return {
        ...service,
        finalPrice,
        servicePrices: undefined, // Remove from response
      }
    })

    return NextResponse.json(servicesWithPrices)
  } catch (error) {
    console.error('Error fetching services:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}