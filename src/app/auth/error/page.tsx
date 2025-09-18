'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertCircle, Scissors } from 'lucide-react'

export default function AuthErrorPage() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')

  const getErrorMessage = (error: string | null) => {
    switch (error) {
      case 'CredentialsSignin':
        return 'Email ou senha inválidos. Verifique suas credenciais e tente novamente.'
      case 'AccessDenied':
        return 'Acesso negado. Você não tem permissão para acessar este recurso.'
      case 'Verification':
        return 'Token de verificação inválido ou expirado.'
      default:
        return 'Ocorreu um erro durante a autenticação. Tente novamente.'
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-muted">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-destructive/10 rounded-full">
              <AlertCircle className="h-8 w-8 text-destructive" />
            </div>
          </div>
          <CardTitle className="text-2xl">Erro de Autenticação</CardTitle>
          <CardDescription>
            {getErrorMessage(error)}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <Link href="/auth/login">
              <Button className="w-full">
                Tentar Novamente
              </Button>
            </Link>
          </div>

          <div className="text-center">
            <Link href="/">
              <Button variant="outline" className="w-full">
                Voltar ao Início
              </Button>
            </Link>
          </div>

          <div className="mt-6 p-4 bg-muted rounded-md">
            <p className="text-sm font-medium mb-2">Credenciais de teste:</p>
            <div className="text-xs space-y-1">
              <p><strong>Admin:</strong> admin@barbeariapremium.com</p>
              <p><strong>Barbeiro:</strong> carlos@barbeariapremium.com</p>
              <p><strong>Cliente:</strong> cliente1@email.com</p>
              <p><strong>Senha:</strong> senha123</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}