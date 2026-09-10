import { icon } from '@/components/icons';

import type { ComponentType, SVGProps } from 'react';

export const iconMap: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  calculator: icon.calculator,
  'atm-machine': icon.atmMachine,
  feedback: icon.feedback,
  partnership: icon.partnership,
  'shield-check-badge': icon.shieldCheckBadge,
  bank: icon.bank,
  buildings: icon.buildings,
  devices: icon.devices,
  factory: icon.factory,
  growth: icon.growth,
  'money-bag': icon.moneyBag,
  'pie-chart': icon.pieChart,
  store: icon.store,
  heart: icon.heart,
  'map-pin': icon.mapPin,
  'shield-check': icon.shieldCheck,
  'speed-clock': icon.speedClock,
};
