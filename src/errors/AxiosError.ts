import axios from 'axios';

export class AxiosError extends Error {
  public readonly status: number;
  public readonly originalError: any;
  public readonly isAxiosError: boolean = true;

  constructor(axiosError: any, customMessage?: string) {
    const message = customMessage || AxiosError.getErrorMessage(axiosError);
    super(message);

    this.name = 'AxiosError';
    this.status = axiosError.response?.status || 500;
    this.originalError = axiosError;

    // 保持正確的堆疊追蹤
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AxiosError);
    }
  }

  static getErrorMessage(axiosError: any): string {
    if (axiosError.response) {
      // 伺服器回應錯誤
      switch (axiosError.response.status) {
        case 400:
          return '請求參數錯誤';
        case 401:
          return '未經授權';
        case 403:
          return '權限不足';
        case 404:
          return '資源不存在';
        case 429:
          return '請求過於頻繁';
        case 500:
          return '上游伺服器內部錯誤';
        case 502:
          return '上游伺服器無回應';
        case 503:
          return '上游服務暫時無法使用';
        case 504:
          return '上游伺服器逾時';
        default:
          return `上游 API 錯誤 (${axiosError.response.status})`;
      }
    } else if (axiosError.request) {
      // 請求發出但沒有收到回應
      return '網路連線錯誤或上游服務無法連接';
    } else {
      // 設定請求時發生錯誤
      return '請求設定錯誤';
    }
  }

  static isAxiosError(error: any): boolean {
    return error && error.isAxiosError === true;
  }

  getHttpStatus(): number {
    // 對於特定的 axios 錯誤，調整 HTTP 狀態碼
    if (
      this.originalError.code === 'ECONNREFUSED' ||
      this.originalError.code === 'ENOTFOUND' ||
      !this.originalError.response
    ) {
      return 502; // Bad Gateway
    }

    if (this.status >= 500) {
      return 502; // 上游 5xx 錯誤轉換為 Bad Gateway
    }

    return this.status;
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      status: this.status,
      httpStatus: this.getHttpStatus(),
      code: this.originalError.code,
      config: {
        url: this.originalError.config?.url,
        method: this.originalError.config?.method,
      },
    };
  }
}
