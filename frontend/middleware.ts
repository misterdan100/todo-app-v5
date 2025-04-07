import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {    
    try {
        const currentURL = request.nextUrl.pathname
        const tokenCookie = request.cookies.get('token')?.value


        if((currentURL.startsWith('/login') || currentURL.startsWith('/register') ) && !tokenCookie) {
            return NextResponse.next()
        }

        const urlReqSession = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/session`
        
        const response = await fetch(urlReqSession, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': `token=${tokenCookie}`
            },
            credentials: 'include',
            body: JSON.stringify({ token: tokenCookie })
        })
        
        const data = await response.json()

        if(!data.success) {
            return NextResponse.redirect(new URL('/login', request.url))
        } 
        
        // user can't navigate to /login or /register if have a active session
        if(data.success && (currentURL === '/login' || currentURL === '/register')) {
            return NextResponse.redirect(new URL('/', request.url))
        }

        //define userinfo in cookies
        const res = NextResponse.next()
        
        res.cookies.set('session', JSON.stringify(data))        
        return res
    } catch (error) {
        console.log('[ERROR_MIDDLEWARE]', error)
        return NextResponse.redirect(new URL('/login', request.url))
    }

}

export const config = {
    matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)'
}