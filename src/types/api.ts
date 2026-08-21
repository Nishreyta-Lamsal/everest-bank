export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

export const ApiErrorType = {
  OFFLINE: 'OFFLINE',
  TIMEOUT: 'TIMEOUT',
  NETWORK: 'NETWORK',
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  NOT_FOUND: 'NOT_FOUND',
  VALIDATION: 'VALIDATION',
  RATE_LIMITED: 'RATE_LIMITED',
  SERVER: 'SERVER',
  CANCELLED: 'CANCELLED',
  UNKNOWN: 'UNKNOWN',
} as const;

export type ApiErrorType = (typeof ApiErrorType)[keyof typeof ApiErrorType];
