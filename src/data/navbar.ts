import type { ComponentType, SVGProps } from 'react';

import {
  BellIcon,
  CalendarIcon,
  GavelIcon,
  LanguageIcon,
  MapPinIcon,
  ShieldCheckIcon,
  TrendingUpIcon,
} from '@/components/icons';

export type UtilityNavItem = {
  label: string;
  href: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
};

export const utilityNavItems: UtilityNavItem[] = [
  { label: 'Notice', href: '#', icon: BellIcon },
  { label: 'Auction Notice', href: '#', icon: GavelIcon },
  { label: 'Calendar 2026', href: '#', icon: CalendarIcon },
  { label: 'Forex Rates', href: '#', icon: TrendingUpIcon },
  { label: 'Cyber Security', href: '#', icon: ShieldCheckIcon },
  { label: 'ATM/Branch', href: '#', icon: MapPinIcon },
  { label: 'English', href: '#', icon: LanguageIcon },
];

export type MainNavItem = {
  label: string;
  href: string;
};

export const mainNavItems: MainNavItem[] = [
  { label: 'Personal', href: '#' },
  { label: 'Business', href: '#' },
  { label: 'Remittance', href: '#' },
  { label: 'About', href: '#' },
];
