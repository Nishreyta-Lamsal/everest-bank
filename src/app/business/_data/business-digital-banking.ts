import type { ComponentType, SVGProps } from 'react';

import { DevicesIcon, MoneyBagIcon, StoreIcon } from '@/components/icons';

export type DigitalBankingFeature = {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  label: string;
};

export const digitalBankingFeatures: DigitalBankingFeature[] = [
  { icon: DevicesIcon, label: 'Corporate Internet Banking' },
  { icon: MoneyBagIcon, label: 'Corporate Pay' },
  { icon: StoreIcon, label: 'Merchant Solutions' },
];
