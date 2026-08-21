import type { ComponentType, SVGProps } from 'react';

import {
  AtmMachineIcon,
  CalculatorIcon,
  FeedbackIcon,
} from '@/components/icons';

export type ActionBadge = {
  label: string;
  href: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
};

export const actionBadges: ActionBadge[] = [
  {
    label: 'EMI CALCULATOR',
    href: '#',
    icon: CalculatorIcon,
  },
  {
    label: 'ATM & Branches',
    href: '#',
    icon: AtmMachineIcon,
  },
  {
    label: 'Give Feedbacks',
    href: '#',
    icon: FeedbackIcon,
  },
];
