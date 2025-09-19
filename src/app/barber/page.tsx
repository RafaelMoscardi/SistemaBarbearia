'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Calendar, Clock, User, TrendingUp, DollarSign, Star } from 'lucide-react'
import Link from 'next/link'

export default function BarberDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'loading') return

    if (!session) {
      router.push('/auth/login')
      return
    }

    if (session.user.role !== 'BARBER') {
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
            <h1 className="text-2xl font-bold">Dashboard do Barbeiro</h1>
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
        {/* KPIs Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Atendimentos Hoje</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">3 confirmados</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Faturamento Hoje</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">R$ 320,00</div>
              <p className="text-xs text-muted-foreground">Comissão: R$ 160,00</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avaliação Média</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4.8</div>
              <p className="text-xs text-muted-foreground">125 avaliações</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Taxa de Ocupação</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">75%</div>
              <p className="text-xs text-muted-foreground">Boa performance</p>
            </CardContent>
          </Card>
        </div>

        {/* Management Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <Calendar className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Minha Agenda</CardTitle>
              <CardDescription>
                Veja seus agendamentos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/barber/agenda">
                <Button className="w-full">Ver Agenda</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <Clock className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Horários</CardTitle>
              <CardDescription>
                Gerencie sua disponibilidade
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/barber/schedule">
                <Button variant="outline" className="w-full">Gerenciar</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <User className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Meus Clientes</CardTitle>
              <CardDescription>
                Histórico e preferências
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/barber/clients">
                <Button variant="outline" className="w-full">Ver Clientes</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <DollarSign className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Comissões</CardTitle>
              <CardDescription>
                Relatório financeiro
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/barber/financial">
                <Button variant="outline" className="w-full">Ver Relatório</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <Star className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Avaliações</CardTitle>
              <CardDescription>
                Feedback dos clientes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/barber/reviews">
                <Button variant="outline" className="w-full">Ver Avaliações</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <TrendingUp className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Performance</CardTitle>
              <CardDescription>
                Métricas e relatórios
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/barber/performance">
                <Button variant="outline" className="w-full">Ver Métricas</Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Today's Schedule */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Agenda de Hoje</h2>
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted">
                  <div className="flex items-center space-x-4">
                    <span className="text-sm font-medium">09:00</span>
                    <div>
                      <p className="font-medium">João Silva</p>
                      <p className="text-sm text-muted-foreground">Corte + Barba</p>
                    </div>
                  </div>
                  <Button size="sm">Confirmar</Button>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted">
                  <div className="flex items-center space-x-4">
                    <span className="text-sm font-medium">10:00</span>
                    <div>
                      <p className="font-medium">Pedro Santos</p>
                      <p className="text-sm text-muted-foreground">Corte Degradê</p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">Confirmado</Button>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted">
                  <div className="flex items-center space-x-4">
                    <span className="text-sm font-medium">11:00</span>
                    <div>
                      <p className="font-medium">Roberto Lima</p>
                      <p className="text-sm text-muted-foreground">Barba</p>
                    </div>
                  </div>
                  <Button size="sm">Confirmar</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  )
}