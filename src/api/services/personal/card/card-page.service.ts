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

type CardsHeroContent = {
  image: MediaWithAlt;
  button: LinkAction;
  heading: string;
};

type CardsTrustBarContent = {
  label: string;
  badges: {
    icon: string;
    label: string;
  }[];
};

export type CardsNetworkSegment =
  { type: 'text'; value: string } | { type: 'icon'; icon: string };

type CardsNetworkContent = {
  segments: CardsNetworkSegment[];
};

export type CardOfferContent = {
  image: MediaWithAlt;
  title: string;
  features: string[];
  apply_href: string;
  description: string;
  learn_more_href: string;
  image_class_name?: string;
};

type CardOffersContent = {
  offers: CardOfferContent[];
  heading: string;
};

export type CardProcessStepContent = {
  image: MediaWithAlt;
  title: string;
  number: string;
  description: string;
};

type CardsProcessContent = {
  steps: CardProcessStepContent[];
  button: LinkAction;
  heading: string;
};

type CardsFaqsContent = {
  items: {
    question: string;
    answer: string;
  }[];
  heading: string;
};

type ContentBreadcrumbsSection = SectionOf<
  'content_breadcrumbs',
  ContentBreadcrumbsContent
>;
type CardsHeroSection = SectionOf<'cards_hero', CardsHeroContent>;
type CardsTrustBarSection = SectionOf<'cards_trust_bar', CardsTrustBarContent>;
type CardsNetworkSection = SectionOf<'cards_network', CardsNetworkContent>;
type CardsCreditOffersSection = SectionOf<
  'cards_credit_offers',
  CardOffersContent
>;
type CardsDebitOffersSection = SectionOf<
  'cards_debit_offers',
  CardOffersContent
>;
type CardsTravelOffersSection = SectionOf<
  'cards_travel_offers',
  CardOffersContent
>;
type CardsProcessSection = SectionOf<'cards_process', CardsProcessContent>;
type CardsFaqsSection = SectionOf<'cards_faqs', CardsFaqsContent>;

export type CardPageSection =
  | ContentBreadcrumbsSection
  | CardsHeroSection
  | CardsTrustBarSection
  | CardsNetworkSection
  | CardsCreditOffersSection
  | CardsDebitOffersSection
  | CardsTravelOffersSection
  | CardsProcessSection
  | CardsFaqsSection;

type CardPageData = Omit<PageData, 'sections'> & {
  sections: CardPageSection[];
};

export type CardPageResponse = Omit<PageResponse, 'data'> & {
  data: CardPageData;
};

export const cardPageService = {
  getCardPage: async (): Promise<CardPageResponse> => {
    const response = await axiosClient.get<CardPageResponse>(
      '/public/pages/personal-cards/',
    );

    return response.data;
  },
};
