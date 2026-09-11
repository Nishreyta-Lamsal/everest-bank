export const isDev = process.env.NODE_ENV === 'development';
export const isProd = process.env.NODE_ENV === 'production';

export const PUBLIC_ENV = {
  API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || '',
} as const;

export const PRIVATE_ENV = {
  API_PROXY_TARGET: process.env.API_PROXY_TARGET || '',
} as const;
