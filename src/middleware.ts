import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(req) {
    // Allow access if user is authenticated
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: '/admin/login',
    },
  }
)

// Protect all /admin routes except /admin/login
export const config = {
  matcher: ['/admin/:path*', '!/admin/login'],
}
