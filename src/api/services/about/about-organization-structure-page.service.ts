import { axiosClient } from '@/lib/api/axios-client';

import type { ContentSidebarLink } from '@/components/shared/content/ContentSidebar';

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

type ContentHeroContent = {
  image: MediaWithAlt;
  button: LinkAction;
  heading: string;
};

export type ContentGroupCardItem = {
  name: string;
  badge?: string;
  role?: string;
  departments?: string;
};

export type ContentGroupCard = {
  icon?: string;
  heading: string;
  description?: string;
  items: ContentGroupCardItem[];
};

export type ContentGroupBlock = {
  type: 'group';
  label: string;
  heading: string;
  cards: ContentGroupCard[];
};

export type ContentImagesBlock = {
  type: 'images';
  images: MediaWithAlt[];
  layout?: 'full_width';
};

export type ContentQuoteBlock = {
  type: 'quote';
  title: string;
};

export type ContentBlock =
  ContentGroupBlock | ContentImagesBlock | ContentQuoteBlock;

type ContentBodyContent = {
  blocks: ContentBlock[];
};

type ContentSidebarContent = {
  related_pages: {
    href: string;
    title: string;
  }[];
};

type ContentBreadcrumbsSection = SectionOf<
  'content_breadcrumbs',
  ContentBreadcrumbsContent
>;
type ContentHeroSection = SectionOf<'content_hero', ContentHeroContent>;
type ContentBodySection = SectionOf<'content_body', ContentBodyContent>;
type ContentSidebarSection = SectionOf<
  'content_sidebar',
  ContentSidebarContent
>;

export type AboutOrganizationStructurePageSection =
  | ContentBreadcrumbsSection
  | ContentHeroSection
  | ContentBodySection
  | ContentSidebarSection;

type AboutOrganizationStructurePageData = Omit<PageData, 'sections'> & {
  explore_label: string;
  explore_href: string;
  sections: AboutOrganizationStructurePageSection[];
  related_pages: ContentSidebarLink[];
};

export type AboutOrganizationStructurePageResponse = Omit<
  PageResponse,
  'data'
> & {
  data: AboutOrganizationStructurePageData;
};

export const aboutOrganizationStructurePageService = {
  getAboutOrganizationStructurePageData:
    async (): Promise<AboutOrganizationStructurePageResponse> => {
      const response =
        await axiosClient.get<AboutOrganizationStructurePageResponse>(
          '/public/pages/about-organization-structure',
        );

      return response.data;
    },
};
