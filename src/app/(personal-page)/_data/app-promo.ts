import type { ComponentType, SVGProps } from 'react';

import {
  AtmMachineIcon,
  CalculatorIcon,
  FeedbackIcon,
} from '@/components/icons';

import { ROUTE } from '@/constants';

export type ActionBadge = {
  label: string;
  href: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
};

export const actionBadges: ActionBadge[] = [
  {
    label: 'EMI CALCULATOR',
    href: ROUTE.EMI_CALCULATOR,
    icon: CalculatorIcon,
  },
  {
    label: 'ATM & Branches',
    href: ROUTE.ATM,
    icon: AtmMachineIcon,
  },
  {
    label: 'Give Feedbacks',
    href: '#',
    icon: FeedbackIcon,
  },
];
