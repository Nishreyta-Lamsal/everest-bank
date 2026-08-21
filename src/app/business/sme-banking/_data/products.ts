export type SMEProduct = {
  index: string;
  title: string;
  description: string;
  href: string;
};

export const smeProducts: SMEProduct[] = [
  {
    index: '01',
    title: 'SME Loans',
    description:
      'Flexible financing designed to help businesses expand, invest, and achieve their growth goals.',
    href: '#',
  },
  {
    index: '02',
    title: 'Working Capital Finance',
    description:
      'Maintain healthy cash flow with financing solutions that support your daily business operations.',
    href: '#',
  },
  {
    index: '03',
    title: 'Merchant Solutions',
    description:
      'Accept digital payments securely with QR, POS, and merchant collection solutions.',
    href: '#',
  },
];
