import createMiddleware from 'next-intl/middleware';
import {routing} from '@/libs/i18n/routing';
import {NextRequest, NextResponse} from "next/server";

const IS_STAGING = process.env.NEXT_PUBLIC_APP_ENV === 'staging';

// 1. Tạo instance của Intl Middleware nhưng KHÔNG export default ngay
const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const {pathname} = request.nextUrl;
  
  if (IS_STAGING) {
    const isPublicPath =
      pathname === '/staging/verify' ||
      pathname.startsWith('/api') ||
      pathname.startsWith('/_next') ||
      pathname.includes('.'); // File tĩnh (favicon.ico, image.png...)
    
    // 2. Nếu KHÔNG phải public path thì bắt buộc check token
    if (!isPublicPath) {
      const hasToken = request.cookies.has('stg_token');
      
      if (!hasToken) {
        // Nếu chưa có token -> Đưa về trang verify
        const url = request.nextUrl.clone();
        url.pathname = '/staging/verify';
        return NextResponse.redirect(url);
      }
    }
  }
  
  if (pathname.startsWith('/staging')) {
    // Chuyển hướng /staging hoặc /staging/ về /staging/verify
    if (pathname === '/staging' || pathname === '/staging/') {
      return NextResponse.redirect(new URL('/staging/verify', request.url));
    }
    
    // Nếu là admin route, kiểm tra role
    if (pathname.startsWith('/staging/admin')) { // Lưu ý check đúng path admin của bạn
      const role = request.cookies.get('stg_role')?.value;
      if (role !== 'admin') {
        return NextResponse.redirect(new URL('/staging/forbidden', request.url));
      }
    }
    
    // Nếu là /staging/verify thì cho qua (để render trang login)
    if (pathname === '/staging/verify') {
      const hasToken = request.cookies.has('stg_token');
      if (hasToken) {
        // Nếu đã có token rồi thì chuyển về trang chính
        return NextResponse.redirect(new URL('/', request.url));
      } else {
        return NextResponse.next();
      }
    }
  }
  
  // Giao lại cho next-intl xử lý đa ngôn ngữ
  // Chỉ chạy xuống đây khi đã qua được lớp bảo vệ Staging ở trên
  return intlMiddleware(request);
}

export const config = {
  matcher: ['/((?!api|trpc|_next|_vercel|.*\\..*).*)']
};