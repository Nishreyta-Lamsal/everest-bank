export type ProductInterestSegment = {
  label: string;
  percentage: number;
  color: string;
};

export const productInterestTotal = {
  value: '9',
  label: 'products',
};

export const productInterestSegments: ProductInterestSegment[] = [
  { label: 'Loans', percentage: 42, color: '#0787ff' },
  { label: 'Accounts', percentage: 26, color: '#0b9487' },
  { label: 'Cards', percentage: 19, color: '#f59d0c' },
  { label: 'Remittance', percentage: 13, color: '#a855f7' },
];

export type TrafficSource = {
  id: string;
  label: string;
  percentageLabel: string;
  color: string;
};

export const trafficSources: TrafficSource[] = [
  {
    id: 'organic-search',
    label: 'Organic search',
    percentageLabel: '55.6%',
    color: '#0787ff',
  },
  { id: 'direct', label: 'Direct', percentageLabel: '28%', color: '#003bd7' },
  { id: 'social', label: 'Social', percentageLabel: '12%', color: '#76cdff' },
  {
    id: 'referral',
    label: 'Referral',
    percentageLabel: '4.2%',
    color: '#d1ecff',
  },
  {
    id: 'campaigns',
    label: 'Campaigns',
    percentageLabel: '4.2%',
    color: '#d1ecff',
  },
];
