import axios, { type AxiosError } from 'axios';

import { PUBLIC_ENV } from '@/config/env';

import { ApiErrorType, type ApiResponse } from '@/types/api';

export class ApiError extends Error {
  readonly type: ApiErrorType;
  readonly status?: number;

  constructor(type: ApiErrorType, message: string, status?: number) {
    super(message);
    this.name = 'ApiError';
    this.type = type;
    this.status = status;
  }
}

export const api = axios.create({
  baseURL: PUBLIC_ENV.API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiResponse<unknown>>) => {
    if (axios.isCancel(error)) {
      return Promise.reject(
        new ApiError(ApiErrorType.CANCELLED, 'Request was cancelled.'),
      );
    }

    // No `response` means the request never completed a round trip —
    // timeout, dropped connection, DNS failure, CORS, etc.
    if (!error.response) {
      if (error.code === 'ECONNABORTED') {
        return Promise.reject(
          new ApiError(
            ApiErrorType.TIMEOUT,
            'The request timed out. Please try again.',
          ),
        );
      }

      if (typeof navigator !== 'undefined' && !navigator.onLine) {
        return Promise.reject(
          new ApiError(
            ApiErrorType.OFFLINE,
            'You appear to be offline. Check your internet connection.',
          ),
        );
      }

      return Promise.reject(
        new ApiError(
          ApiErrorType.NETWORK,
          'Unable to reach the server. Please try again later.',
        ),
      );
    }

    const { status, data } = error.response;
    const serverMessage = data?.message;

    switch (status) {
      case 401:
        return Promise.reject(
          new ApiError(
            ApiErrorType.UNAUTHORIZED,
            serverMessage ?? 'Session expired. Please log in again.',
            status,
          ),
        );
      case 403:
        return Promise.reject(
          new ApiError(
            ApiErrorType.FORBIDDEN,
            serverMessage ??
              'You do not have permission to perform this action.',
            status,
          ),
        );
      case 404:
        return Promise.reject(
          new ApiError(
            ApiErrorType.NOT_FOUND,
            serverMessage ?? 'The requested resource was not found.',
            status,
          ),
        );
      case 422:
        return Promise.reject(
          new ApiError(
            ApiErrorType.VALIDATION,
            serverMessage ?? 'Some fields are invalid. Please review them.',
            status,
          ),
        );
      case 429:
        return Promise.reject(
          new ApiError(
            ApiErrorType.RATE_LIMITED,
            serverMessage ??
              'Too many requests. Please slow down and try again shortly.',
            status,
          ),
        );
      default:
        if (status >= 500) {
          return Promise.reject(
            new ApiError(
              ApiErrorType.SERVER,
              serverMessage ??
                'Something went wrong on our end. Please try again later.',
              status,
            ),
          );
        }

        return Promise.reject(
          new ApiError(
            ApiErrorType.UNKNOWN,
            serverMessage ?? 'An unexpected error occurred.',
            status,
          ),
        );
    }
  },
);
