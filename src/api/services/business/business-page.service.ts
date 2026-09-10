import { axiosClient } from '@/lib/api/axios-client';

import type {
  LinkAction,
  MediaWithAlt,
  PageData,
  PageResponse,
  SectionOf,
  TrustBannerContent,
} from '@/types';

type BusinessHeroContent = {
  slides: MediaWithAlt[];
  subtext: string;
  highlights: string[];
  headline_lines: string[];
  primary_button: LinkAction;
  secondary_button: LinkAction;
  carousel_aria_label: string;
};

type BusinessProductCard = {
  href: string;
  icon: string;
  title: string;
  subtitle: string;
};

type BusinessProductsContent = {
  top_cards: BusinessProductCard[];
  bottom_cards: BusinessProductCard[];
};

type BusinessFinancingContent = {
  cta: LinkAction;
  heading: string;
  media_card: {
    href: string;
    image: MediaWithAlt;
    label: string;
  };
  content_cards: {
    href: string;
    image: MediaWithAlt;
    title: string;
    link_label: string;
    description: string;
  }[];
};

type BusinessDigitalBankingContent = {
  cta: LinkAction;
  image: MediaWithAlt;
  heading: string;
  features: {
    icon: string;
    label: string;
  }[];
};

type BusinessIndustriesContent = {
  cta: LinkAction;
  cards: {
    href: string;
    icon: string;
    title: string;
    link_label: string;
    description: string;
  }[];
  heading: string;
  side_image: MediaWithAlt;
  description: string;
};

type BusinessRelationshipManagersContent = {
  cta: LinkAction;
  heading: string;
  managers: {
    name: string;
    role: string;
    image: MediaWithAlt;
  }[];
  description: string;
};

type BusinessHeroSection = SectionOf<'business_hero', BusinessHeroContent>;
type BusinessProductsSection = SectionOf<
  'business_products',
  BusinessProductsContent
>;
type BusinessFinancingSection = SectionOf<
  'business_financing',
  BusinessFinancingContent
>;
type BusinessDigitalBankingSection = SectionOf<
  'business_digital_banking',
  BusinessDigitalBankingContent
>;
type BusinessIndustriesSection = SectionOf<
  'business_industries',
  BusinessIndustriesContent
>;
type BusinessTrustSection = SectionOf<'business_trust', TrustBannerContent>;
type BusinessRelationshipManagersSection = SectionOf<
  'business_relationship_managers',
  BusinessRelationshipManagersContent
>;

export type BusinessPageSection =
  | BusinessHeroSection
  | BusinessProductsSection
  | BusinessFinancingSection
  | BusinessDigitalBankingSection
  | BusinessIndustriesSection
  | BusinessTrustSection
  | BusinessRelationshipManagersSection;

type BusinessPageData = Omit<PageData, 'sections'> & {
  sections: BusinessPageSection[];
};

export type BusinessPageResponse = Omit<PageResponse, 'data'> & {
  data: BusinessPageData;
};

export const businessPageService = {
  getBusinessPageData: async (): Promise<BusinessPageResponse> => {
    const response = await axiosClient.get<BusinessPageResponse>(
      '/public/pages/business',
    );

    return response.data;
  },
};
