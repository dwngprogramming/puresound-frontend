import Hls, {HlsConfig, LoaderCallbacks, LoaderConfiguration, LoaderContext} from "hls.js";

export interface CustomHlsConfig extends HlsConfig {
  handleNewTokenWhenExpired?: () => Promise<string | null>
}

export class HlsTokenRefreshLoader extends Hls.DefaultConfig.loader {
  private readonly customConfig: CustomHlsConfig;

  constructor(config: CustomHlsConfig) {
    super(config);
    this.customConfig = config;
  }

  load(context: LoaderContext, config: LoaderConfiguration, callbacks: LoaderCallbacks<LoaderContext>) {
    const originalContext = {...context};
    const originalOnError = callbacks.onError;

    callbacks.onError = async (error: any, context: any, networkDetails: any, stats: any) => {
      const statusCode = networkDetails?.status || networkDetails?.code;

      if (statusCode === 401) {
        try {
          // Gọi hàm từ config đã lưu
          if (this.customConfig.handleNewTokenWhenExpired) {
            const newTokenParam = await this.customConfig.handleNewTokenWhenExpired();
            if (newTokenParam) {
              // Cập nhật URL với token mới
              const urlObj = new URL(originalContext.url);
              urlObj.searchParams.set('token', newTokenParam);
              const newUrl = urlObj.toString();

              // Tạo context mới với URL đã cập nhật
              const newContext = {
                ...originalContext,
                url: newUrl
              };

              // Thay vì gọi super.load (dùng lại this), ta tạo một Loader mới hoàn toàn
              const retryLoader = new HlsTokenRefreshLoader(this.customConfig);
              // Truyền lại callbacks gốc
              retryLoader.load(newContext, config, callbacks);
              return;
            }
          }
        } catch (e) {
          console.error(`[HlsTokenRefreshLoader] Error refreshing token`);
        }
      }
      originalOnError(error, context, networkDetails, stats);
    }
    super.load(context, config, callbacks);
  }
}
