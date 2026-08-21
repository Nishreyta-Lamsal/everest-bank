import { api } from '@/lib/axios';

import type {
  LinkAction,
  MediaWithAlt,
  PageData,
  PageResponse,
  SectionOf,
  TrustBannerContent,
} from '@/types';

type AboutHeroContent = {
  image: MediaWithAlt;
  button: LinkAction;
  heading: string;
};

type AboutOverviewContent = {
  cards: {
    href: string;
    title: string;
    link_label: string;
  }[];
  intro: string;
  stats: {
    label: string;
    value: string;
  }[];
  center_image: MediaWithAlt;
};

type AboutLinksContent = {
  cards: {
    href: string;
    image: MediaWithAlt;
    title: string;
  }[];
};

type AboutLeadershipContent = {
  cta: LinkAction;
  people: {
    name: string;
    role: string;
    image: MediaWithAlt;
  }[];
  heading: string;
  description: string;
};

type AboutHistoryContent = {
  cta: LinkAction;
  body: string;
  image: MediaWithAlt;
  intro: string;
  heading: string;
};

type AboutHeroSection = SectionOf<'about_hero', AboutHeroContent>;
type AboutOverviewSection = SectionOf<'about_overview', AboutOverviewContent>;
type AboutLinksSection = SectionOf<'about_links', AboutLinksContent>;
type AboutLeadershipSection = SectionOf<
  'about_leadership',
  AboutLeadershipContent
>;
type AboutHistorySection = SectionOf<'about_history', AboutHistoryContent>;
type AboutTrustSection = SectionOf<'trust', TrustBannerContent>;

export type AboutPageSection =
  | AboutHeroSection
  | AboutOverviewSection
  | AboutLinksSection
  | AboutLeadershipSection
  | AboutHistorySection
  | AboutTrustSection;

type AboutPageData = Omit<PageData, 'sections'> & {
  sections: AboutPageSection[];
};

export type AboutPageResponse = Omit<PageResponse, 'data'> & {
  data: AboutPageData;
};

export const aboutPageService = {
  getAboutPageData: async (): Promise<AboutPageResponse> => {
    const response = await api.get<AboutPageResponse>('/public/pages/about');

    return response.data;
  },
};
