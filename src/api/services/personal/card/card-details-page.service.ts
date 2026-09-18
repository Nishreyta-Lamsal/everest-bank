import { axiosClient } from '@/lib/api/axios-client';

import type {
  LinkAction,
  MediaWithAlt,
  PageData,
  PageResponse,
  SectionOf,
} from '@/types';

type ContentBreadcrumbsContent = {
  items: {
    href?: string;
    label: string;
  }[];
};

type CardProductHeroContent = {
  image: Partial<MediaWithAlt>;
  heading: string;
  button: LinkAction;
};

type CardsTrustBarContent = {
  label: string;
  badges: {
    icon: string;
    label: string;
  }[];
};

export type CardTableRow = {
  label: string;
  nepal?: string;
  india?: string;
  is_group_header?: boolean;
};

export type CardTable = {
  heading: string;
  column_headers: [string, string, string];
  rows: CardTableRow[];
};

export type CardHowToUseBlock =
  | { type: 'text'; lead?: string; body: string }
  | { type: 'list'; items: string[] };

export type CardSafetyTips = {
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

type CardVariant = {
  key: string;
  face: Partial<MediaWithAlt>;
  brand: string;
  title: string;
  features: {
    heading: string;
    items: string[];
  };
  procedure: {
    heading: string;
    items: string[];
  };
  fee_tables: CardTable[];
  limits_table: CardTable;
  how_to_use: {
    heading: string;
    blocks: CardHowToUseBlock[];
  };
  eligibility: {
    heading: string;
    description: string;
  };
  safety_tips: CardSafetyTips;
};

type CardOverviewContent = {
  heading: string;
  description: string;
  brands_heading: string;
  brands?: string[];
  variants: CardVariant[];
};

type ContentBreadcrumbsSection = SectionOf<
  'content_breadcrumbs',
  ContentBreadcrumbsContent
>;
type CardProductHeroSection = SectionOf<
  'card_product_hero',
  CardProductHeroContent
>;
type CardsTrustBarSection = SectionOf<'cards_trust_bar', CardsTrustBarContent>;
type CardOverviewSection = SectionOf<'card_overview', CardOverviewContent>;

export type CardDetailsPageSection =
  | ContentBreadcrumbsSection
  | CardProductHeroSection
  | CardsTrustBarSection
  | CardOverviewSection;

type CardDetailsPageData = Omit<PageData, 'sections'> & {
  sections: CardDetailsPageSection[];
};

export type CardDetailsPageResponse = Omit<PageResponse, 'data'> & {
  data: CardDetailsPageData;
};

export const cardDetailsPageService = {
  getCardDetailsPage: async (
    routeSlug: string,
  ): Promise<CardDetailsPageResponse> => {
    const response = await axiosClient.get<CardDetailsPageResponse>(
      `/public/pages/personal-${routeSlug}/`,
    );

    return response.data;
  },
};
