import type { ComponentType, SVGProps } from 'react';

import {
  HeadsetIcon,
  SecurityShieldIcon,
  SignalIcon,
  WorldwideIcon,
} from '@/components/icons';

export type CardTrustBadge = {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  label: string;
};

export const cardTrustBadges: CardTrustBadge[] = [
  { icon: WorldwideIcon, label: 'VISA · Worldwide' },
  { icon: SecurityShieldIcon, label: 'NepalPay · Nepal & India' },
  { icon: SignalIcon, label: 'Contactless Tap-to-Pay' },
  { icon: HeadsetIcon, label: '24/7 Card Support' },
];
