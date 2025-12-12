import {AxiosError, AxiosInstance} from "axios";

export const applyStagingInterceptor = (instance: AxiosInstance) => {
  instance.interceptors.request.use((config) => {
    const env = process.env.NEXT_PUBLIC_APP_ENV;
    if (env !== 'production') {
      if (env === 'staging') {
        let stagingToken: string | null = null;
        
        if (typeof window !== 'undefined') {
          stagingToken = localStorage.getItem('STAGING_TOKEN');
        }
        
        if (stagingToken) {
          config.headers['X-Staging-Token'] = stagingToken;
        }
      }
    }
    return config;
  });
  
  instance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError<any>) => {
      const originalRequest = error.config as any;
      
      // Check lỗi 403 + Message đặc thù từ Nginx Lua
      if (
        error.response?.status === 403 &&
        error.response?.data?.code === "MISSING_STG_TOKEN" &&
        originalRequest &&
        !originalRequest._retry &&
        typeof window !== 'undefined'
      ) {
        originalRequest._retry = true;
        
        // Hiện Prompt hỏi người dùng
        const token = window.prompt("⚠️ Staging Environment Protected\nPlease enter your Access Token:");
        
        if (token) {
          // Lưu lại để dùng cho các request sau
          localStorage.setItem('STAGING_TOKEN', token);
          
          // Gắn token mới vào request đang bị lỗi
          originalRequest.headers['X-Staging-Token'] = token;
          
          // Gọi lại request đó
          return instance(originalRequest);
        }
      }
      throw error; // Equals with `return Promise.reject(error);`
    }
  );
}