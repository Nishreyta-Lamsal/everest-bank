import type { CardOffer } from '../_types/card-offer';

export const creditCardOffers: CardOffer[] = [
  {
    title: 'Everest NepalPay Credit Card',
    description:
      'Lower fees, built for everyday domestic spending across Nepal and India.',
    features: [
      'Valid across Nepal and India',
      'Lower annual fee than international cards',
      'Instant EMI conversion on large purchases',
      'Contactless tap-to-pay on all terminals',
    ],
    image: '/images/cards/everest-nepalpay-credit-card.png',
    imageAlt: 'Everest NepalPay Credit Card over a Himalayan mountain scene',
    learnMoreHref: '#',
    applyHref: '#',
  },
  {
    title: 'Everest Visa Credit Card',
    description:
      "Built for spending beyond Nepal's borders, with reward points on every purchase you make.",
    features: [
      'Accepted worldwide wherever Visa is accepted',
      'Up to 45 days interest-free credit period',
      'Reward points on every purchase, redeemable in-app',
      'EMV chip + contactless tap-to-pay',
    ],
    image: '/images/cards/everest-visa-credit-card.png',
    imageAlt: 'Everest Visa Credit Card over a Himalayan mountain scene',
    learnMoreHref: '#',
    applyHref: '#',
  },
];
