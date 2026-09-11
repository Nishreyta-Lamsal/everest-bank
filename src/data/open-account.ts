import type { ComponentType, SVGProps } from 'react';

import { icon } from '@/components/icons';

export type OpenAccountFeature = {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  label: string;
};

export const openAccountFeatures: OpenAccountFeature[] = [
  {
    icon: icon.speedClock,
    label: 'Quick account opening process',
  },
  {
    icon: icon.mapPin,
    label: 'Nationwide network',
  },
  {
    icon: icon.shieldCheck,
    label: 'Secure digital access',
  },
  {
    icon: icon.heart,
    label: 'Decades of trust',
  },
];
