import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(cents: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(cents / 100)
}

export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat('pt-BR').format(new Date(date))
}

export function formatDateTime(date: Date | string): string {
  return new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(new Date(date))
}

export function formatTime(date: Date | string): string {
  return new Intl.DateTimeFormat('pt-BR', {
    timeStyle: 'short',
  }).format(new Date(date))
}

export function formatPhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, '')
  if (cleaned.length === 11) {
    return cleaned.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
  }
  if (cleaned.length === 10) {
    return cleaned.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3')
  }
  return phone
}

export function generateTimeSlots(
  startTime: string, // "09:00"
  endTime: string,   // "18:00"
  intervalMinutes: number = 30
): string[] {
  const slots: string[] = []
  const [startHour, startMin] = startTime.split(':').map(Number)
  const [endHour, endMin] = endTime.split(':').map(Number)

  const startDate = new Date()
  startDate.setHours(startHour, startMin, 0, 0)

  const endDate = new Date()
  endDate.setHours(endHour, endMin, 0, 0)

  const current = new Date(startDate)

  while (current < endDate) {
    slots.push(current.toTimeString().slice(0, 5))
    current.setMinutes(current.getMinutes() + intervalMinutes)
  }

  return slots
}

export function calculateEndTime(startTime: string, durationMinutes: number): string {
  const [hour, minute] = startTime.split(':').map(Number)
  const date = new Date()
  date.setHours(hour, minute, 0, 0)
  date.setMinutes(date.getMinutes() + durationMinutes)
  return date.toTimeString().slice(0, 5)
}

export function isTimeSlotAvailable(
  slot: string,
  appointments: Array<{ startAt: Date; endAt: Date }>,
  duration: number
): boolean {
  const slotStart = new Date()
  const [hour, minute] = slot.split(':').map(Number)
  slotStart.setHours(hour, minute, 0, 0)

  const slotEnd = new Date(slotStart)
  slotEnd.setMinutes(slotEnd.getMinutes() + duration)

  return !appointments.some(apt => {
    const aptStart = new Date(apt.startAt)
    const aptEnd = new Date(apt.endAt)

    return (
      (slotStart >= aptStart && slotStart < aptEnd) ||
      (slotEnd > aptStart && slotEnd <= aptEnd) ||
      (slotStart <= aptStart && slotEnd >= aptEnd)
    )
  })
}