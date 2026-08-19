import type { ComponentType, SVGProps } from 'react';

import {
  HeartIcon,
  MapPinIcon,
  ShieldCheckIcon,
  SpeedClockIcon,
} from '@/components/icons';

export type OpenAccountFeature = {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  label: string;
};

export const remittanceOpenAccountFeatures: OpenAccountFeature[] = [
  {
    icon: SpeedClockIcon,
    label: 'Quick account opening process',
  },
  {
    icon: MapPinIcon,
    label: 'Nationwide network',
  },
  {
    icon: ShieldCheckIcon,
    label: 'Secure digital access',
  },
  {
    icon: HeartIcon,
    label: 'Decades of trust',
  },
];

export const remittanceOpenAccountImage = {
  src: '/images/remittance/open-account-banner.png',
  alt: 'Everest Bank Limited signage above the head office entrance',
};
