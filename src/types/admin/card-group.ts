import type { Media } from './media';

export type Card = {
  id: number;
  slug: string;
  title: string;
  title_ne?: string;
  image: Media | null;
  /** Page slug when the card links to a page, else null. */
  page: string | null;
  href: string;
  /** Where the card actually links: the page's path, or href. */
  resolved_href: string;
  cta_label: string;
  /** Screen keys this card is limited to. Empty means every screen. */
  screens: string[];
  position: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type CardScreen = {
  key: string;
  label: string;
};

export type CardGroup = {
  id: number;
  slug: string;
  title: string;
  title_ne?: string;
  is_active: boolean;
  cards_count?: number;
  created_at: string;
  updated_at: string;
};

export type CardGroupDetail = CardGroup & {
  cards: Card[];
  /** Screens the CMS can offer, defined in the backend so both agree. */
  available_screens: CardScreen[];
};

/** Public shape: already flattened, nothing to resolve. */
export type PublicCard = {
  slug: string;
  title: string;
  image_url: string | null;
  href: string;
  cta_label: string;
  position: number;
};

export type PublicCardGroup = {
  slug: string;
  title: string;
  cards: PublicCard[];
};
