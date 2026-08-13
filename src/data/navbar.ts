import type { ComponentType, SVGProps } from 'react';

import {
  BankIcon,
  BanknoteIcon,
  BellIcon,
  BriefcaseIcon,
  CalendarIcon,
  CardStackIcon,
  GavelIcon,
  LanguageIcon,
  MapPinIcon,
  PeopleIcon,
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
  icon: ComponentType<SVGProps<SVGSVGElement>>;
};

export const mainNavItems: MainNavItem[] = [
  { label: 'Personal', href: '#', icon: PeopleIcon },
  { label: 'Business', href: '#', icon: BriefcaseIcon },
  { label: 'Remittance', href: '#', icon: BanknoteIcon },
  { label: 'About', href: '#', icon: BankIcon },
];

export type PersonalMenuLink = {
  label: string;
  href: string;
};

export type PersonalMenuColumn = {
  label: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  links: PersonalMenuLink[];
};

export const personalMenuColumns: PersonalMenuColumn[] = [
  {
    label: 'Accounts',
    icon: PeopleIcon,
    links: [
      { label: 'Savings Account', href: '#' },
      { label: 'FCY Deposit Account', href: '#' },
      { label: 'Fixed Deposite Account', href: '#' },
      { label: 'Recurring Deposit Accounts', href: '#' },
    ],
  },
  {
    label: 'Cards',
    icon: CardStackIcon,
    links: [
      { label: 'Virtual Credit Card', href: '#' },
      { label: 'Debit Card', href: '#' },
      { label: 'Prepaid Dollar Travel Card', href: '#' },
      { label: 'Prepaid Dollar E-Com Card', href: '#' },
      { label: 'Security Tips for E-Commerce', href: '#' },
    ],
  },
  {
    label: 'Loans',
    icon: CardStackIcon,
    links: [
      { label: 'Home Loans', href: '#' },
      { label: 'Personal Loans', href: '#' },
      { label: 'Education Loans', href: '#' },
      { label: 'Vehicle Loans', href: '#' },
      { label: 'Retail Loans', href: '#' },
    ],
  },
  {
    label: 'Digital Banking',
    icon: CardStackIcon,
    links: [
      { label: 'Mobile Banking', href: '#' },
      { label: 'Internet Banking', href: '#' },
      { label: 'QR Payment', href: '#' },
      { label: 'Connect IPS', href: '#' },
      { label: 'e-statement', href: '#' },
    ],
  },
  {
    label: 'Investments',
    icon: CardStackIcon,
    links: [
      { label: 'Shares', href: '#' },
      { label: 'ASBA / C-ASBA', href: '#' },
    ],
  },
  {
    label: 'Services',
    icon: CardStackIcon,
    links: [
      { label: 'Everyday banking', href: '#' },
      { label: 'Tools', href: '#' },
      { label: 'Security', href: '#' },
    ],
  },
];
