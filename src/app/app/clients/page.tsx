'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Users } from 'lucide-react'

export default function ClientsPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'loading') return

    if (!session) {
      router.push('/auth/login')
      return
    }

    if (!['OWNER', 'MANAGER'].includes(session.user.role)) {
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
            <div className="flex items-center space-x-2">
              <Users className="h-8 w-8" />
              <h1 className="text-2xl font-bold">Gestão de Clientes</h1>
            </div>
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
        <Card>
          <CardHeader>
            <CardTitle>Gerenciamento de Clientes</CardTitle>
            <CardDescription>
              Esta página está em desenvolvimento. Em breve você poderá gerenciar toda sua base de clientes.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <Users className="h-24 w-24 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">Página em Construção</h3>
              <p className="text-muted-foreground mb-6">
                Funcionalidades que estarão disponíveis:
              </p>
              <ul className="text-left space-y-2 max-w-md mx-auto text-muted-foreground">
                <li>• Cadastro de novos clientes</li>
                <li>• Histórico completo de atendimentos</li>
                <li>• Preferências e observações</li>
                <li>• Comunicação via WhatsApp</li>
                <li>• Programa de fidelidade</li>
                <li>• Análise de comportamento</li>
              </ul>
              <Button
                className="mt-6"
                onClick={() => router.push('/app')}
              >
                Voltar ao Dashboard
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}