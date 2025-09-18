'use client'

import { useState } from 'react'
import { signIn, getSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Scissors, Eye, EyeOff } from 'lucide-react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      console.log('🚀 Iniciando login para:', email)

      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      console.log('📋 Resultado do signIn:', result)

      if (result?.error) {
        console.log('❌ Erro no signIn:', result.error)
        setError('Email ou senha inválidos')
        return
      }

      if (!result?.ok) {
        console.log('❌ SignIn não foi ok')
        setError('Erro ao fazer login. Tente novamente.')
        return
      }

      // Wait a bit for session to be set
      await new Promise(resolve => setTimeout(resolve, 500))

      // Get session to determine redirect
      const session = await getSession()
      console.log('👤 Sessão obtida:', session)

      if (session?.user?.role) {
        console.log('🎯 Redirecionando para role:', session.user.role)
        switch (session.user.role) {
          case 'CLIENT':
            router.push('/portal')
            break
          case 'BARBER':
            router.push('/barber')
            break
          case 'OWNER':
          case 'MANAGER':
            router.push('/app')
            break
          default:
            router.push('/')
        }
      } else {
        console.log('❓ Sessão sem role, redirecionando para home')
        router.push('/')
      }
    } catch (error) {
      console.error('🚨 Erro durante login:', error)
      setError('Erro ao fazer login. Tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-muted">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Scissors className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-2xl">Entrar</CardTitle>
          <CardDescription>
            Entre com suas credenciais para acessar o sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Sua senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            {error && (
              <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-md">
                {error}
              </div>
            )}

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Entrando...' : 'Entrar'}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            <p className="text-muted-foreground">
              Não tem uma conta?{' '}
              <Link href="/auth/register" className="text-primary hover:underline">
                Cadastre-se
              </Link>
            </p>
          </div>

          <div className="mt-6 p-4 bg-muted rounded-md">
            <p className="text-sm font-medium mb-2">Contas de teste:</p>
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