import type { RecommendationRow } from '@/types';

export const idealAccountRows: RecommendationRow[] = [
  { label: 'Everyday Banking', value: 'Savings Account' },
  { label: 'Frequent Transactions', value: 'Current Account' },
  { label: 'Guaranteed Returns', value: 'Fixed Deposit' },
  { label: 'Monthly Savings Goal', value: 'Recurring Deposit' },
  { label: 'Foreign Currency Banking', value: 'FCY Account' },
];

export const idealAccountImage = {
  src: '/images/deposit-accounts/find-ideal-account.jpg',
  alt: 'A woman farmer smiling with children in a wheat field',
};
