import type { RecommendationRow } from '@/types';

export const idealLoanRows: RecommendationRow[] = [
  { label: 'Buy a Home', value: 'Retail Loan' },
  { label: 'Purchase a Vehicle', value: 'Retail Loan' },
  { label: 'Expand a Business', value: 'SME Loan' },
  { label: 'Large Scale Business Investment', value: 'Corporate Loan' },
  { label: 'Agricultural Development', value: 'Agriculture Loan' },
  {
    label: 'Quick Financing Against Deposits',
    value: 'Loan Against Fixed Deposit',
  },
];

export const idealLoanImage = {
  src: '/images/loans/find-ideal-loan.jpg',
  alt: 'A woman farmer smiling with children in a wheat field',
};
