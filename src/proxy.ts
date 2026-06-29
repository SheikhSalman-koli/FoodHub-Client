
import { userServices } from '@/modules/services/user.service'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {

    const pathname = request.nextUrl.pathname

    let isAuthenticated = false
    const user = await userServices.getSessionUser()

    if(user)(
        isAuthenticated = true
    )

    if(isAuthenticated === false){
        return NextResponse.redirect(new URL('/signin', request.url))
    }

    return NextResponse.next()
}
 
export const config = {
  matcher: '/checkout',
}