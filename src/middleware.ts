import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'
type Role = 'OWNER' | 'MANAGER' | 'BARBER' | 'CLIENT'

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token
    const path = req.nextUrl.pathname

    // Portal routes - only for clients
    if (path.startsWith('/portal')) {
      if (token?.role !== 'CLIENT') {
        return NextResponse.redirect(new URL('/auth/login', req.url))
      }
    }

    // Admin routes - for owners and managers
    if (path.startsWith('/app')) {
      if (!['OWNER', 'MANAGER'].includes(token?.role as string)) {
        return NextResponse.redirect(new URL('/auth/login', req.url))
      }
    }

    // Barber routes
    if (path.startsWith('/barber')) {
      if (token?.role !== 'BARBER') {
        return NextResponse.redirect(new URL('/auth/login', req.url))
      }
    }

    // API routes protection
    if (path.startsWith('/api')) {
      // Add organization context to headers
      const requestHeaders = new Headers(req.headers)
      if (token?.organizationId) {
        requestHeaders.set('x-organization-id', token.organizationId as string)
      }
      if (token?.unitId) {
        requestHeaders.set('x-unit-id', token.unitId as string)
      }
      if (token?.role) {
        requestHeaders.set('x-user-role', token.role as string)
      }
      if (token?.id) {
        requestHeaders.set('x-user-id', token.id as string)
      }

      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      })
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
)

export const config = {
  matcher: [
    '/portal/:path*',
    '/app/:path*',
    '/barber/:path*',
    '/api/:path*',
  ],
}