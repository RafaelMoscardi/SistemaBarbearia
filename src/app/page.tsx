import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Scissors, Calendar, Users, TrendingUp, Award, Clock } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Scissors className="h-8 w-8" />
            <span className="text-2xl font-bold">Sistema Barbearia</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/auth/login">
              <Button variant="outline">Entrar</Button>
            </Link>
            <Link href="/auth/register">
              <Button>Cadastrar</Button>
            </Link>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-12">
        <section className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">
            Sistema Completo para sua Barbearia
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Gerencie agendamentos, clientes, barbeiros e muito mais em um só lugar
          </p>
          <div className="flex justify-center space-x-4">
            <Link href="/portal">
              <Button size="lg">Portal do Cliente</Button>
            </Link>
            <Link href="/auth/login">
              <Button size="lg" variant="outline">
                Área Administrativa
              </Button>
            </Link>
          </div>
        </section>

        <section className="grid md:grid-cols-3 gap-6 mb-16">
          <Card>
            <CardHeader>
              <Calendar className="h-10 w-10 mb-2 text-primary" />
              <CardTitle>Agendamento Online</CardTitle>
              <CardDescription>
                Clientes podem agendar serviços 24/7 pelo portal
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li>✓ Escolha de barbeiro preferido</li>
                <li>✓ Múltiplos serviços</li>
                <li>✓ Confirmação automática</li>
                <li>✓ Lembretes por e-mail</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Users className="h-10 w-10 mb-2 text-primary" />
              <CardTitle>Gestão de Equipe</CardTitle>
              <CardDescription>
                Controle completo sobre barbeiros e comissões
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li>✓ Agenda individual</li>
                <li>✓ Cálculo de comissões</li>
                <li>✓ Relatórios de desempenho</li>
                <li>✓ Bloqueio de horários</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <TrendingUp className="h-10 w-10 mb-2 text-primary" />
              <CardTitle>Dashboard e Relatórios</CardTitle>
              <CardDescription>
                Acompanhe o desempenho do seu negócio
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li>✓ Faturamento por período</li>
                <li>✓ Taxa de ocupação</li>
                <li>✓ Ticket médio</li>
                <li>✓ Exportação em CSV</li>
              </ul>
            </CardContent>
          </Card>
        </section>

        <section className="grid md:grid-cols-2 gap-6 mb-16">
          <Card>
            <CardHeader>
              <Award className="h-10 w-10 mb-2 text-primary" />
              <CardTitle>Programa de Fidelidade</CardTitle>
              <CardDescription>
                Fidelize seus clientes com benefícios exclusivos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li>✓ Planos Basic, Pro e Premium</li>
                <li>✓ Sistema de pontos</li>
                <li>✓ Cupons de desconto</li>
                <li>✓ Carteirinha digital</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Clock className="h-10 w-10 mb-2 text-primary" />
              <CardTitle>Multi-unidade</CardTitle>
              <CardDescription>
                Gerencie múltiplas filiais em um só sistema
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li>✓ Horários independentes</li>
                <li>✓ Preços por unidade</li>
                <li>✓ Relatórios consolidados</li>
                <li>✓ Gestão centralizada</li>
              </ul>
            </CardContent>
          </Card>
        </section>

        <section className="text-center">
          <h2 className="text-3xl font-bold mb-4">
            Pronto para transformar sua barbearia?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Comece agora mesmo com nosso sistema completo
          </p>
          <Link href="/auth/register">
            <Button size="lg">Criar Conta Grátis</Button>
          </Link>
        </section>
      </main>

      <footer className="container mx-auto px-4 py-8 mt-16 border-t">
        <div className="text-center text-sm text-muted-foreground">
          © 2024 Sistema Barbearia. Todos os direitos reservados.
        </div>
      </footer>
    </div>
  )
}