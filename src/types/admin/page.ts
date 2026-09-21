export type PageKind = 'page' | 'product' | 'product_type';

export type Page = {
  id: number;
  slug: string;
  path: string;
  title: string;
  title_ne?: string;
  kind: PageKind;
  parent: number | null;
  parent_slug: string | null;
  icon?: string;
  position: number;
  is_active?: boolean;
  show_in_menu?: boolean;
  promo_label?: string;
  promo_label_ne?: string;
  promo_href?: string;
  promo_is_active?: boolean;
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
  | 'card_product_hero'
  | 'card_overview'
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
  | 'content_people'
  | 'remittance_hero'
  | 'remittance_services'
  | 'remittance_why'
  | 'remittance_trust'
  | 'remittance_open_account'
  | 'remittance_faqs'
  | 'saving_hero'
  | 'saving_documents'
  | 'saving_steps'
  | 'saving_account_finder';

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
  related_pages: {
    title: string;
    href: string;
  }[];
};

export type PageReplicateResult = {
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
  highlights?: string[];
  primary_button?: SectionLink;
  secondary_button?: SectionLink;
  video_chip?: {
    text?: string;
    link_href?: string;
    link_label?: string;
  };
  carousel_aria_label?: string;
};

export type ContentHeroContent = {
  image?: SectionMedia;
  heading?: string;
  button?: SectionLink;
};

export type ContentStatsContent = {
  stats?: {
    label: string;
    value: string;
  }[];
};

/** A body block is either headed paragraphs or a row of images. */
export type ContentTextBlock = {
  type?: undefined;
  heading: string;
  paragraphs: string[];
};

export type ContentImagesBlock = {
  type: 'images';
  images: SectionMedia[];
  layout?: 'full_width';
};

export type ContentQuoteBlock = {
  type: 'quote';
  title: string;
};

export type ContentBodyContent = {
  blocks?: (ContentTextBlock | ContentImagesBlock | ContentQuoteBlock)[];
};

export type ContentSidebarContent = {
  social_links?: {
    href: string;
    slug: string;
    label: string;
  }[];
  related_pages?: {
    href: string;
    title: string;
  }[];
};

export type ContentPeopleContent = {
  category?: string;
  people?: {
    id?: string;
    name: string;
    title: string;
    image?: SectionMedia;
    position?: number;
  }[];
};

export type AboutOverviewContent = {
  intro?: string;
  stats?: {
    label: string;
    value: string;
  }[];
  cards?: {
    href: string;
    title: string;
    link_label: string;
  }[];
  center_image?: SectionMedia;
};

export type AboutLinksContent = {
  cards?: {
    href: string;
    image: SectionMedia;
    title: string;
  }[];
};

export type AboutLeadershipContent = {
  heading?: string;
  description?: string;
  people?: {
    name: string;
    role: string;
    image: SectionMedia;
  }[];
  cta?: SectionLink;
};

export type AboutHistoryContent = {
  heading?: string;
  intro?: string;
  body?: string;
  image?: SectionMedia;
  cta?: SectionLink;
};

export type BusinessFinancingContent = {
  heading?: string;
  media_card?: {
    href: string;
    image: SectionMedia;
    label: string;
  };
  content_cards?: {
    href: string;
    image: SectionMedia;
    title: string;
    link_label: string;
    description: string;
  }[];
  cta?: SectionLink;
};

export type BusinessDigitalBankingContent = {
  heading?: string;
  image?: SectionMedia;
  features?: {
    icon: string;
    label: string;
  }[];
  cta?: SectionLink;
};

export type BusinessIndustriesContent = {
  heading?: string;
  description?: string;
  side_image?: SectionMedia;
  cards?: {
    href: string;
    icon: string;
    title: string;
    link_label: string;
    description: string;
  }[];
  cta?: SectionLink;
};

export type BusinessRelationshipManagersContent = {
  heading?: string;
  description?: string;
  managers?: {
    name: string;
    role: string;
    image: SectionMedia;
  }[];
  cta?: SectionLink;
};

export type RemittanceHeroContent = {
  headline?: string;
  subtext?: string;
  slides?: SectionMedia[];
  tracking?: {
    hint?: string;
    aria_label?: string;
    placeholder?: string;
    button_label?: string;
  };
  carousel_aria_label?: string;
};

export type RemittanceServicesContent = {
  cards?: {
    href: string;
    icon: string;
    title: string;
    subtitle: string;
  }[];
};

export type RemittanceWhyContent = {
  heading?: string;
  description?: string;
  image?: SectionMedia;
  stats?: {
    label: string;
    value: string;
  }[];
};

export type RemittanceTrustContent = {
  heading?: string;
  image?: SectionMedia;
  count_label?: string;
  /** Avatars carry no alt text — the page renders them decoratively. */
  avatars?: Pick<SectionMedia, 'src' | 'media_id'>[];
  cards?: {
    href: string;
    icon: string;
    title: string;
    link_label: string;
  }[];
};

export type RemittanceOpenAccountContent = {
  heading?: string;
  video?: {
    /** An external video URL, not an uploaded media file. */
    src?: string;
    poster?: SectionMedia;
  };
  features?: {
    icon: string;
    label: string;
  }[];
  cta?: SectionLink;
};

export type RemittanceFaqsContent = {
  heading?: string;
  items?: {
    question: string;
    answer: string;
  }[];
};

export type ContentBreadcrumbsContent = {
  items?: {
    label: string;
    href?: string;
  }[];
};

export type LoanHeroContent = {
  title?: string;
  description?: string;
  image?: SectionMedia;
  primary_cta?: SectionLink;
  secondary_cta?: SectionLink;
};

export type LoanStatsContent = {
  items?: {
    label: string;
    value: string;
  }[];
};

export type LoanEligibilityContent = {
  heading?: string;
  applicant_types?: string[];
  requirements_href?: string;
};

export type LoanApplyChecklistContent = {
  heading?: string;
  image?: SectionMedia;
  apply_href?: string;
  items?: {
    title: string;
    description: string;
  }[];
};

export type LoanFinancingContent = {
  heading?: string;
  cta_href?: string;
  cta_label?: string;
  cards?: {
    href: string;
    title: string;
    image: SectionMedia;
  }[];
};

export type LoanProcessContent = {
  heading?: string;
  apply_href?: string;
  steps?: {
    number: string;
    title: string;
    image: SectionMedia;
  }[];
};

export type LoanImpactContent = {
  heading?: string;
  description?: string;
  apply_href?: string;
  stats?: {
    label: string;
    value: string;
  }[];
};

export type LoanFaqsContent = {
  heading?: string;
  items?: {
    question: string;
    answer: string;
  }[];
};

export type LoanGlanceContent = {
  heading?: string;
  image?: SectionMedia;
  contact_href?: string;
  download_href?: string;
  items?: {
    label: string;
    value: string;
  }[];
};

export type SavingHeroContent = {
  heading?: string;
  button?: SectionLink;
};

/**
 * `saving_documents` and `saving_steps` reuse the loan checklist and process
 * shapes, so they share those editors.
 */
export type SavingDocumentsContent = {
  heading?: string;
  image?: SectionMedia;
  cta?: SectionLink;
  steps?: {
    title: string;
    description: string;
  }[];
};

export type SavingStepsContent = {
  heading?: string;
  cta?: SectionLink;
  steps?: {
    number: string;
    title: string;
    image: SectionMedia;
  }[];
};

export type CardProductHeroContent = {
  image?: SectionMedia;
  heading?: string;
  button?: SectionLink;
};

export type CardsTrustBarContent = {
  label?: string;
  badges?: {
    icon: string;
    label: string;
  }[];
};

export type CardTableContent = {
  heading: string;
  column_headers: [string, string, string];
  rows: {
    label: string;
    nepal?: string;
    india?: string;
    is_group_header?: boolean;
  }[];
};

export type CardHowToUseBlockContent =
  | { type: 'text'; lead?: string; body: string }
  | { type: 'list'; items: string[] };

export type CardVariantContent = {
  key: string;
  face?: SectionMedia;
  brand?: string;
  title?: string;
  features?: {
    heading: string;
    items: string[];
  };
  procedure?: {
    heading: string;
    items: string[];
  };
  fee_tables?: CardTableContent[];
  limits_table?: CardTableContent;
  how_to_use?: {
    heading: string;
    blocks: CardHowToUseBlockContent[];
  };
  eligibility?: {
    heading: string;
    description: string;
  };
  safety_tips?: {
    items: string[];
    heading: string;
    mail_label: string;
    mail_value: string;
    terms_body: string;
    terms_lead: string;
    contact_body: string;
    contact_lead: string;
    terms_link_label: string;
    hunting_line_label: string;
    hunting_line_value: string;
  };
};

export type CardOverviewContent = {
  heading?: string;
  description?: string;
  brands_heading?: string;
  brands?: string[];
  variants?: CardVariantContent[];
};

export type SavingAccountFinderContent = {
  heading?: string;
  categories?: {
    label: string;
    accounts?: {
      href: string;
      title: string;
      image: SectionMedia;
    }[];
  }[];
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
