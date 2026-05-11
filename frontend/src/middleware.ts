// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const roleRoutes: Record<string, string> = {
  admin: '/admin',
  hr: '/hr',
  student: '/student',
  teacher: '/teacher',
  bursary: '/bursary',
  store_keeper: '/store-keeper',
  result_officer: '/exam-officer',
  academic_officer: '/academic-officer',
  other_staff: '/other-staff',
};

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const role = request.cookies.get('role')?.value; // ✅ Access from cookie
  console.log(`role: ${role}`)
  const protectedRoutes = Object.values(roleRoutes);
  const isProtected = protectedRoutes.some((route) => pathname.startsWith(route));

  if (!isProtected) return NextResponse.next();

  if (!role || !roleRoutes[role]) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  const allowedPrefix = roleRoutes[role];
  if (pathname.startsWith(allowedPrefix)) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL('/login', request.url));
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/hr/:path*',
    '/student/:path*',
    '/teacher/:path*',
    '/bursary/:path*',
    '/store-keeper/:path*',
    '/result-officer/:path*',
    '/academic-officer/:path*',
    '/other-staff/:path*',
  ],
};
