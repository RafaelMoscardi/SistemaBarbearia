'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Clock, ChevronLeft, Plus, Calendar } from 'lucide-react'
import Link from 'next/link'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'

export default function BarberSchedulePage() {
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

  const schedule = [
    { day: 'Segunda', morning: true, afternoon: true },
    { day: 'Terça', morning: true, afternoon: true },
    { day: 'Quarta', morning: true, afternoon: true },
    { day: 'Quinta', morning: true, afternoon: true },
    { day: 'Sexta', morning: true, afternoon: true },
    { day: 'Sábado', morning: true, afternoon: false },
    { day: 'Domingo', morning: false, afternoon: false },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Link href="/barber">
              <Button variant="ghost" size="icon">
                <ChevronLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">Gerenciar Horários</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Disponibilidade Semanal</CardTitle>
              <CardDescription>
                Configure seus horários de trabalho
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {schedule.map((day, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                    <span className="font-medium">{day.day}</span>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <Switch checked={day.morning} />
                        <Label className="text-sm">Manhã</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch checked={day.afternoon} />
                        <Label className="text-sm">Tarde</Label>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Bloqueios de Horário</CardTitle>
              <CardDescription>
                Gerencie horários bloqueados
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button className="w-full">
                  <Plus className="mr-2 h-4 w-4" />
                  Bloquear Horário
                </Button>
                <div className="space-y-2">
                  <div className="p-3 rounded-lg border bg-red-50">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Almoço</span>
                      <span className="text-sm text-muted-foreground">12:00 - 13:00</span>
                    </div>
                  </div>
                  <div className="p-3 rounded-lg border bg-red-50">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Compromisso Médico</span>
                      <span className="text-sm text-muted-foreground">15:00 - 16:00</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}