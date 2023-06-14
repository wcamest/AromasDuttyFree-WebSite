import { NextResponse } from 'next/server';

export async function middleware(request) {

    if (request.nextUrl.pathname === '/admin-dashboard') {
        return NextResponse.redirect(new URL("/admin-dashboard/products", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin-dashboard/:path*'],
}