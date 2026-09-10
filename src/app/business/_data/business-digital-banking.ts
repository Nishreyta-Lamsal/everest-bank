import type { ComponentType, SVGProps } from 'react';

import { icon } from '@/components/icons';

export type DigitalBankingFeature = {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  label: string;
};

export const digitalBankingFeatures: DigitalBankingFeature[] = [
  { icon: icon.devices, label: 'Corporate Internet Banking' },
  { icon: icon.moneyBag, label: 'Corporate Pay' },
  { icon: icon.store, label: 'Merchant Solutions' },
];
