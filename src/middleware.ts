// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Define routes you want to protect
const protectedRoutes = ['/profile', '/dashboard', '/orders']

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value
  console.log(token,'token')
  const { pathname } = request.nextUrl

  const isProtected = protectedRoutes.some(route => pathname.startsWith(route))

  if (isProtected && !token) {
    const loginUrl = new URL('/auth/login', request.url)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

// // Limit middleware scope to protected routes
// export const config = {
//   matcher: ['/profile/:path*', '/dashboard/:path*', '/orders/:path*'],
// }
