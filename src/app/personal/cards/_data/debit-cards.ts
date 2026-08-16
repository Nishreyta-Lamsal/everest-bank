import type { CardOffer } from '../_types/card-offer';

export const debitCardOffers: CardOffer[] = [
  {
    title: 'Everest Visa Debit Card',
    description:
      'For accountholders who travel, shop online internationally, or need higher spending limits.',
    features: [
      'Use at any Visa ATM or merchant worldwide',
      'Higher daily limits for travel and online purchases',
      'Real-time SMS and app transaction alerts',
      'EMV chip + contactless tap-to-pay',
    ],
    image: '/images/cards/everest-visa-debit-card.png',
    imageAlt: 'Everest Visa Debit Card over a temple gateway scene',
    learnMoreHref: '#',
    applyHref: '#',
  },
  {
    title: 'Everest NepalPay Debit Card',
    description:
      'The everyday card for your Everest Bank account simple, fast, and free to start.',
    features: [
      'Free withdrawals at all Everest Bank ATMs',
      'Daily POS and withdrawal limits built for daily use',
      'No annual fee for the first year',
      'Instant issuance at any branch',
    ],
    image: '/images/cards/everest-nepalpay-debit-card.png',
    imageAlt: 'Everest NepalPay Debit Card over a Himalayan mountain scene',
    learnMoreHref: '#',
    applyHref: '#',
  },
];
