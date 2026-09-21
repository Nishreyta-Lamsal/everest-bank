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

type ContentStatsContent = {
  stats: {
    label: string;
    value: string;
  }[];
};

type ContentTextBlock = {
  type?: undefined;
  heading: string;
  paragraphs: string[];
};

type ContentImagesBlock = {
  type: 'images';
  images: MediaWithAlt[];
  layout?: 'full_width';
};

type ContentCardBlock = {
  type: 'card';
  icon: string;
  heading: string;
  paragraphs: string[];
};

type ContentQuoteBlock = {
  type: 'quote';
  title: string;
};

type ContentBlock =
  ContentTextBlock | ContentImagesBlock | ContentCardBlock | ContentQuoteBlock;

type ContentBodyContent = {
  blocks: ContentBlock[];
};

type ContentSidebarContent = {
  social_links: {
    href: string;
    slug: string;
    label: string;
  }[];
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
type ContentStatsSection = SectionOf<'content_stats', ContentStatsContent>;
type ContentBodySection = SectionOf<'content_body', ContentBodyContent>;
type ContentSidebarSection = SectionOf<
  'content_sidebar',
  ContentSidebarContent
>;

export type AboutCorporateMissionAndVisionPageSection =
  | ContentBreadcrumbsSection
  | ContentHeroSection
  | ContentStatsSection
  | ContentBodySection
  | ContentSidebarSection;

type AboutCorporateMissionAndVisionPageData = Omit<PageData, 'sections'> & {
  sections: AboutCorporateMissionAndVisionPageSection[];
  related_pages: ContentSidebarLink[];
};

export type AboutCorporateMissionAndVisionPageResponse = Omit<
  PageResponse,
  'data'
> & {
  data: AboutCorporateMissionAndVisionPageData;
};

export const aboutCorporateMissionAndVisionPageService = {
  getAboutCorporateMissionAndVisionPageData:
    async (): Promise<AboutCorporateMissionAndVisionPageResponse> => {
      const response =
        await axiosClient.get<AboutCorporateMissionAndVisionPageResponse>(
          '/public/pages/about-corporate-mission-and-vision',
        );

      return response.data;
    },
};
