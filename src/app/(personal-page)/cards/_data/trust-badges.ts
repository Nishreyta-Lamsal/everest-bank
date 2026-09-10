import type { ComponentType, SVGProps } from 'react';

import { icon } from '@/components/icons';

export type CardTrustBadge = {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  label: string;
};

export const cardTrustBadges: CardTrustBadge[] = [
  { icon: icon.worldwide, label: 'VISA · Worldwide' },
  { icon: icon.securityShield, label: 'NepalPay · Nepal & India' },
  { icon: icon.signal, label: 'Contactless Tap-to-Pay' },
  { icon: icon.headset, label: '24/7 Card Support' },
];
