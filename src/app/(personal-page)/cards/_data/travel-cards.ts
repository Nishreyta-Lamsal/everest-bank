import type { CardOffer } from '../_types/card-offer';

export const travelCardOffers: CardOffer[] = [
  {
    title: 'Everest Visa Travel Card',
    description:
      'Lock your exchange rate before you fly and spend confidently anywhere in the world.',
    features: [
      'Load and lock multiple currencies before you fly',
      'Accepted at millions of merchants and ATMs abroad',
      'Shields your main account from overseas fraud',
      '24/7 global travel support',
    ],
    image: '/images/cards/everest-visa-travel-card.png',
    imageAlt: 'Everest Visa Travel Card with a world map motif',
    imageClassName: 'scale-110',
    learnMoreHref: '#',
    applyHref: '#',
  },
  {
    title: 'Everest NepalPay Prepaid Card',
    description:
      'A flexible, reloadable card for budgeting, gifting, or spending without a bank account.',
    features: [
      'Reloadable anytime at any branch',
      'Great for gifting, allowances, and budgeting',
      'No credit check required',
      'Spend without linking a bank account',
    ],
    image: '/images/cards/everest-nepalpay-prepaid-card.png',
    imageAlt: 'Everest NepalPay Prepaid Card with a world map motif',
    learnMoreHref: '#',
    applyHref: '#',
  },
];
