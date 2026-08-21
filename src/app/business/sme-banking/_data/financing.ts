export type FinancingRow = {
  stage: string;
  solution: string;
};

export const financingRows: FinancingRow[] = [
  { stage: 'Starting a Business', solution: 'Business Account' },
  { stage: 'Growing Operations', solution: 'Working Capital Finance' },
  { stage: 'Expanding Business', solution: 'SME Loan' },
  { stage: 'Accepting Payments', solution: 'Merchant Solutions' },
  { stage: 'Trading Internationally', solution: 'Trade Finance' },
];

export const financingImage = {
  src: '/images/business/sme-right-financing.png',
  alt: 'A woman farmer smiling with children in a wheat field, representing an SME business Everest Bank supports',
};
