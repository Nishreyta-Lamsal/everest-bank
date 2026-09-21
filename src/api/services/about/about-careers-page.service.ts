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

export type ContentJob = {
  id: string;
  title: string;
  location: string;
  apply_href: string;
  apply_label: string;
  description: string;
  employment_type: string;
};

export type ContentJobGroup = {
  heading: string;
  jobs: ContentJob[];
};

type ContentJobsContent = {
  groups: ContentJobGroup[];
};

type ContentBreadcrumbsSection = SectionOf<
  'content_breadcrumbs',
  ContentBreadcrumbsContent
>;
type ContentHeroSection = SectionOf<'content_hero', ContentHeroContent>;
type ContentJobsSection = SectionOf<'content_jobs', ContentJobsContent>;

export type AboutCareersPageSection =
  ContentBreadcrumbsSection | ContentHeroSection | ContentJobsSection;

type AboutCareersPageData = Omit<PageData, 'sections'> & {
  sections: AboutCareersPageSection[];
  related_pages: ContentSidebarLink[];
};

export type AboutCareersPageResponse = Omit<PageResponse, 'data'> & {
  data: AboutCareersPageData;
};

export const aboutCareersPageService = {
  getAboutCareersPageData: async (): Promise<AboutCareersPageResponse> => {
    const response = await axiosClient.get<AboutCareersPageResponse>(
      '/public/pages/about-careers',
    );

    return response.data;
  },
};
