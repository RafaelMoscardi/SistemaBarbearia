import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Iniciando seed do banco de dados...')

  // Criar organização principal
  const org = await prisma.organization.create({
    data: {
      name: 'Barbearia Premium',
    },
  })

  console.log('✅ Organização criada')

  // Criar unidades
  const unit1 = await prisma.unit.create({
    data: {
      organizationId: org.id,
      name: 'Unidade Centro',
      address: 'Rua Principal, 123 - Centro',
      phone: '(11) 3000-0001',
      email: 'centro@barbeariapremium.com',
      timezone: 'America/Sao_Paulo',
      openHours: JSON.stringify({
        monday: { open: '09:00', close: '20:00' },
        tuesday: { open: '09:00', close: '20:00' },
        wednesday: { open: '09:00', close: '20:00' },
        thursday: { open: '09:00', close: '20:00' },
        friday: { open: '09:00', close: '21:00' },
        saturday: { open: '09:00', close: '18:00' },
        sunday: { open: 'closed', close: 'closed' },
      }),
    },
  })

  const unit2 = await prisma.unit.create({
    data: {
      organizationId: org.id,
      name: 'Unidade Shopping',
      address: 'Shopping Plaza, Loja 45',
      phone: '(11) 3000-0002',
      email: 'shopping@barbeariapremium.com',
      timezone: 'America/Sao_Paulo',
      openHours: JSON.stringify({
        monday: { open: '10:00', close: '22:00' },
        tuesday: { open: '10:00', close: '22:00' },
        wednesday: { open: '10:00', close: '22:00' },
        thursday: { open: '10:00', close: '22:00' },
        friday: { open: '10:00', close: '22:00' },
        saturday: { open: '10:00', close: '22:00' },
        sunday: { open: '12:00', close: '20:00' },
      }),
    },
  })

  console.log('✅ Unidades criadas')

  // Criar usuários
  const hashedPassword = await hash('senha123', 10)

  // Owner/Manager
  const owner = await prisma.user.create({
    data: {
      organizationId: org.id,
      email: 'admin@barbeariapremium.com',
      password: hashedPassword,
      name: 'João Admin',
      phone: '(11) 99999-0000',
      role: 'OWNER',
    },
  })

  // Barbeiros
  const barber1User = await prisma.user.create({
    data: {
      organizationId: org.id,
      unitId: unit1.id,
      email: 'carlos@barbeariapremium.com',
      password: hashedPassword,
      name: 'Carlos Silva',
      phone: '(11) 99999-0001',
      role: 'BARBER',
    },
  })

  const barber1 = await prisma.barber.create({
    data: {
      organizationId: org.id,
      unitId: unit1.id,
      userId: barber1User.id,
      displayName: 'Carlos',
      bio: 'Especialista em cortes modernos e barba',
      specialties: JSON.stringify(['Corte moderno', 'Barba', 'Desenho']),
      commissionPct: 50.0,
    },
  })

  const barber2User = await prisma.user.create({
    data: {
      organizationId: org.id,
      unitId: unit1.id,
      email: 'marcos@barbeariapremium.com',
      password: hashedPassword,
      name: 'Marcos Oliveira',
      phone: '(11) 99999-0002',
      role: 'BARBER',
    },
  })

  const barber2 = await prisma.barber.create({
    data: {
      organizationId: org.id,
      unitId: unit1.id,
      userId: barber2User.id,
      displayName: 'Marcos',
      bio: 'Cortes clássicos e tradicionais',
      specialties: JSON.stringify(['Corte clássico', 'Barba tradicional']),
      commissionPct: 45.0,
    },
  })

  const barber3User = await prisma.user.create({
    data: {
      organizationId: org.id,
      unitId: unit2.id,
      email: 'pedro@barbeariapremium.com',
      password: hashedPassword,
      name: 'Pedro Santos',
      phone: '(11) 99999-0003',
      role: 'BARBER',
    },
  })

  const barber3 = await prisma.barber.create({
    data: {
      organizationId: org.id,
      unitId: unit2.id,
      userId: barber3User.id,
      displayName: 'Pedro',
      bio: 'Especialista em coloração e química',
      specialties: JSON.stringify(['Coloração', 'Química', 'Corte']),
      commissionPct: 55.0,
    },
  })

  console.log('✅ Barbeiros criados')

  // Clientes
  const client1User = await prisma.user.create({
    data: {
      organizationId: org.id,
      email: 'cliente1@email.com',
      password: hashedPassword,
      name: 'Roberto Cliente',
      phone: '(11) 98888-0001',
      role: 'CLIENT',
    },
  })

  const client1Profile = await prisma.clientProfile.create({
    data: {
      organizationId: org.id,
      userId: client1User.id,
      preferredBarberId: barber1.id,
      points: 150,
      preferences: JSON.stringify({
        notifications: true,
        reminderHours: 24,
      }),
    },
  })

  const client2User = await prisma.user.create({
    data: {
      organizationId: org.id,
      email: 'cliente2@email.com',
      password: hashedPassword,
      name: 'Ana Cliente',
      phone: '(11) 98888-0002',
      role: 'CLIENT',
    },
  })

  const client2Profile = await prisma.clientProfile.create({
    data: {
      organizationId: org.id,
      userId: client2User.id,
      points: 75,
      preferences: JSON.stringify({
        notifications: true,
        reminderHours: 12,
      }),
    },
  })

  console.log('✅ Clientes criados')

  // Serviços
  const services = await Promise.all([
    prisma.service.create({
      data: {
        organizationId: org.id,
        name: 'Corte de Cabelo',
        description: 'Corte profissional com acabamento',
        category: 'Cabelo',
        defaultDurationMinutes: 30,
        defaultPriceCents: 3500,
      },
    }),
    prisma.service.create({
      data: {
        organizationId: org.id,
        name: 'Barba',
        description: 'Aparar e modelar barba',
        category: 'Barba',
        defaultDurationMinutes: 20,
        defaultPriceCents: 2500,
      },
    }),
    prisma.service.create({
      data: {
        organizationId: org.id,
        name: 'Corte + Barba',
        description: 'Combo completo',
        category: 'Combo',
        defaultDurationMinutes: 45,
        defaultPriceCents: 5500,
      },
    }),
    prisma.service.create({
      data: {
        organizationId: org.id,
        name: 'Luzes',
        description: 'Coloração com luzes',
        category: 'Química',
        defaultDurationMinutes: 90,
        defaultPriceCents: 12000,
      },
    }),
    prisma.service.create({
      data: {
        organizationId: org.id,
        name: 'Relaxamento',
        description: 'Relaxamento capilar',
        category: 'Química',
        defaultDurationMinutes: 120,
        defaultPriceCents: 15000,
      },
    }),
    prisma.service.create({
      data: {
        organizationId: org.id,
        name: 'Sobrancelha',
        description: 'Design de sobrancelha',
        category: 'Outros',
        defaultDurationMinutes: 15,
        defaultPriceCents: 2000,
      },
    }),
  ])

  // Preços específicos por unidade (exemplo: Shopping é 20% mais caro)
  await Promise.all(
    services.map(service =>
      prisma.servicePrice.create({
        data: {
          organizationId: org.id,
          serviceId: service.id,
          unitId: unit2.id,
          priceCents: Math.floor(service.defaultPriceCents * 1.2),
        },
      })
    )
  )

  console.log('✅ Serviços criados')

  // Planos
  const plans = await Promise.all([
    prisma.plan.create({
      data: {
        organizationId: org.id,
        name: 'BASIC',
        displayName: 'Plano Basic',
        description: 'Ideal para clientes ocasionais',
        priceCents: 4900,
        period: 'MONTHLY',
        benefits: JSON.stringify({
          discountPercent: 5,
          priorityBooking: false,
          freeServices: [],
        }),
      },
    }),
    prisma.plan.create({
      data: {
        organizationId: org.id,
        name: 'PRO',
        displayName: 'Plano Pro',
        description: 'Para clientes frequentes',
        priceCents: 8900,
        period: 'MONTHLY',
        benefits: JSON.stringify({
          discountPercent: 15,
          priorityBooking: true,
          freeServices: ['Sobrancelha'],
        }),
      },
    }),
    prisma.plan.create({
      data: {
        organizationId: org.id,
        name: 'PREMIUM',
        displayName: 'Plano Premium',
        description: 'Experiência completa',
        priceCents: 14900,
        period: 'MONTHLY',
        benefits: JSON.stringify({
          discountPercent: 25,
          priorityBooking: true,
          freeServices: ['Sobrancelha', 'Barba'],
          vipLounge: true,
        }),
      },
    }),
  ])

  // Assinaturas
  const now = new Date()
  const nextMonth = new Date(now)
  nextMonth.setMonth(nextMonth.getMonth() + 1)

  await prisma.subscription.create({
    data: {
      organizationId: org.id,
      clientUserId: client1User.id,
      planId: plans[1].id, // Pro
      status: 'ACTIVE',
      currentPeriodStart: now,
      currentPeriodEnd: nextMonth,
    },
  })

  console.log('✅ Planos e assinaturas criados')

  // Cupons
  await Promise.all([
    prisma.coupon.create({
      data: {
        organizationId: org.id,
        code: 'BEMVINDO10',
        description: 'Desconto de boas-vindas',
        percentOff: 10,
        validFrom: now,
        validTo: new Date(now.getTime() + 90 * 24 * 60 * 60 * 1000), // +90 dias
        maxRedemptions: 100,
      },
    }),
    prisma.coupon.create({
      data: {
        organizationId: org.id,
        code: 'VOLTA20',
        description: 'Desconto para voltar',
        percentOff: 20,
        validFrom: now,
        validTo: new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000), // +30 dias
        maxRedemptions: 50,
      },
    }),
  ])

  console.log('✅ Cupons criados')

  // Regras de comissão
  await Promise.all([
    // Regra geral
    prisma.commissionRule.create({
      data: {
        organizationId: org.id,
        percent: 40.0,
        priority: 0,
      },
    }),
    // Regra para serviços de química
    prisma.commissionRule.create({
      data: {
        organizationId: org.id,
        serviceId: services[3].id, // Luzes
        percent: 60.0,
        priority: 1,
      },
    }),
  ])

  console.log('✅ Regras de comissão criadas')

  // Agendamentos de exemplo
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  tomorrow.setHours(10, 0, 0, 0)

  await prisma.appointment.create({
    data: {
      organizationId: org.id,
      unitId: unit1.id,
      barberId: barber1.id,
      clientUserId: client1User.id,
      serviceId: services[0].id, // Corte
      startAt: tomorrow,
      endAt: new Date(tomorrow.getTime() + 30 * 60 * 1000),
      priceAppliedCents: 3500,
      status: 'SCHEDULED',
    },
  })

  const nextWeek = new Date()
  nextWeek.setDate(nextWeek.getDate() + 7)
  nextWeek.setHours(14, 0, 0, 0)

  await prisma.appointment.create({
    data: {
      organizationId: org.id,
      unitId: unit1.id,
      barberId: barber2.id,
      clientUserId: client2User.id,
      serviceId: services[2].id, // Corte + Barba
      startAt: nextWeek,
      endAt: new Date(nextWeek.getTime() + 45 * 60 * 1000),
      priceAppliedCents: 5500,
      status: 'SCHEDULED',
    },
  })

  console.log('✅ Agendamentos de exemplo criados')

  console.log('🎉 Seed concluído com sucesso!')
  console.log('\n📧 Credenciais de acesso:')
  console.log('Admin: admin@barbeariapremium.com / senha123')
  console.log('Barbeiro: carlos@barbeariapremium.com / senha123')
  console.log('Cliente: cliente1@email.com / senha123')
}

main()
  .catch((e) => {
    console.error('❌ Erro durante o seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })