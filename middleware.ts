//import { NextResponse } from 'next/server'
//import type { NextRequest } from 'next/server'

//export function middleware(request: NextRequest) {
  // 這裡先模擬「未登入」狀態。未來串接 Supabase 時，這裡可改為檢查 session token。
  //const isAuthenticated = false; 

  // 如果未登入，且正在訪問首頁或內部頁面，強制導向 /login
  //if (!isAuthenticated && request.nextUrl.pathname === '/') {
    //return NextResponse.redirect(new URL('/login', request.url))
 // }

  //return NextResponse.next()
//}

// 設定 Middleware 要攔截的路由，排除 API、靜態檔案與登入頁本身
//export const config = {
 // matcher: ['/((?!api|_next/static|_next/image|favicon.ico|login|icon.svg|manifest.webmanifest).*)'],
//}
