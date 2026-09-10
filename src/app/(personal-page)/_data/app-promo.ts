import type { ComponentType, SVGProps } from 'react';

import { icon } from '@/components/icons';

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
    icon: icon.calculator,
  },
  {
    label: 'ATM & Branches',
    href: ROUTE.ATM,
    icon: icon.atmMachine,
  },
  {
    label: 'Give Feedbacks',
    href: '#',
    icon: icon.feedback,
  },
];
