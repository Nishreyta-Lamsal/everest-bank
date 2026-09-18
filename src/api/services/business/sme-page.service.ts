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

type SmeHeroContent = {
  image: MediaWithAlt;
  button: LinkAction;
  heading: string;
  secondary_button: {
    href: string;
  };
};

type SmeProductsContent = {
  image: MediaWithAlt;
  products: {
    href: string;
    index: string;
    title: string;
    description: string;
  }[];
};

type SmeStatsContent = {
  image: MediaWithAlt;
  items: {
    label: string;
    value: string;
  }[];
  heading: string;
};

type SmeFinancingContent = {
  rows: {
    stage: string;
    solution: string;
  }[];
  image: MediaWithAlt;
  heading: string;
  primary_cta: LinkAction;
  secondary_cta: LinkAction;
  stage_heading: string;
  solution_heading: string;
};

type SmeOpenAccountContent = {
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

type SmeFaqsContent = {
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
type SmeHeroSection = SectionOf<'sme_hero', SmeHeroContent>;
type SmeProductsSection = SectionOf<'sme_products', SmeProductsContent>;
type SmeStatsSection = SectionOf<'sme_stats', SmeStatsContent>;
type SmeFinancingSection = SectionOf<'sme_financing', SmeFinancingContent>;
type SmeOpenAccountSection = SectionOf<
  'sme_open_account',
  SmeOpenAccountContent
>;
type SmeFaqsSection = SectionOf<'sme_faqs', SmeFaqsContent>;

export type SmePageSection =
  | ContentBreadcrumbsSection
  | SmeHeroSection
  | SmeProductsSection
  | SmeStatsSection
  | SmeFinancingSection
  | SmeOpenAccountSection
  | SmeFaqsSection;

type SmePageData = Omit<PageData, 'sections'> & {
  sections: SmePageSection[];
};

export type SmePageResponse = Omit<PageResponse, 'data'> & {
  data: SmePageData;
};

export const smePageService = {
  getSmePage: async (): Promise<SmePageResponse> => {
    const response = await axiosClient.get<SmePageResponse>(
      '/public/pages/business-sme-banking',
    );

    return response.data;
  },
};
