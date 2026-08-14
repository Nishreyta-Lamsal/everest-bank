import type { ComponentType, SVGProps } from 'react';

import { BankIcon } from '@/components/icons';

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
    icon: BankIcon,
  },
  {
    title: 'Business Financing',
    subtitle: 'SME · Working Capital · Expansion',
    href: '#',
    icon: BankIcon,
  },
  {
    title: 'Corporate Banking',
    subtitle: 'Structured Finance · Treasury',
    href: '#',
    icon: BankIcon,
  },
];

export const businessBottomProductCards: BusinessProductCardData[] = [
  {
    title: 'Merchant Solutions',
    subtitle: 'QR · POS · Online Payments',
    href: '#',
    icon: BankIcon,
  },
  {
    title: 'Trade Finance',
    subtitle: 'LC · Import & Export',
    href: '#',
    icon: BankIcon,
  },
  {
    title: 'C. Internet Banking',
    subtitle: 'Manage Business Anywhere',
    href: '#',
    icon: BankIcon,
  },
  {
    title: 'Government Banking',
    subtitle: 'Public Sector Solutions',
    href: '#',
    icon: BankIcon,
  },
];
