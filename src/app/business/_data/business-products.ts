import type { ComponentType, SVGProps } from 'react';

import { icon } from '@/components/icons';

export type BusinessProductCardData = {
  title: string;
  subtitle: string;
  href: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
};

export const businessTopProductCards: BusinessProductCardData[] = [
  {
    title: 'Open Business Acc.',
    subtitle: 'Current · Corporate · SME',
    href: '#',
    icon: icon.bank,
  },
  {
    title: 'Business Financing',
    subtitle: 'SME · Working Capital · Expansion',
    href: '#',
    icon: icon.bank,
  },
  {
    title: 'Corporate Banking',
    subtitle: 'Structured Finance · Treasury',
    href: '#',
    icon: icon.bank,
  },
];

export const businessBottomProductCards: BusinessProductCardData[] = [
  {
    title: 'Merchant Solutions',
    subtitle: 'QR · POS · Online Payments',
    href: '#',
    icon: icon.bank,
  },
  {
    title: 'Trade Finance',
    subtitle: 'LC · Import & Export',
    href: '#',
    icon: icon.bank,
  },
  {
    title: 'C. Internet Banking',
    subtitle: 'Manage Business Anywhere',
    href: '#',
    icon: icon.bank,
  },
  {
    title: 'Government Banking',
    subtitle: 'Public Sector Solutions',
    href: '#',
    icon: icon.bank,
  },
];
