import type {
  MenuSummary,
  MenuTreeData,
  MenuTreeItem,
} from '@/api/services/menu.service';
import type { MainNavItem, MegaMenuColumn, MegaMenuLink } from '@/types';

/** The list endpoint doesn't return an icon for top-level tabs; the tree's
 * own item icons are a different concern (per-column, not per-tab), so tabs
 * fall back to a small fixed lookup by slug. */
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

function toMegaMenuLink(item: MenuTreeItem): MegaMenuLink {
  return { label: item.label, href: normalizeHref(item.custom_url) };
}

function toMegaMenuColumn(item: MenuTreeItem): MegaMenuColumn {
  return {
    label: item.label,
    icon: item.icon,
    links: item.children.map(toMegaMenuLink),
    explore: item.explore
      ? { label: item.explore.label, href: normalizeHref(item.explore.href) }
      : undefined,
  };
}

export function toMainNavItem(
  menu: MenuSummary,
  tree: MenuTreeData,
): MainNavItem {
  return {
    label: menu.label,
    href: normalizeHref(menu.custom_url),
    icon: TAB_ICON_BY_SLUG[menu.slug] ?? 'bank',
    megaMenu: {
      columns: tree.items.map(toMegaMenuColumn),
      cta: {
        label: tree.promo.label || `Explore ${tree.menu_label}`,
        href: normalizeHref(tree.promo.href),
      },
    },
  };
}
