import type { ApiResponse } from './api';

export type Media = {
  media_id: number;
  src: string;
};

export type MediaWithAlt = Media & {
  alt: string;
};

export type LinkAction = {
  href: string;
  label: string;
};

export type SectionData = {
  id: number;
  section_type: string;
  label: string;
  position: number;
  is_visible: boolean;
  content: Record<string, unknown>;
  created_at: string;
  updated_at: string;
};

export type PageKind = 'page' | 'product_type' | 'product';

export type PageData = {
  id: number;
  slug: string;
  path: string;
  title: string;
  title_ne: string;
  kind: PageKind;
  parent: number | null;
  parent_slug: string | null;
  icon: string;
  position: number;
  is_active: boolean;
  show_in_menu: boolean;
  promo_label: string;
  promo_label_ne: string;
  promo_href: string;
  promo_is_active: boolean;
  created_at: string;
  updated_at: string;
  sections: SectionData[];
};

export type PageResponse = ApiResponse<PageData>;

export type SectionOf<TType extends string, TContent> = Omit<
  SectionData,
  'section_type' | 'content'
> & {
  section_type: TType;
  content: TContent;
};

export type SectionContentOf<
  TSection extends { section_type: string; content: unknown },
  TType extends TSection['section_type'],
> = Extract<TSection, { section_type: TType }>['content'];

export type TrustBannerContent = {
  title: string;
  images: MediaWithAlt[];
  description: string;
};
