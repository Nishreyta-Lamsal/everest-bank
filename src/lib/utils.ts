import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function toIconKey(slug: string): string {
  return slug.replace(/-([a-z])/g, (_, char: string) => char.toUpperCase());
}

export function isNavItemActive(
  pathname: string,
  href: string,
  activePrefixes?: string[],
) {
  return [href, ...(activePrefixes ?? [])].some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}

export function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}
