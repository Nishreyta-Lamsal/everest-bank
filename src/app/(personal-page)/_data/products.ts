import type { ComponentType, SVGProps } from 'react';

import {
  ArrowUpRightSquareIcon,
  BankIcon,
  CardIcon,
  PiggyBankIcon,
  SafeIcon,
  SmartphoneIcon,
  TransferIcon,
} from '@/components/icons';

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
    icon: ArrowUpRightSquareIcon,
  },
  {
    title: 'Personal Loans',
    subtitle: 'Home · Auto · Personal',
    href: ROUTE.LOANS,
    icon: BankIcon,
  },
  {
    title: 'Mobile Banking',
    subtitle: 'EBL Mobile · 2.5M Users',
    href: '#',
    icon: SmartphoneIcon,
  },
];

export const bottomProductCards: ProductCardData[] = [
  {
    title: 'Money Transfer',
    subtitle: 'Send & Receive Instantly',
    href: ROUTE.REMITTANCE,
    icon: TransferIcon,
  },
  {
    title: 'Cards',
    subtitle: 'Debit · Credit · Premium',
    href: ROUTE.CARDS,
    icon: CardIcon,
  },
  {
    title: 'Fixed Deposits',
    subtitle: 'Grow Savings, Better Returns',
    href: ROUTE.DEPOSIT_ACCOUNTS,
    icon: SafeIcon,
  },
  {
    title: 'Investments',
    subtitle: 'ASBA · Demat · IPO Services',
    href: '#',
    icon: PiggyBankIcon,
  },
];
