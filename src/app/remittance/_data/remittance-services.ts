import type { ComponentType, SVGProps } from 'react';

import { BankIcon } from '@/components/icons';

import { ROUTE } from '@/constants';

export type RemittanceServiceCard = {
  title: string;
  subtitle: string;
  href: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
};

export const remittanceServiceCards: RemittanceServiceCard[] = [
  {
    title: 'Inward Remit',
    subtitle: 'Send money to Nepal',
    href: '#',
    icon: BankIcon,
  },
  {
    title: 'Indo-Nepal Remittance',
    subtitle: 'Send money from India',
    href: '#',
    icon: BankIcon,
  },
  {
    title: 'Outward Remit',
    subtitle: 'Transfer from Nepal',
    href: '#',
    icon: BankIcon,
  },
  {
    title: 'Payout Locations',
    subtitle: 'Find a payout location',
    href: ROUTE.PAYOUT_LOCATIONS,
    icon: BankIcon,
  },
  {
    title: 'Bank Representatives',
    subtitle: 'View representatives',
    href: '#',
    icon: BankIcon,
  },
  {
    title: 'Correspondent Banks',
    subtitle: 'View corresponding banks',
    href: '#',
    icon: BankIcon,
  },
];
