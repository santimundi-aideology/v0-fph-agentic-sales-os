import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // If Supabase env vars are not configured (common in CI / some deployments),
  // do not crash middleware. Just continue without auth gating.
  if (!supabaseUrl || !supabaseAnonKey) {
    return NextResponse.next({ request })
  }

  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) => {
            supabaseResponse.cookies.set(name, value, {
              ...options,
              sameSite: 'lax',
              httpOnly: options?.httpOnly ?? false,
              secure: process.env.NODE_ENV === 'production',
            })
          })
        },
      },
    }
  )

  // Refresh session if expired - required for Server Components
  let user: unknown = null
  try {
    const result = await supabase.auth.getUser()
    user = result.data.user
  } catch {
    // If Supabase is unreachable or misconfigured at runtime, don't 500 the entire app.
    // We'll treat the user as signed-out.
    user = null
  }

  // Protect routes that require authentication
  const protectedPaths = ['/campaigns', '/conversations', '/appointments', '/properties', '/handoffs', '/analytics', '/settings', '/users']
  const isProtectedPath = protectedPaths.some(path => request.nextUrl.pathname.startsWith(path))
  
  // Allow access to auth pages
  const authPaths = ['/auth/signin', '/auth/signup']
  const isAuthPath = authPaths.some(path => request.nextUrl.pathname.startsWith(path))

  if (isProtectedPath && !user && !isAuthPath) {
    // Redirect to sign in if accessing protected route without auth
    const url = request.nextUrl.clone()
    url.pathname = '/auth/signin'
    url.searchParams.set('redirect', request.nextUrl.pathname)
    return NextResponse.redirect(url)
  }

  if (isAuthPath && user) {
    // Redirect to dashboard if already signed in
    const url = request.nextUrl.clone()
    url.pathname = '/'
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}

