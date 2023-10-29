import ResponseHandler from '@/data/ResponseHandler';
import { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
// Add more public paths here 
const publicPaths = [
    '/',
    '/login',
    '/signup'
]

// Add Authenticated Paths here 
const authenticatedPaths = [
    '/dashboard'
]

// This function can be marked `async` if using `await` inside
export async function middleware(req: NextRequest) {
    try {
        const path: string = req.nextUrl.pathname

        const isPublicPath: boolean = publicPaths.includes(path);
        const isAuthenticatedPath: boolean = authenticatedPaths.includes(path);

        const access_token: string = req.cookies.get('access_token')?.value || '';
        const refresh_token: string = req.cookies.get('refresh_token')?.value || '';
        const hasToken = access_token || refresh_token;

        // is Authenticated path and have a token
        if (isAuthenticatedPath && hasToken) {
            return;
        }

        // Is Authenticated Path and doesn't have a token 
        if (isAuthenticatedPath && !hasToken) {
            return NextResponse.redirect(new URL('/login', req.nextUrl))
        }

        // is public path and have a token
        if(isPublicPath && hasToken) {
            return NextResponse.redirect(new URL('/dashboard', req.nextUrl))
        }
    } catch (e: any) {
        const error = new ResponseHandler();
        error.internalServerError(e);
        const returnJson = error.getError(e);
        return NextResponse.json(returnJson);
    }
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        '/',
        '/login',
        '/signup',
        '/dashboard'
    ],
}