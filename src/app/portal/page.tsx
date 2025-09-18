'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Calendar, Clock, User, Star, Gift, CreditCard } from 'lucide-react'
import Link from 'next/link'

export default function PortalPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'loading') return

    if (!session) {
      router.push('/auth/login')
      return
    }

    if (session.user.role !== 'CLIENT') {
      router.push('/auth/login')
      return
    }
  }, [session, status, router])

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Portal do Cliente</h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">
                Olá, {session.user.name}
              </span>
              <Button variant="outline" onClick={() => router.push('/api/auth/signout')}>
                Sair
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Novo Agendamento */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <Calendar className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Novo Agendamento</CardTitle>
              <CardDescription>
                Agende seu próximo atendimento
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/portal/booking">
                <Button className="w-full">Agendar Agora</Button>
              </Link>
            </CardContent>
          </Card>

          {/* Meus Agendamentos */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <Clock className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Meus Agendamentos</CardTitle>
              <CardDescription>
                Visualize e gerencie seus agendamentos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/portal/appointments">
                <Button variant="outline" className="w-full">Ver Agendamentos</Button>
              </Link>
            </CardContent>
          </Card>

          {/* Histórico */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <User className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Histórico</CardTitle>
              <CardDescription>
                Veja seu histórico de atendimentos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/portal/history">
                <Button variant="outline" className="w-full">Ver Histórico</Button>
              </Link>
            </CardContent>
          </Card>

          {/* Avaliações */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <Star className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Avaliações</CardTitle>
              <CardDescription>
                Avalie seus atendimentos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/portal/reviews">
                <Button variant="outline" className="w-full">Avaliar Serviços</Button>
              </Link>
            </CardContent>
          </Card>

          {/* Programa de Fidelidade */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <Gift className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Programa de Fidelidade</CardTitle>
              <CardDescription>
                Seus pontos e recompensas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-4">
                <div className="text-2xl font-bold text-primary">150 pontos</div>
                <div className="text-sm text-muted-foreground">Disponíveis</div>
              </div>
              <Link href="/portal/loyalty">
                <Button variant="outline" className="w-full">Ver Detalhes</Button>
              </Link>
            </CardContent>
          </Card>

          {/* Carteirinha Digital */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CreditCard className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Carteirinha Digital</CardTitle>
              <CardDescription>
                Seu plano e benefícios
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-4">
                <div className="text-lg font-semibold">Plano Pro</div>
                <div className="text-sm text-muted-foreground">Ativo até 15/04/2024</div>
              </div>
              <Link href="/portal/membership">
                <Button variant="outline" className="w-full">Ver Carteirinha</Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Próximos Agendamentos */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Próximos Agendamentos</h2>
          <Card>
            <CardContent className="p-6">
              <div className="text-center text-muted-foreground py-8">
                <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Nenhum agendamento encontrado</p>
                <p className="text-sm">Que tal agendar um novo atendimento?</p>
                <Link href="/portal/booking">
                  <Button className="mt-4">Agendar Agora</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  )
}