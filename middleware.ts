import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import * as jose from 'jose'

const secret = new TextEncoder().encode(
  'secret',
)
 
export async function middleware(request: any,response:any) {
  const authHeader = request?.headers?.get("authHeader")
  if (!authHeader) {
    return NextResponse.redirect("http://localhost:3000/login");
  }
  if (authHeader) {
    const token = authHeader.split(' ')[1]
   
    const { payload } = await jose.jwtVerify(token, secret)
    if (/^\/api\/users\/\w+$/.test(request.nextUrl.pathname)) {
        console.log("first")
     }
    if (payload.isAdmin) {
      return NextResponse.next()
    } else {
      return new Response("You are not authorized!",{status:403})
      
    }
  } else {
    return new Response("You are not authenticated!",{status:400})
  }
}
 
export const config = {
  
  matcher: ['/api/auth','/api/users','/api/users/:id*'],
}



