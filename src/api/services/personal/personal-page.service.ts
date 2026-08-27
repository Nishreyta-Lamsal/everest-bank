import { api } from '@/lib/axios';

import type {
  LinkAction,
  Media,
  MediaWithAlt,
  PageData,
  PageResponse,
  SectionOf,
  TrustBannerContent,
} from '@/types';

export type HeroContent = {
  slides: MediaWithAlt[];
  subtext: string;
  video_chip: {
    text: string;
    link_href: string;
    link_label: string;
  };
  headline_lines: string[];
  primary_button: LinkAction;
  carousel_aria_label: string;
};

type ProductCard = {
  href: string;
  icon: string;
  title: string;
  subtitle: string;
  featured?: boolean;
  decoration_src?: Media;
};

type ProductsContent = {
  top_cards: ProductCard[];
  bottom_cards: ProductCard[];
};

type LoansPreviewContent = {
  cta: LinkAction;
  cards: {
    href: string;
    image: MediaWithAlt;
    title: string;
  }[];
  heading: string;
};

type CardsPreviewContent = {
  cta: LinkAction;
  tiles: {
    href: string;
    title: string;
    rounded_corner: 'left' | 'right';
  }[];
  heading_lines: string[];
  background_image: Media;
};

type AppPromoContent = {
  badges: {
    href: string;
    icon: string;
    label: string;
  }[];
  heading: string;
  qr_code: MediaWithAlt & {
    caption_lines: string[];
  };
  hero_image: MediaWithAlt;
  phone_mockup: MediaWithAlt;
  app_store_badges: MediaWithAlt[];
};

type CsrContent = {
  cta: LinkAction;
  cards: {
    href: string;
    icon: string;
    title: string;
    link_label: string;
  }[];
  heading: string;
  main_image: MediaWithAlt;
  description: string;
  customer_count: string;
  customer_avatars: Media[];
};

type HeroSection = SectionOf<'hero', HeroContent>;
type ProductsSection = SectionOf<'products', ProductsContent>;
type LoansPreviewSection = SectionOf<'loans_preview', LoansPreviewContent>;
type CardsPreviewSection = SectionOf<'cards_preview', CardsPreviewContent>;
type AppPromoSection = SectionOf<'app_promo', AppPromoContent>;
type CsrSection = SectionOf<'csr', CsrContent>;
type TrustSection = SectionOf<'trust', TrustBannerContent>;

export type PersonalPageSection =
  | HeroSection
  | ProductsSection
  | LoansPreviewSection
  | CardsPreviewSection
  | AppPromoSection
  | CsrSection
  | TrustSection;

type PersonalPageData = Omit<PageData, 'sections'> & {
  sections: PersonalPageSection[];
};

export type PersonalPageResponse = Omit<PageResponse, 'data'> & {
  data: PersonalPageData;
};

export const personalPageService = {
  getPersonalPageData: async (): Promise<PersonalPageResponse> => {
    const response = await api.get<PersonalPageResponse>(
      '/public/pages/personal',
    );

    return response.data;
  },
};
