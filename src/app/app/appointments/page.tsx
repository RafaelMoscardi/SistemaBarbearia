'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Calendar, Clock, User, Phone, ChevronLeft, Plus, Filter, Search, Check, X, MapPin, DollarSign } from 'lucide-react'
import Link from 'next/link'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'

type AppointmentStatus = 'PENDING' | 'CONFIRMED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED'

interface Appointment {
  id: string
  date: Date
  time: string
  clientName: string
  clientPhone: string
  barberName: string
  unitName: string
  service: string
  duration: number
  price: number
  status: AppointmentStatus
  notes?: string
}

export default function AppointmentsPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<AppointmentStatus | 'ALL'>('ALL')
  const [barberFilter, setBarberFilter] = useState<string>('ALL')
  const [unitFilter, setUnitFilter] = useState<string>('ALL')
  const [isNewAppointmentOpen, setIsNewAppointmentOpen] = useState(false)

  // Mock data for demonstration
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: '1',
      date: new Date(),
      time: '09:00',
      clientName: 'João Silva',
      clientPhone: '(11) 99999-1234',
      barberName: 'Carlos Silva',
      unitName: 'Unidade Centro',
      service: 'Corte + Barba',
      duration: 60,
      price: 65,
      status: 'CONFIRMED',
      notes: 'Cliente preferencial'
    },
    {
      id: '2',
      date: new Date(),
      time: '10:00',
      clientName: 'Pedro Santos',
      clientPhone: '(11) 99999-5678',
      barberName: 'Carlos Silva',
      unitName: 'Unidade Centro',
      service: 'Corte Degradê',
      duration: 45,
      price: 45,
      status: 'PENDING'
    },
    {
      id: '3',
      date: new Date(),
      time: '10:30',
      clientName: 'Roberto Lima',
      clientPhone: '(11) 99999-9012',
      barberName: 'Marcos Costa',
      unitName: 'Unidade Shopping',
      service: 'Barba',
      duration: 30,
      price: 30,
      status: 'CONFIRMED'
    },
    {
      id: '4',
      date: new Date(),
      time: '14:00',
      clientName: 'Carlos Oliveira',
      clientPhone: '(11) 99999-3456',
      barberName: 'André Santos',
      unitName: 'Unidade Centro',
      service: 'Corte Social',
      duration: 40,
      price: 40,
      status: 'PENDING'
    },
    {
      id: '5',
      date: new Date(),
      time: '15:00',
      clientName: 'André Costa',
      clientPhone: '(11) 99999-7890',
      barberName: 'Marcos Costa',
      unitName: 'Unidade Shopping',
      service: 'Corte + Barba + Sobrancelha',
      duration: 75,
      price: 85,
      status: 'IN_PROGRESS'
    },
    {
      id: '6',
      date: new Date(),
      time: '16:00',
      clientName: 'Felipe Ribeiro',
      clientPhone: '(11) 99999-2468',
      barberName: 'Carlos Silva',
      unitName: 'Unidade Centro',
      service: 'Corte Máquina',
      duration: 30,
      price: 35,
      status: 'COMPLETED'
    }
  ])

  const barbers = ['Carlos Silva', 'Marcos Costa', 'André Santos']
  const units = ['Unidade Centro', 'Unidade Shopping']

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

  const handleStatusChange = (appointmentId: string, newStatus: AppointmentStatus) => {
    setAppointments(prev =>
      prev.map(apt =>
        apt.id === appointmentId ? { ...apt, status: newStatus } : apt
      )
    )
  }

  const getStatusColor = (status: AppointmentStatus) => {
    switch (status) {
      case 'PENDING': return 'bg-yellow-500'
      case 'CONFIRMED': return 'bg-green-500'
      case 'IN_PROGRESS': return 'bg-blue-500'
      case 'COMPLETED': return 'bg-gray-500'
      case 'CANCELLED': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  const getStatusText = (status: AppointmentStatus) => {
    switch (status) {
      case 'PENDING': return 'Pendente'
      case 'CONFIRMED': return 'Confirmado'
      case 'IN_PROGRESS': return 'Em Andamento'
      case 'COMPLETED': return 'Concluído'
      case 'CANCELLED': return 'Cancelado'
      default: return status
    }
  }

  const filteredAppointments = appointments.filter(apt => {
    const matchesSearch = apt.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         apt.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         apt.barberName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'ALL' || apt.status === statusFilter
    const matchesBarber = barberFilter === 'ALL' || apt.barberName === barberFilter
    const matchesUnit = unitFilter === 'ALL' || apt.unitName === unitFilter
    return matchesSearch && matchesStatus && matchesBarber && matchesUnit
  })

  const todayAppointments = filteredAppointments.filter(apt =>
    format(apt.date, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd')
  )

  const stats = {
    total: todayAppointments.length,
    confirmed: todayAppointments.filter(a => a.status === 'CONFIRMED').length,
    pending: todayAppointments.filter(a => a.status === 'PENDING').length,
    inProgress: todayAppointments.filter(a => a.status === 'IN_PROGRESS').length,
    completed: todayAppointments.filter(a => a.status === 'COMPLETED').length,
    revenue: todayAppointments
      .filter(a => a.status === 'COMPLETED')
      .reduce((sum, a) => sum + a.price, 0),
    estimated: todayAppointments
      .filter(a => a.status !== 'CANCELLED')
      .reduce((sum, a) => sum + a.price, 0)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/app">
                <Button variant="ghost" size="icon">
                  <ChevronLeft className="h-5 w-5" />
                </Button>
              </Link>
              <h1 className="text-2xl font-bold">Gestão de Agendamentos</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">
                {format(selectedDate, "EEEE, d 'de' MMMM", { locale: ptBR })}
              </span>
              <Dialog open={isNewAppointmentOpen} onOpenChange={setIsNewAppointmentOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Novo Agendamento
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[525px]">
                  <DialogHeader>
                    <DialogTitle>Novo Agendamento</DialogTitle>
                    <DialogDescription>
                      Crie um novo agendamento para qualquer barbeiro
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="unit" className="text-right">
                        Unidade
                      </Label>
                      <Select>
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Selecione a unidade" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="centro">Unidade Centro</SelectItem>
                          <SelectItem value="shopping">Unidade Shopping</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="barber" className="text-right">
                        Barbeiro
                      </Label>
                      <Select>
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Selecione o barbeiro" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="carlos">Carlos Silva</SelectItem>
                          <SelectItem value="marcos">Marcos Costa</SelectItem>
                          <SelectItem value="andre">André Santos</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="client" className="text-right">
                        Cliente
                      </Label>
                      <Input id="client" className="col-span-3" placeholder="Nome do cliente" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="phone" className="text-right">
                        Telefone
                      </Label>
                      <Input id="phone" className="col-span-3" placeholder="(11) 99999-9999" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="service" className="text-right">
                        Serviço
                      </Label>
                      <Select>
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Selecione o serviço" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="corte">Corte - R$ 40</SelectItem>
                          <SelectItem value="barba">Barba - R$ 30</SelectItem>
                          <SelectItem value="corte-barba">Corte + Barba - R$ 65</SelectItem>
                          <SelectItem value="sobrancelha">Sobrancelha - R$ 20</SelectItem>
                          <SelectItem value="completo">Serviço Completo - R$ 85</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="date" className="text-right">
                        Data
                      </Label>
                      <Input id="date" type="date" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="time" className="text-right">
                        Horário
                      </Label>
                      <Input id="time" type="time" className="col-span-3" />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsNewAppointmentOpen(false)}>
                      Cancelar
                    </Button>
                    <Button onClick={() => setIsNewAppointmentOpen(false)}>Criar Agendamento</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-6 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Pendentes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Confirmados
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.confirmed}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Em Andamento
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{stats.inProgress}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Concluídos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-600">{stats.completed}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Faturamento
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">R$ {stats.revenue}</div>
              <div className="text-xs text-muted-foreground">Est: R$ {stats.estimated}</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar cliente, barbeiro ou serviço..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <Select value={unitFilter} onValueChange={setUnitFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Unidade" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">Todas as unidades</SelectItem>
              {units.map(unit => (
                <SelectItem key={unit} value={unit}>{unit}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={barberFilter} onValueChange={setBarberFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Barbeiro" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">Todos os barbeiros</SelectItem>
              {barbers.map(barber => (
                <SelectItem key={barber} value={barber}>{barber}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={(value: any) => setStatusFilter(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">Todos</SelectItem>
              <SelectItem value="PENDING">Pendentes</SelectItem>
              <SelectItem value="CONFIRMED">Confirmados</SelectItem>
              <SelectItem value="IN_PROGRESS">Em Andamento</SelectItem>
              <SelectItem value="COMPLETED">Concluídos</SelectItem>
              <SelectItem value="CANCELLED">Cancelados</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Appointments List */}
        <Card>
          <CardHeader>
            <CardTitle>Agendamentos do Dia</CardTitle>
            <CardDescription>
              Visão geral de todos os agendamentos por unidade e barbeiro
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {todayAppointments.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Calendar className="mx-auto h-12 w-12 mb-4 opacity-50" />
                  <p>Nenhum agendamento encontrado</p>
                  <p className="text-sm">Ajuste os filtros ou crie um novo agendamento</p>
                </div>
              ) : (
                todayAppointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="flex flex-col items-center">
                        <Clock className="h-4 w-4 text-muted-foreground mb-1" />
                        <span className="text-sm font-semibold">{appointment.time}</span>
                        <span className="text-xs text-muted-foreground">{appointment.duration}min</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold">{appointment.clientName}</h3>
                          <Badge className={getStatusColor(appointment.status)}>
                            {getStatusText(appointment.status)}
                          </Badge>
                        </div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">
                          {appointment.service}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            {appointment.clientPhone}
                          </span>
                          <span className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            {appointment.barberName}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {appointment.unitName}
                          </span>
                          <span className="flex items-center gap-1 font-medium">
                            <DollarSign className="h-3 w-3" />
                            R$ {appointment.price.toFixed(2)}
                          </span>
                        </div>
                        {appointment.notes && (
                          <p className="text-xs text-muted-foreground mt-2">
                            Obs: {appointment.notes}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {appointment.status === 'PENDING' && (
                        <>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-green-600"
                            onClick={() => handleStatusChange(appointment.id, 'CONFIRMED')}
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-red-600"
                            onClick={() => handleStatusChange(appointment.id, 'CANCELLED')}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                      {appointment.status === 'CONFIRMED' && (
                        <Button
                          size="sm"
                          onClick={() => handleStatusChange(appointment.id, 'IN_PROGRESS')}
                        >
                          Iniciar
                        </Button>
                      )}
                      {appointment.status === 'IN_PROGRESS' && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleStatusChange(appointment.id, 'COMPLETED')}
                        >
                          Finalizar
                        </Button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Overview by Barber */}
        <div className="grid lg:grid-cols-2 gap-6 mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Ocupação por Barbeiro</CardTitle>
              <CardDescription>
                Taxa de ocupação de cada barbeiro hoje
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {barbers.map(barber => {
                  const barberAppointments = todayAppointments.filter(apt => apt.barberName === barber)
                  const totalTime = barberAppointments.reduce((sum, apt) => sum + apt.duration, 0)
                  const occupancyRate = Math.round((totalTime / 480) * 100) // 8 hours = 480 minutes

                  return (
                    <div key={barber} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{barber}</p>
                        <p className="text-sm text-muted-foreground">
                          {barberAppointments.length} agendamentos
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold">{occupancyRate}%</p>
                        <p className="text-xs text-muted-foreground">{totalTime}min</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Próximos Horários</CardTitle>
              <CardDescription>
                Próximos agendamentos confirmados
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {todayAppointments
                  .filter(apt => apt.status === 'CONFIRMED' || apt.status === 'IN_PROGRESS')
                  .slice(0, 5)
                  .map(appointment => (
                    <div key={appointment.id} className="flex items-center gap-3 text-sm">
                      <span className="font-mono text-muted-foreground">{appointment.time}</span>
                      <span className="font-medium">{appointment.clientName}</span>
                      <span className="text-muted-foreground">com {appointment.barberName}</span>
                      <Badge className={getStatusColor(appointment.status)} />
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}