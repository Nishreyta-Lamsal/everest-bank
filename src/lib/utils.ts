import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Converts a kebab-case CMS icon slug (e.g. `card-stack`) to the camelCase
 * key used by the `icon` map in `@/components/icons`. Kept as a plain string
 * transform (not a component lookup) so callers can assign the resolved
 * component with a direct property access — React Compiler's
 * `static-components` rule flags component references returned from a
 * function call as "created during render". */
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
