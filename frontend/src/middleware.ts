
import axios from '@/config/axios'

import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { isAxiosError } from 'axios'

export async function middleware(request: NextRequest) {    
    try {
        const currentURL = request.nextUrl.pathname
        console.log(currentURL)
        const tokenCookie = request.cookies.get('token')?.value

        if((currentURL.startsWith('/login') || currentURL.startsWith('/register') ) && !tokenCookie) {
            return NextResponse.next()
        }

        const urlReqSession = '/auth/session'
        const { data } = await axios<{success: boolean, message?: string, data?: {}}>(urlReqSession, {
            headers: {
                Cookie: `token=${tokenCookie}` // write cookies manually in the request 
                                                // because apparentlly middleware doesn't send cookies
            }
        })

        if(!data.success) {
            return NextResponse.redirect(new URL('/login', request.url))
        } 
        
        // user can't navigate to /login or /register if have a active session
        if(data.success && (currentURL === '/login' || currentURL === '/register')) {
            return NextResponse.redirect(new URL('/', request.url))
        }

        //define userinfo in cookies
        const res = NextResponse.next()
        
        res.cookies.set('session', JSON.stringify(data.data))        
        return res
    } catch (error) {
        if(isAxiosError(error) && error.message)
        console.log('[ERROR_MIDDLEWARE]', error)
        return NextResponse.redirect(new URL('/login', request.url))
    }

}

export const config = {
    matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)'
}