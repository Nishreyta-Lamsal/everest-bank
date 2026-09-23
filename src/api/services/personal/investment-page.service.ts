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

type ContentHeroContent = {
  image: Partial<MediaWithAlt>;
  button: LinkAction;
  heading: string;
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
  social_links?: {
    href: string;
    slug: string;
    label: string;
  }[];
  related_pages?: {
    href: string;
    title: string;
  }[];
};

type ContentBreadcrumbsSection = SectionOf<
  'content_breadcrumbs',
  ContentBreadcrumbsContent
>;
type ContentHeroSection = SectionOf<'content_hero', ContentHeroContent>;
type ContentEditorSection = SectionOf<'content_editor', ContentEditorContent>;
type ContentSidebarSection = SectionOf<
  'content_sidebar',
  ContentSidebarContent
>;

export type InvestmentPageSection =
  | ContentBreadcrumbsSection
  | ContentHeroSection
  | ContentEditorSection
  | ContentSidebarSection;

type InvestmentPageData = Omit<PageData, 'sections'> & {
  sections: InvestmentPageSection[];
  related_pages: {
    href: string;
    title: string;
  }[];
};

export type InvestmentPageResponse = Omit<PageResponse, 'data'> & {
  data: InvestmentPageData;
};

export const investmentPageService = {
  getInvestmentPage: async (
    routeSlug: string,
  ): Promise<InvestmentPageResponse> => {
    const response = await axiosClient.get<InvestmentPageResponse>(
      `/public/pages/personal-${routeSlug}/`,
    );

    return response.data;
  },
};
