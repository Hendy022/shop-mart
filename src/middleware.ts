
// src/middleware
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";


const protectedPages = new Set(["/cart", '/profile' , '/allorders'])
const authPages = new Set(["/auth/login", "/auth/register"])

export default async function middleware(req: NextRequest) {

    const token = await getToken({ req });

    if (protectedPages.has(req.nextUrl.pathname)) {
        if (token) {
            return NextResponse.next()
        }
        const redirectUrl = new URL('/auth/login', req.nextUrl.origin);
        return NextResponse.redirect(redirectUrl);
    }


    if (authPages.has(req.nextUrl.pathname)) {
        if (token) {

            const redirectUrl = new URL('/', req.nextUrl.origin);
            return NextResponse.redirect(redirectUrl);
        }
        return NextResponse.next()
    }
    
    return NextResponse.next()

}

export const config = {
    matcher: ['/cart', '/profile', '/allorders', '/auth/login', '/auth/register']
}