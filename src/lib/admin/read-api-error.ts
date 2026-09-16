import { isAxiosError } from 'axios';


export function readApiError(error: unknown, fallback: string) {
  if (!isAxiosError(error)) return fallback;

  const data = error.response?.data as
    | { message?: string; errors?: Record<string, string[] | string> }
    | undefined;

  const fieldError = Object.entries(data?.errors ?? {})
    .map(([field, messages]) => {
      const text = Array.isArray(messages) ? messages.join(' ') : messages;

      return `${field}: ${text}`;
    })
    .join(' · ');

  return fieldError || data?.message || fallback;
}
