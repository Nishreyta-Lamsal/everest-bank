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

type ContentBlock = ContentTextBlock | ContentImagesBlock;

type ContentEditorContent = {
  body?: string;
  /** Legacy shape from before this section moved to a single rich-text body. */
  blocks?: ContentBlock[];
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

type ContentNewsContent = {
  cta: LinkAction;
  heading: string;
};

type ContentContactContent = {
  heading: string;
  help_topics: {
    href: string;
    title: string;
    link_label: string;
    description: string;
  }[];
  email_button: {
    href: string;
    label: string;
    label_mobile: string;
  };
  primary_button: LinkAction;
};

type ContentBreadcrumbsSection = SectionOf<
  'content_breadcrumbs',
  ContentBreadcrumbsContent
>;
type ContentHeroSection = SectionOf<'content_hero', ContentHeroContent>;
type ContentStatsSection = SectionOf<'content_stats', ContentStatsContent>;
type ContentEditorSection = SectionOf<'content_editor', ContentEditorContent>;
type ContentSidebarSection = SectionOf<
  'content_sidebar',
  ContentSidebarContent
>;
type ContentNewsSection = SectionOf<'content_news', ContentNewsContent>;
type ContentContactSection = SectionOf<
  'content_contact',
  ContentContactContent
>;

export type AboutProfilePageSection =
  | ContentBreadcrumbsSection
  | ContentHeroSection
  | ContentStatsSection
  | ContentEditorSection
  | ContentSidebarSection
  | ContentNewsSection
  | ContentContactSection;

type AboutProfilePageData = Omit<PageData, 'sections'> & {
  sections: AboutProfilePageSection[];
  related_pages: ContentSidebarLink[];
};

export type AboutProfilePageResponse = Omit<PageResponse, 'data'> & {
  data: AboutProfilePageData;
};

export const aboutProfilePageService = {
  getAboutProfilePageData: async (): Promise<AboutProfilePageResponse> => {
    const response = await axiosClient.get<AboutProfilePageResponse>(
      '/public/pages/about-profile',
    );

    return response.data;
  },
};
