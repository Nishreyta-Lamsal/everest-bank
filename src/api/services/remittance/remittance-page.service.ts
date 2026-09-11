import { axiosClient } from '@/lib/api/axios-client';

import type {
  LinkAction,
  Media,
  MediaWithAlt,
  PageData,
  PageResponse,
  SectionOf,
} from '@/types';

type RemittanceHeroContent = {
  slides: MediaWithAlt[];
  subtext: string;
  headline: string;
  tracking: {
    hint: string;
    aria_label: string;
    placeholder: string;
    button_label: string;
  };
  carousel_aria_label: string;
};

type RemittanceServicesContent = {
  cards: {
    href: string;
    icon: string;
    title: string;
    subtitle: string;
  }[];
};

type RemittanceWhyContent = {
  image: MediaWithAlt;
  stats: {
    label: string;
    value: string;
  }[];
  heading: string;
  description: string;
};

type RemittanceTrustContent = {
  cards: {
    href: string;
    icon: string;
    title: string;
    link_label: string;
  }[];
  image: MediaWithAlt;
  avatars: Media[];
  heading: string;
  count_label: string;
};

type RemittanceOpenAccountContent = {
  cta: LinkAction;
  video: {
    src: string;
    poster: MediaWithAlt;
  };
  heading: string;
  features: {
    icon: string;
    label: string;
  }[];
};

type RemittanceFaqsContent = {
  items: {
    answer: string;
    question: string;
  }[];
  heading: string;
};

type RemittanceHeroSection = SectionOf<
  'remittance_hero',
  RemittanceHeroContent
>;
type RemittanceServicesSection = SectionOf<
  'remittance_services',
  RemittanceServicesContent
>;
type RemittanceWhySection = SectionOf<'remittance_why', RemittanceWhyContent>;
type RemittanceTrustSection = SectionOf<
  'remittance_trust',
  RemittanceTrustContent
>;
type RemittanceOpenAccountSection = SectionOf<
  'remittance_open_account',
  RemittanceOpenAccountContent
>;
type RemittanceFaqsSection = SectionOf<
  'remittance_faqs',
  RemittanceFaqsContent
>;

export type RemittancePageSection =
  | RemittanceHeroSection
  | RemittanceServicesSection
  | RemittanceWhySection
  | RemittanceTrustSection
  | RemittanceOpenAccountSection
  | RemittanceFaqsSection;

type RemittancePageData = Omit<PageData, 'sections'> & {
  sections: RemittancePageSection[];
};

export type RemittancePageResponse = Omit<PageResponse, 'data'> & {
  data: RemittancePageData;
};

export const remittancePageService = {
  getRemittancePageData: async (): Promise<RemittancePageResponse> => {
    const response = await axiosClient.get<RemittancePageResponse>(
      '/public/pages/remittance',
    );

    return response.data;
  },
};
