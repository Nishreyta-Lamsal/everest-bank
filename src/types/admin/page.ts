export type Page = {
  id: number;
  slug: string;
  path: string;
  title: string;
  title_ne?: string;
  is_active?: boolean;
  sections_count: number;
  created_at: string;
  updated_at: string;
};

export type PageListData = {
  pages: Page[];
};

export type SectionType =
  | 'hero'
  | 'products'
  | 'loans_preview'
  | 'cards_preview'
  | 'app_promo'
  | 'csr'
  | 'trust'
  | 'cards_hero'
  | 'cards_trust_bar'
  | 'cards_network'
  | 'cards_credit_offers'
  | 'cards_debit_offers'
  | 'cards_travel_offers'
  | 'cards_process'
  | 'cards_faqs'
  | 'loan_hero'
  | 'loan_stats'
  | 'loan_eligibility'
  | 'loan_apply_checklist'
  | 'loan_financing'
  | 'loan_process'
  | 'loan_impact'
  | 'loan_faqs'
  | 'loan_glance'
  | 'business_hero'
  | 'business_products'
  | 'business_financing'
  | 'business_digital_banking'
  | 'business_industries'
  | 'business_trust'
  | 'business_relationship_managers'
  | 'sme_hero'
  | 'sme_products'
  | 'sme_stats'
  | 'sme_financing'
  | 'sme_open_account'
  | 'sme_faqs'
  | 'about_hero'
  | 'about_overview'
  | 'about_links'
  | 'about_leadership'
  | 'about_history'
  | 'content_breadcrumbs'
  | 'content_hero'
  | 'content_stats'
  | 'content_body'
  | 'content_sidebar'
  | 'remittance_hero'
  | 'remittance_services'
  | 'remittance_why'
  | 'remittance_trust'
  | 'remittance_open_account'
  | 'remittance_faqs';

export type PageSectionRead = {
  id: number;
  section_type: SectionType;
  label: string;
  position: number;
  is_visible: boolean;
  content: Record<string, unknown>;
  created_at: string;
  updated_at: string;
};

export type PageDetail = {
  id: number;
  slug: string;
  path: string;
  title: string;
  title_ne: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  sections: PageSectionRead[];
};

export type SectionMedia = {
  src: string;
  alt: string;
  media_id?: number;
};

export type SectionLink = {
  label: string;
  href: string;
};

export type HeroContent = {
  slides?: SectionMedia[];
  image?: SectionMedia;
  subtext?: string;
  headline_lines?: string[];
  primary_button?: SectionLink;
  secondary_button?: SectionLink;
  video_chip?: {
    text?: string;
    link_href?: string;
    link_label?: string;
  };
  carousel_aria_label?: string;
};

export type LocalizedContent<T> = T & Partial<Record<'en' | 'ne', T>>;

export const PRODUCT_CARD_ICONS = [
  'arrow-up-right-square',
  'bank',
  'buildings',
  'card',
  'factory',
  'growth',
  'partnership',
  'pie-chart',
  'piggy-bank',
  'safe',
  'shield-check-badge',
  'smartphone',
  'transfer',
] as const;

export type ProductCardIcon = (typeof PRODUCT_CARD_ICONS)[number];

export type ProductCard = {
  title?: string;
  subtitle?: string;
  href?: string;
  icon?: string;
  featured?: boolean;
  decoration_src?: SectionMedia;
};

export type ProductsContent = {
  top_cards?: ProductCard[];
  bottom_cards?: ProductCard[];
};

export type LoansPreviewCard = {
  title?: string;
  href?: string;
  image?: SectionMedia;
};

export type LoansPreviewContent = {
  heading?: string;
  cards?: LoansPreviewCard[];
  cta?: SectionLink;
};

export type CardsPreviewTile = {
  title?: string;
  href?: string;
  rounded_corner?: string;
};

export type CardsPreviewContent = {
  heading_lines?: string[];
  tiles?: CardsPreviewTile[];
  background_image?: SectionMedia;
  cta?: SectionLink;
};

export type AppPromoBadge = {
  label?: string;
  href?: string;
  icon?: string;
};

export type AppPromoContent = {
  heading?: string;
  badges?: AppPromoBadge[];
  qr_code?: SectionMedia & { caption_lines?: string[] };
  hero_image?: SectionMedia;
  phone_mockup?: SectionMedia;
  app_store_badges?: SectionMedia[];
};

export type CsrCard = {
  title?: string;
  href?: string;
  icon?: string;
  link_label?: string;
};

export type CsrContent = {
  heading?: string;
  description?: string;
  cards?: CsrCard[];
  main_image?: SectionMedia;
  customer_count?: string;
  customer_avatars?: SectionMedia[];
  cta?: SectionLink;
};

export type TrustContent = {
  title?: string;
  description?: string;
  images?: SectionMedia[];
};
