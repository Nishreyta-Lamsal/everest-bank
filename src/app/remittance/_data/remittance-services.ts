import type { ComponentType, SVGProps } from 'react';

import { icon } from '@/components/icons';

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
    icon: icon.bank,
  },
  {
    title: 'Indo-Nepal Remittance',
    subtitle: 'Send money from India',
    href: '#',
    icon: icon.bank,
  },
  {
    title: 'Outward Remit',
    subtitle: 'Transfer from Nepal',
    href: '#',
    icon: icon.bank,
  },
  {
    title: 'Payout Locations',
    subtitle: 'Find a payout location',
    href: ROUTE.PAYOUT_LOCATIONS,
    icon: icon.bank,
  },
  {
    title: 'Bank Representatives',
    subtitle: 'View representatives',
    href: '#',
    icon: icon.bank,
  },
  {
    title: 'Correspondent Banks',
    subtitle: 'View corresponding banks',
    href: '#',
    icon: icon.bank,
  },
];
