import type { RecommendationRow } from '@/types';

export const financingRows: RecommendationRow[] = [
  { label: 'Starting a Business', value: 'Business Account' },
  { label: 'Growing Operations', value: 'Working Capital Finance' },
  { label: 'Expanding Business', value: 'SME Loan' },
  { label: 'Accepting Payments', value: 'Merchant Solutions' },
  { label: 'Trading Internationally', value: 'Trade Finance' },
];

export const financingImage = {
  src: '/images/business/sme-right-financing.png',
  alt: 'A woman farmer smiling with children in a wheat field, representing an SME business Everest Bank supports',
};
