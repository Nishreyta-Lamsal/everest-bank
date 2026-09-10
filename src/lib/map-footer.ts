import type { FooterData } from '@/api/services/footer.service';
import type { FooterLinkColumn, FooterSocialLinkData } from '@/types';

export function toFooterColumns(data: FooterData): FooterLinkColumn[] {
  return data.columns.map((column) => ({
    title: column.label,
    links: column.links.map((link) => ({
      label: link.label,
      href: link.href,
      opensInNewTab: link.opens_in_new_tab,
    })),
  }));
}

export function toFooterSocialLinks(data: FooterData): FooterSocialLinkData[] {
  return data.social_links.map((link) => ({
    label: link.label,
    href: link.href,
    iconName: link.slug,
  }));
}
