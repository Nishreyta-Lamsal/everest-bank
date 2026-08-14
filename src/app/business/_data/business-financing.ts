export type BusinessFinancingContentCard = {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  linkLabel: string;
  href: string;
};

export const businessFinancingContentCards: BusinessFinancingContentCard[] = [
  {
    title: 'Keep Operations Moving',
    description:
      'Flexible working capital solutions designed to support daily operations, inventory purchases, and cash flow needs.',
    image: '/images/business/working-capital.png',
    imageAlt: 'A warehouse worker checking inventory on the phone',
    linkLabel: 'Explore working capital',
    href: '#',
  },
  {
    title: 'Trade Beyond Borders',
    description:
      'Simplify imports and exports with trade finance solutions, letters of credit, and bank guarantees.',
    image: '/images/business/trade-finance.png',
    imageAlt: 'A tea picker harvesting leaves for export',
    linkLabel: 'Explore trade finance',
    href: '#',
  },
];

export type BusinessFinancingMediaCard = {
  label: string;
  image: string;
  imageAlt: string;
  href: string;
};

export const businessFinancingMediaCard: BusinessFinancingMediaCard = {
  label: 'SME Banking',
  image: '/images/business/sme-banking.png',
  imageAlt: 'A merchant carrying handwoven rugs to market',
  href: '#',
};
