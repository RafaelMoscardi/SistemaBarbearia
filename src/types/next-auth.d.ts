import NextAuth from 'next-auth'

type Role = 'OWNER' | 'MANAGER' | 'BARBER' | 'CLIENT'

declare module 'next-auth' {
  interface User {
    id: string
    role: Role
    organizationId: string
    unitId: string | null
    image: string | null
  }

  interface Session {
    user: {
      id: string
      email: string
      name: string
      role: Role
      organizationId: string
      unitId: string | null
      image: string | null
    }
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string
    role: Role
    organizationId: string
    unitId: string | null
    image: string | null
  }
}