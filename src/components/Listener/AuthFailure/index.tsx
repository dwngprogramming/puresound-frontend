'use client';

import {Home, RefreshCw} from "lucide-react";
import {useRouter} from "next/navigation";

const AuthFailure = () => {
  const navigator = useRouter();

  return (
    <div className="auth-container">
      <div>
        <svg width="120px" height="120px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd"
                d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM15 12C15.5523 12 16 11.3284 16 10.5C16 9.67157 15.5523 9 15 9C14.4477 9 14 9.67157 14 10.5C14 11.3284 14.4477 12 15 12ZM10 10.5C10 11.3284 9.55228 12 9 12C8.44772 12 8 11.3284 8 10.5C8 9.67157 8.44772 9 9 9C9.55228 9 10 9.67157 10 10.5ZM8.39747 17.4466C8.64413 17.7794 9.11385 17.8492 9.44661 17.6025C10.175 17.0627 11.0541 16.75 12 16.75C12.9459 16.75 13.825 17.0627 14.5534 17.6025C14.8862 17.8492 15.3559 17.7794 15.6025 17.4466C15.8492 17.1138 15.7794 16.6441 15.4466 16.3975C14.4742 15.6767 13.285 15.25 12 15.25C10.715 15.25 9.5258 15.6767 8.55339 16.3975C8.22062 16.6441 8.15082 17.1138 8.39747 17.4466Z"
                fill="#FFD54F"/>
        </svg>
      </div>
      {/* Tiêu đề chính */}
      <h1 className="mb-4">
        Oops!
      </h1>

      {/* Mô tả chi tiết */}
      <p className="mb-4 leading-relaxed text-center text-neutral-400">
        Lỗi do bạn từ chối đăng nhập hoặc đến từ máy chủ.
        Vui lòng thử lại hoặc liên hệ với chúng tôi nếu vẫn gặp sự cố.
      </p>

      {/* Các nút hành động */}
      <div className="space-y-3 w-full">
        <button
          onClick={() => navigator.push("/login")}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
        >
          <RefreshCw className="w-4 h-4"/>
          Đăng nhập lại
        </button>

        <button
          onClick={() => navigator.push("/")}
          className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
        >
          <Home className="w-4 h-4"/>
          Về trang chủ
        </button>
      </div>

      {/* Thông tin hỗ trợ */}
      <div className="w-full mt-6 pt-6 border-t border-gray-200">
        <p className="text-sm text-gray-400 text-center">
          Cần hỗ trợ?
          <a href="mailto:support@puresound.space" className="text-blue-600 hover:text-blue-800 ml-1">
            Liên hệ với chúng tôi
          </a>
        </p>
      </div>
    </div>
  );
}

export default AuthFailure;
