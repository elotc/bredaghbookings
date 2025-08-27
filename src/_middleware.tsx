// export { auth as middleware } from "@/lib/auth/authConfig"

// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'
// import { checkIsAuthenticated } from './lib/auth/checkIsAuthenticated';
 
// export function middleware(request: NextRequest) {
//   console.log("Middleware triggered for request:", request.url);
//   const allCookies = request.cookies.getAll()
//   console.log("Middleware: ", allCookies) // => [{ name: 'nextjs', value: 'fast' }]
//   // if( !checkIsAuthenticated)
//   // return NextResponse.redirect(request.url);
// }