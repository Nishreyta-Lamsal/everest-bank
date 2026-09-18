import { ROUTE } from '@/constants';

import type { PublicCardGroup } from '@/types/admin';

export type ExploreServiceCard = {
  title: string;
  image: string;
  href: string;
};

export const exploreServiceCards: ExploreServiceCard[] = [
  {
    title: 'Loan Products',
    image: '/images/loans/home-loan.png',
    href: ROUTE.LOANS,
  },
  {
    title: 'Digital Banking',
    image: '/images/cards/explore-digital-banking.jpg',
    href: '#',
  },
  {
    title: 'Investment services',
    image: '/images/cards/explore-investment-services.jpg',
    href: '#',
  },
];

/**
 * Outage fallback for the "explore-services" card group.
 *
 * The cards are managed in the CMS; this is only rendered when the API cannot
 * be reached, so the section never disappears mid-page.
 */
export const exploreServicesFallback: PublicCardGroup = {
  slug: 'explore-services',
  title: 'Explore more of our services',
  cards: exploreServiceCards.map((card, index) => ({
    slug: String(index),
    title: card.title,
    image_url: card.image,
    href: card.href,
    cta_label: 'Explore more',
    position: index,
  })),
};
