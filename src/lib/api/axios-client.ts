import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

import { getApiBaseUrl } from './base-url';
import { getCsrfToken, refreshCsrfToken } from './csrf';
import { logout, refreshAccessToken } from './token-refresh';

import { ADMIN_ROUTE } from '@/constants/admin';

type RetriableConfig = InternalAxiosRequestConfig & {
  _retry?: boolean;
  _csrfRetry?: boolean;
};

export const axiosClient = axios.create({
  baseURL: getApiBaseUrl(),
  withCredentials: true, // sends httpOnly cookies on every request
});

const SAFE_METHODS = ['get', 'head', 'options', 'trace'];

/** Endpoints that must never trigger a refresh, refreshing them would loop. */
const NO_REFRESH_PATHS = [
  'auth/login/',
  'auth/token/refresh/',
  'auth/token/logout/',
];

function isNoRefreshPath(url?: string) {
  return Boolean(url && NO_REFRESH_PATHS.some((path) => url.includes(path)));
}

function isCsrfError(error: AxiosError) {
  if (error.response?.status !== 403) return false;

  const body = JSON.stringify(error.response.data ?? '').toLowerCase();

  return body.includes('csrf');
}

// --- Request: attach CSRF on mutating requests ---
axiosClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const method = config.method?.toLowerCase();

    if (method && !SAFE_METHODS.includes(method)) {
      const token = await getCsrfToken();

      if (token) {
        config.headers['X-CSRFTOKEN'] = token;
      }
    }

    // Let the browser set the multipart boundary itself.
    if (typeof FormData !== 'undefined' && config.data instanceof FormData) {
      delete config.headers['Content-Type'];
    }

    return config;
  },
);

// --- Response: CSRF retry, then access-token refresh ---
axiosClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as RetriableConfig | undefined;

    if (!originalRequest) return Promise.reject(error);

    // Stale CSRF token -> refetch once and replay.
    if (isCsrfError(error) && !originalRequest._csrfRetry) {
      originalRequest._csrfRetry = true;

      const token = await refreshCsrfToken();
      if (token) {
        originalRequest.headers['X-CSRFTOKEN'] = token;
      }

      return axiosClient(originalRequest);
    }

    // Expired access token -> refresh once and replay.
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !isNoRefreshPath(originalRequest.url)
    ) {
      originalRequest._retry = true;

      try {
        await refreshAccessToken();

        return await axiosClient(originalRequest);
      } catch (refreshError) {
        await logout();

        if (typeof window !== 'undefined') {
          const next = encodeURIComponent(
            window.location.pathname + window.location.search,
          );
          window.location.href = `${ADMIN_ROUTE.LOGIN}?next=${next}`;
        }

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);
