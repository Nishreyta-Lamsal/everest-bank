import type { ComponentType, SVGProps } from 'react';

import { PartnershipIcon, ShieldCheckBadgeIcon } from '@/components/icons';

export const remittanceTrustAvatars: string[] = [
  '/images/csr/customer-avatar-1.png',
  '/images/csr/customer-avatar-2.png',
  '/images/csr/customer-avatar-3.png',
  '/images/csr/customer-avatar-4.png',
];

export const remittanceTrustImage = {
  src: '/images/remittance/formal-channel-counter.png',
  alt: 'A bank teller handing cash to a customer at the counter',
};

export type RemittanceTrustCard = {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  title: string;
  linkLabel: string;
  href: string;
};

export const remittanceTrustCards: RemittanceTrustCard[] = [
  {
    icon: ShieldCheckBadgeIcon,
    title: 'Safe & Formal Channel',
    linkLabel: 'Apply now',
    href: '#',
  },
  {
    icon: PartnershipIcon,
    title: 'Backed by Punjab National Bank',
    linkLabel: 'Read More about Punjab National Bank',
    href: '#',
  },
];
