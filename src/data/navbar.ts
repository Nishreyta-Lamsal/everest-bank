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

import { ROUTE } from '@/constants/route';

import type { MainNavItem, PersonalMenuColumn, UtilityNavItem } from '@/types';

export const utilityNavItems: UtilityNavItem[] = [
  { label: 'Notice', href: '#', icon: BellIcon },
  { label: 'Auction Notice', href: '#', icon: GavelIcon },
  { label: 'Calendar 2026', href: '#', icon: CalendarIcon },
  { label: 'Forex Rates', href: '#', icon: TrendingUpIcon },
  { label: 'Cyber Security', href: '#', icon: ShieldCheckIcon },
  { label: 'ATM/Branch', href: '#', icon: MapPinIcon },
  { label: 'English', href: '#', icon: LanguageIcon },
];

export const mainNavItems: MainNavItem[] = [
  { label: 'Personal', href: ROUTE.PERSONAL_PAGE, icon: PeopleIcon },
  { label: 'Business', href: ROUTE.BUSINESS_PAGE, icon: BriefcaseIcon },
  { label: 'Remittance', href: ROUTE.REMITTANCE_PAGE, icon: BanknoteIcon },
  { label: 'About', href: ROUTE.ABOUT, icon: BankIcon },
];

export const personalMenuColumns: PersonalMenuColumn[] = [
  {
    label: 'Accounts',
    icon: PeopleIcon,
    links: [
      { label: 'Savings Account', href: '#' },
      { label: 'FCY Deposit Account', href: '#' },
      { label: 'Fixed Deposit Account', href: '#' },
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
