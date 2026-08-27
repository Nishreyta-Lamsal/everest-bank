import type { ComponentType, SVGProps } from 'react';

import {
  AtmMachineIcon,
  CalculatorIcon,
  FeedbackIcon,
  PartnershipIcon,
  ShieldCheckBadgeIcon,
} from '@/components/icons';

export const iconMap: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  calculator: CalculatorIcon,
  'atm-machine': AtmMachineIcon,
  feedback: FeedbackIcon,
  partnership: PartnershipIcon,
  'shield-check-badge': ShieldCheckBadgeIcon,
};
