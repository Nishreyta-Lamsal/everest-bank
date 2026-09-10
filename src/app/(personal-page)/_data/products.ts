import type { ComponentType, SVGProps } from 'react';

import { icon } from '@/components/icons';

import { ROUTE } from '@/constants';

export type ProductCardData = {
  title: string;
  subtitle: string;
  href: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
};

export const topProductCards: ProductCardData[] = [
  {
    title: 'Open Account',
    subtitle: 'Only in 3 minutes',
    href: '#',
    icon: icon.arrowUpRightSquare,
  },
  {
    title: 'Personal Loans',
    subtitle: 'Home · Auto · Personal',
    href: ROUTE.LOANS,
    icon: icon.bank,
  },
  {
    title: 'Mobile Banking',
    subtitle: 'EBL Mobile · 2.5M Users',
    href: '#',
    icon: icon.smartphone,
  },
];

export const bottomProductCards: ProductCardData[] = [
  {
    title: 'Money Transfer',
    subtitle: 'Send & Receive Instantly',
    href: ROUTE.REMITTANCE,
    icon: icon.transfer,
  },
  {
    title: 'Cards',
    subtitle: 'Debit · Credit · Premium',
    href: ROUTE.CARDS,
    icon: icon.card,
  },
  {
    title: 'Fixed Deposits',
    subtitle: 'Grow Savings, Better Returns',
    href: ROUTE.DEPOSIT_ACCOUNTS,
    icon: icon.safe,
  },
  {
    title: 'Investments',
    subtitle: 'ASBA · Demat · IPO Services',
    href: '#',
    icon: icon.piggyBank,
  },
];
