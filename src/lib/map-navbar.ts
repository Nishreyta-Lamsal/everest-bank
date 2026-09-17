import type { HierarchyNode } from '@/api/services/hierarchy.service';
import type { MainNavItem, MegaMenuColumn, MegaMenuLink } from '@/types';

/** The hierarchy endpoint doesn't return an icon for top-level tabs; the
 * tree's own node icons are a different concern (per-column, not per-tab),
 * so tabs fall back to a small fixed lookup by slug. */
const TAB_ICON_BY_SLUG: Record<string, string> = {
  personal: 'people',
  business: 'briefcase',
  remittance: 'banknote',
  about: 'bank',
};

/**
 * The backend models "personal" as its own section under `/personal/*`, but
 * in this app the personal pages live at the site root (`ROUTE.PERSONAL` is
 * `/`, and `/cards`, `/loans`, etc. have no `/personal` prefix) — business,
 * remittance and about's prefixes do match the backend. Strip it here so
 * every href produced from the personal tree resolves to a real route.
 */
function normalizeHref(href: string): string {
  if (!href) return '#';
  if (href === '/personal') return '/';
  if (href.startsWith('/personal/')) return href.slice('/personal'.length);

  return href;
}

function visibleChildren(items: HierarchyNode[]): HierarchyNode[] {
  return items.filter((item) => item.show_in_menu);
}

function toMegaMenuLink(item: HierarchyNode): MegaMenuLink {
  return { label: item.title, href: normalizeHref(item.path) };
}

function toMegaMenuColumn(item: HierarchyNode): MegaMenuColumn {
  return {
    label: item.title,
    icon: item.icon,
    links: visibleChildren(item.children).map(toMegaMenuLink),
    explore: item.explore_label
      ? { label: item.explore_label, href: normalizeHref(item.explore_href) }
      : undefined,
  };
}

export function toMainNavItem(page: HierarchyNode): MainNavItem {
  return {
    label: page.title,
    href: normalizeHref(page.path),
    icon: TAB_ICON_BY_SLUG[page.slug] ?? 'bank',
    megaMenu: {
      columns: visibleChildren(page.children).map(toMegaMenuColumn),
      cta: {
        label: page.promo_label || `Explore ${page.title}`,
        href: normalizeHref(page.promo_href),
      },
    },
  };
}

export function toMainNavItems(pages: HierarchyNode[]): MainNavItem[] {
  return visibleChildren(pages).map(toMainNavItem);
}
