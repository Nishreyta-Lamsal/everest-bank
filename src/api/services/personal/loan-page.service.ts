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

type LoanHeroContent = {
  image: MediaWithAlt;
  title: string;
  description: string;
  primary_cta: LinkAction;
  secondary_cta: LinkAction;
};

type LoanStatsContent = {
  items: {
    label: string;
    value: string;
  }[];
};

type LoanEligibilityContent = {
  heading: string;
  applicant_types: string[];
  requirements_href: string;
};

type LoanApplyChecklistContent = {
  image: MediaWithAlt;
  items: {
    title: string;
    description: string;
  }[];
  heading: string;
  apply_href: string;
};

type LoanFinancingContent = {
  cards: {
    href: string;
    image: MediaWithAlt;
    title: string;
  }[];
  heading: string;
  cta_href: string;
  cta_label: string;
};

type LoanProcessContent = {
  steps: {
    image: MediaWithAlt;
    title: string;
    number: string;
  }[];
  heading: string;
  apply_href: string;
};

type LoanImpactContent = {
  stats: {
    label: string;
    value: string;
  }[];
  heading: string;
  apply_href: string;
  description: string;
};

type LoanFaqsContent = {
  items: {
    question: string;
    answer: string;
  }[];
  heading: string;
};

type LoanGlanceContent = {
  image: MediaWithAlt;
  items: {
    label: string;
    value: string;
  }[];
  heading: string;
  contact_href: string;
  download_href: string;
};

type ContentBreadcrumbsSection = SectionOf<
  'content_breadcrumbs',
  ContentBreadcrumbsContent
>;
type LoanHeroSection = SectionOf<'loan_hero', LoanHeroContent>;
type LoanStatsSection = SectionOf<'loan_stats', LoanStatsContent>;
type LoanEligibilitySection = SectionOf<
  'loan_eligibility',
  LoanEligibilityContent
>;
type LoanApplyChecklistSection = SectionOf<
  'loan_apply_checklist',
  LoanApplyChecklistContent
>;
type LoanFinancingSection = SectionOf<'loan_financing', LoanFinancingContent>;
type LoanProcessSection = SectionOf<'loan_process', LoanProcessContent>;
type LoanImpactSection = SectionOf<'loan_impact', LoanImpactContent>;
type LoanFaqsSection = SectionOf<'loan_faqs', LoanFaqsContent>;
type LoanGlanceSection = SectionOf<'loan_glance', LoanGlanceContent>;

export type LoanPageSection =
  | ContentBreadcrumbsSection
  | LoanHeroSection
  | LoanStatsSection
  | LoanEligibilitySection
  | LoanApplyChecklistSection
  | LoanFinancingSection
  | LoanProcessSection
  | LoanImpactSection
  | LoanFaqsSection
  | LoanGlanceSection;

type LoanPageData = Omit<PageData, 'sections'> & {
  sections: LoanPageSection[];
};

export type LoanPageResponse = Omit<PageResponse, 'data'> & {
  data: LoanPageData;
};

export const loanPageService = {
  getLoanPage: async (routeSlug: string): Promise<LoanPageResponse> => {
    const response = await axiosClient.get<LoanPageResponse>(
      `/public/pages/personal-${routeSlug}/`,
    );

    return response.data;
  },
};
