export class ServiceError extends Error {
  public readonly status: number;
  public readonly code: string;

  constructor(message: string, status: number = 500, code?: string) {
    super(message);
    this.name = 'ServiceError';
    this.status = status;
    this.code = code || 'SERVICE_ERROR';

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ServiceError);
    }
  }

  static isServiceError(error: any): boolean {
    return error instanceof ServiceError;
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      status: this.status,
      code: this.code,
    };
  }
}