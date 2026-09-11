import type { PageSectionRead } from '@/types/admin';

export function localizedContent<T>(
  content: PageSectionRead['content'],
  lang: 'en' | 'ne' = 'en',
): T {
  const localized = content?.[lang];

  if (localized && typeof localized === 'object') {
    return localized as T;
  }

  return (content ?? {}) as T;
}

export function mergeLocalizedContent<T extends object>(
  content: PageSectionRead['content'],
  updates: Partial<T>,
  lang: 'en' | 'ne' = 'en',
): Record<string, unknown> {
  const existing = content ?? {};
  const localized = existing[lang];

  if (localized && typeof localized === 'object') {
    return {
      ...existing,
      [lang]: { ...(localized as object), ...updates },
    };
  }

  return { ...existing, ...updates };
}
