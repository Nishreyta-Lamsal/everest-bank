import { axiosClient } from '@/lib/api/axios-client';

import type { ContentSidebarLink } from '@/components/shared/content/ContentSidebar';

import type { LinkAction, PageData, PageResponse, SectionOf } from '@/types';

type ContentBreadcrumbsContent = {
  items: {
    href?: string;
    label: string;
  }[];
};

type ContentHeroContent = {
  button: LinkAction;
  heading: string;
};

export type ContentRepresentative = {
  id: string;
  name: string;
  contact_name: string;
  address: string;
  email: string;
  phone: string;
  fax: string;
};

export type ContentRepresentativeGroup = {
  heading: string;
  representatives: ContentRepresentative[];
};

type RemittanceRepresentativesContent = {
  groups: ContentRepresentativeGroup[];
};

type ContentBreadcrumbsSection = SectionOf<
  'content_breadcrumbs',
  ContentBreadcrumbsContent
>;
type ContentHeroSection = SectionOf<'content_hero', ContentHeroContent>;
type RemittanceRepresentativesSection = SectionOf<
  'remittance_representatives',
  RemittanceRepresentativesContent
>;

export type RemittanceRepresentativesWorldwidePageSection =
  | ContentBreadcrumbsSection
  | ContentHeroSection
  | RemittanceRepresentativesSection;

type RemittanceRepresentativesWorldwidePageData = Omit<PageData, 'sections'> & {
  sections: RemittanceRepresentativesWorldwidePageSection[];
  related_pages: ContentSidebarLink[];
};

export type RemittanceRepresentativesWorldwidePageResponse = Omit<
  PageResponse,
  'data'
> & {
  data: RemittanceRepresentativesWorldwidePageData;
};

export const remittanceRepresentativesWorldwidePageService = {
  getRemittanceRepresentativesWorldwidePageData:
    async (): Promise<RemittanceRepresentativesWorldwidePageResponse> => {
      const response =
        await axiosClient.get<RemittanceRepresentativesWorldwidePageResponse>(
          '/public/pages/remittance-representatives-worldwide',
        );

      return response.data;
    },
};
