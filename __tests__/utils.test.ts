import { formatCurrency, formatPhone, generateTimeSlots, isTimeSlotAvailable } from '@/lib/utils'

describe('Utils', () => {
  describe('formatCurrency', () => {
    it('should format currency correctly', () => {
      expect(formatCurrency(3500)).toBe('R$ 35,00')
      expect(formatCurrency(12000)).toBe('R$ 120,00')
      expect(formatCurrency(50)).toBe('R$ 0,50')
    })
  })

  describe('formatPhone', () => {
    it('should format phone numbers correctly', () => {
      expect(formatPhone('11999887766')).toBe('(11) 99988-7766')
      expect(formatPhone('1133334444')).toBe('(11) 3333-4444')
      expect(formatPhone('invalid')).toBe('invalid')
    })
  })

  describe('generateTimeSlots', () => {
    it('should generate time slots correctly', () => {
      const slots = generateTimeSlots('09:00', '11:00', 30)
      expect(slots).toEqual(['09:00', '09:30', '10:00', '10:30'])
    })

    it('should handle different intervals', () => {
      const slots = generateTimeSlots('14:00', '15:00', 15)
      expect(slots).toEqual(['14:00', '14:15', '14:30', '14:45'])
    })
  })

  describe('isTimeSlotAvailable', () => {
    const appointments = [
      {
        startAt: new Date('2024-01-15T10:00:00'),
        endAt: new Date('2024-01-15T10:30:00'),
      },
      {
        startAt: new Date('2024-01-15T14:00:00'),
        endAt: new Date('2024-01-15T14:45:00'),
      },
    ]

    it('should return true for available slots', () => {
      expect(isTimeSlotAvailable('09:00', appointments, 30)).toBe(true)
      expect(isTimeSlotAvailable('11:00', appointments, 30)).toBe(true)
      expect(isTimeSlotAvailable('15:00', appointments, 30)).toBe(true)
    })

    it('should return false for conflicting slots', () => {
      expect(isTimeSlotAvailable('10:00', appointments, 30)).toBe(false)
      expect(isTimeSlotAvailable('09:45', appointments, 30)).toBe(false)
      expect(isTimeSlotAvailable('14:30', appointments, 30)).toBe(false)
    })
  })
})