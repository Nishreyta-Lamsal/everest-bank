export type ForexRate = {
  id: string;
  currency: string;
  buy: string;
  sell: string;
};

export const forexRates: ForexRate[] = [
  { id: 'usd', currency: 'US Dollar', buy: '139.20', sell: '139.80' },
  { id: 'eur', currency: 'Euro', buy: '151.40', sell: '152.10' },
  { id: 'gbp', currency: 'UK Pound', buy: '176.80', sell: '177.60' },
  { id: 'inr', currency: 'Indian Rupee', buy: '160.00', sell: '160.15' },
  { id: 'aed', currency: 'UAE Dirham', buy: '37.85', sell: '38.05' },
  { id: 'aed-2', currency: 'UAE Dirham', buy: '37.85', sell: '38.05' },
  { id: 'sar', currency: 'Saudi Riyal', buy: '37.05', sell: '37.25' },
];
