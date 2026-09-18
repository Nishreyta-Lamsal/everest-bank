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

type SecondaryLinkAction = {
  href: string;
  aria_label: string;
};

type DepositHeroContent = {
  image: MediaWithAlt;
  button: LinkAction;
  heading: string;
  secondary_button: SecondaryLinkAction;
};

type DepositProductsContent = {
  image: MediaWithAlt;
  products: {
    href: string;
    index: string;
    title: string;
    description: string;
  }[];
};

type DepositStatsContent = {
  image: MediaWithAlt;
  items: {
    label: string;
    value: string;
  }[];
  heading: string;
};

type DepositRecommendationContent = {
  rows: {
    label: string;
    value: string;
  }[];
  image: MediaWithAlt;
  heading: string;
  primary_cta: LinkAction;
  label_heading: string;
  secondary_cta: LinkAction;
  value_heading: string;
};

type DepositOpenAccountContent = {
  cta: LinkAction;
  video: {
    src: string;
    poster: MediaWithAlt;
  };
  heading: string;
  features: {
    icon: string;
    label: string;
  }[];
};

type DepositFaqsContent = {
  items: {
    question: string;
    answer: string;
  }[];
  heading: string;
};

type ContentBreadcrumbsSection = SectionOf<
  'content_breadcrumbs',
  ContentBreadcrumbsContent
>;
type DepositHeroSection = SectionOf<'deposit_hero', DepositHeroContent>;
type DepositProductsSection = SectionOf<
  'deposit_products',
  DepositProductsContent
>;
type DepositStatsSection = SectionOf<'deposit_stats', DepositStatsContent>;
type DepositRecommendationSection = SectionOf<
  'deposit_recommendation',
  DepositRecommendationContent
>;
type DepositOpenAccountSection = SectionOf<
  'deposit_open_account',
  DepositOpenAccountContent
>;
type DepositFaqsSection = SectionOf<'deposit_faqs', DepositFaqsContent>;

export type DepositPageSection =
  | ContentBreadcrumbsSection
  | DepositHeroSection
  | DepositProductsSection
  | DepositStatsSection
  | DepositRecommendationSection
  | DepositOpenAccountSection
  | DepositFaqsSection;

type DepositPageData = Omit<PageData, 'sections'> & {
  sections: DepositPageSection[];
};

export type DepositPageResponse = Omit<PageResponse, 'data'> & {
  data: DepositPageData;
};

export const depositPageService = {
  getDepositPage: async (): Promise<DepositPageResponse> => {
    const response = await axiosClient.get<DepositPageResponse>(
      '/public/pages/personal-deposit-accounts/',
    );

    return response.data;
  },
};
