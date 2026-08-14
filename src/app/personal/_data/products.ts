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
    href: '#',
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
    href: '#',
    icon: TransferIcon,
  },
  {
    title: 'Cards',
    subtitle: 'Debit · Credit · Premium',
    href: '#',
    icon: CardIcon,
  },
  {
    title: 'Fixed Deposits',
    subtitle: 'Grow Savings, Better Returns',
    href: '#',
    icon: SafeIcon,
  },
  {
    title: 'Investments',
    subtitle: 'ASBA · Demat · IPO Services',
    href: '#',
    icon: PiggyBankIcon,
  },
];
