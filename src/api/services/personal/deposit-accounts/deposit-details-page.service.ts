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

type SavingHeroContent = {
  button: LinkAction;
  heading: string;
};

type SavingAccountFinderAccount = {
  href: string;
  image: MediaWithAlt;
  title: string;
};

type SavingAccountFinderCategory = {
  label: string;
  accounts: SavingAccountFinderAccount[];
};

type SavingAccountFinderContent = {
  heading: string;
  categories: SavingAccountFinderCategory[];
};

type SavingDocumentsStep = {
  title: string;
  description: string;
};

type SavingDocumentsContent = {
  cta: LinkAction;
  image: MediaWithAlt;
  steps: SavingDocumentsStep[];
  heading: string;
};

type SavingStepsStep = {
  image: MediaWithAlt;
  title: string;
  number: string;
};

type SavingStepsContent = {
  cta: LinkAction;
  steps: SavingStepsStep[];
  heading: string;
};

type ContentBreadcrumbsSection = SectionOf<
  'content_breadcrumbs',
  ContentBreadcrumbsContent
>;
type SavingHeroSection = SectionOf<'saving_hero', SavingHeroContent>;
type SavingAccountFinderSection = SectionOf<
  'saving_account_finder',
  SavingAccountFinderContent
>;
type SavingDocumentsSection = SectionOf<
  'saving_documents',
  SavingDocumentsContent
>;
type SavingStepsSection = SectionOf<'saving_steps', SavingStepsContent>;

export type DepositDetailsPageSection =
  | ContentBreadcrumbsSection
  | SavingHeroSection
  | SavingAccountFinderSection
  | SavingDocumentsSection
  | SavingStepsSection;

type DepositDetailsPageData = Omit<PageData, 'sections'> & {
  sections: DepositDetailsPageSection[];
};

export type DepositDetailsPageResponse = Omit<PageResponse, 'data'> & {
  data: DepositDetailsPageData;
};

export const depositDetailsPageService = {
  getDepositDetailsPage: async (
    routeSlug: string,
  ): Promise<DepositDetailsPageResponse> => {
    const response = await axiosClient.get<DepositDetailsPageResponse>(
      `/public/pages/personal-${routeSlug}/`,
    );

    return response.data;
  },
};
