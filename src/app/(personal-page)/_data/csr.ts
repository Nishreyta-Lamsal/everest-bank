import type { ComponentType, SVGProps } from 'react';

import { icon } from '@/components/icons';

export const csrCustomerAvatars: string[] = [
  '/images/csr/customer-avatar-1.png',
  '/images/csr/customer-avatar-2.png',
  '/images/csr/customer-avatar-3.png',
  '/images/csr/customer-avatar-4.png',
];

export type CsrCard = {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  title: string;
  linkLabel: string;
  href: string;
};

export const csrCards: CsrCard[] = [
  {
    icon: icon.shieldCheckBadge,
    title: 'Stay Safe In A Digital World',
    linkLabel: 'Apply now',
    href: '#',
  },
  {
    icon: icon.partnership,
    title: 'Joint Venture Partner',
    linkLabel: 'Read More about Punjab National Bank',
    href: '#',
  },
];
