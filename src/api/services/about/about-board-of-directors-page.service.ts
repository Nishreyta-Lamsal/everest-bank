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

export type ContentPerson = {
  id: string;
  name: string;
  image: MediaWithAlt;
  title: string;
  position: number;
};

type ContentPeopleContent = {
  people: ContentPerson[];
  category: string;
};

export type ContentQuoteBlock = {
  type: 'quote';
  title: string;
};

type ContentBodyContent = {
  blocks: ContentQuoteBlock[];
};

type ContentBreadcrumbsSection = SectionOf<
  'content_breadcrumbs',
  ContentBreadcrumbsContent
>;
type ContentHeroSection = SectionOf<'content_hero', ContentHeroContent>;
type ContentPeopleSection = SectionOf<'content_people', ContentPeopleContent>;
type ContentBodySection = SectionOf<'content_body', ContentBodyContent>;

export type AboutBoardOfDirectorsPageSection =
  | ContentBreadcrumbsSection
  | ContentHeroSection
  | ContentPeopleSection
  | ContentBodySection;

type AboutBoardOfDirectorsPageData = Omit<PageData, 'sections'> & {
  sections: AboutBoardOfDirectorsPageSection[];
  related_pages: ContentSidebarLink[];
};

export type AboutBoardOfDirectorsPageResponse = Omit<PageResponse, 'data'> & {
  data: AboutBoardOfDirectorsPageData;
};

export const aboutBoardOfDirectorsPageService = {
  getAboutBoardOfDirectorsPageData:
    async (): Promise<AboutBoardOfDirectorsPageResponse> => {
      const response = await axiosClient.get<AboutBoardOfDirectorsPageResponse>(
        '/public/pages/about-board-of-directors',
      );

      return response.data;
    },
};
