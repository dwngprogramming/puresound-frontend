import createMiddleware from 'next-intl/middleware';
import {routing} from '@/libs/i18n/routing';
import {NextRequest, NextResponse} from "next/server";

const IS_STAGING = process.env.NEXT_PUBLIC_APP_ENV === 'staging';

// 1. Tạo instance của Intl Middleware nhưng KHÔNG export default ngay
const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  console.log('Middleware - Incoming request for:', pathname, 'App Env:', process.env.NEXT_PUBLIC_APP_ENV);
  // --- PHẦN 1: XỬ LÝ RIÊNG CHO ROUTE /staging ---
  // Nếu đường dẫn bắt đầu bằng /staging -> Chúng ta tự xử lý logic bảo vệ
  if (pathname.startsWith('/staging')) {
    
    // A. Nếu KHÔNG phải môi trường Staging (ví dụ: Development, Production)
    // -> Chặn truy cập route này luôn
    if (!IS_STAGING) {
      request.nextUrl.pathname = "/404";
      return NextResponse.rewrite(request.nextUrl);
    }
    
    // B. Logic bỏ qua các file tĩnh/api (thường staging prefix ít khi dính cái này, nhưng cứ giữ cho chắc)
    if (
      pathname.startsWith('/_next') ||
      pathname.startsWith('/api') ||
      pathname === '/staging/verify' // Cho phép vào trang verify
    ) {
      return NextResponse.next();
    }
    
    // C. Kiểm tra Token
    const hasToken = request.cookies.has('stg_token');
    
    if (!hasToken) {
      // Chưa đăng nhập -> Đá về login
      return NextResponse.redirect(new URL('/staging/verify', request.url));
    }
    
    // D. Bảo vệ trang Admin
    if (pathname.startsWith('/staging/admin')) { // Lưu ý check đúng path admin của bạn
      const role = request.cookies.get('stg_role')?.value;
      if (role !== 'admin') {
        return NextResponse.redirect(new URL('/staging/forbidden', request.url));
      }
    }
    
    // Nếu mọi thứ OK -> Cho phép truy cập route /staging
    return NextResponse.next();
  }
  
  // --- PHẦN 2: CÁC ROUTE CÒN LẠI (App chính) ---
  // Nếu không phải /staging, giao lại cho next-intl xử lý đa ngôn ngữ
  return intlMiddleware(request);
}

export const config = {
  matcher: ['/((?!api|trpc|_next|_vercel|.*\\..*).*)']
};