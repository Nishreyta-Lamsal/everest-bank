import {
  BankIcon,
  BanknoteIcon,
  BellIcon,
  BriefcaseIcon,
  BuildingsIcon,
  CalendarIcon,
  CardIcon,
  CardStackIcon,
  CourtIcon,
  GavelIcon,
  HeartIcon,
  LanguageIcon,
  MapPinIcon,
  MoneyBagIcon,
  PeopleIcon,
  PieChartIcon,
  ShieldCheckIcon,
  SmartphoneIcon,
  StoreIcon,
  TransferIcon,
  TrendingUpIcon,
} from '@/components/icons';

import { ROUTE } from '@/constants/route';

import type {
  MainNavItem,
  MegaMenu,
  MegaMenuColumn,
  UtilityNavItem,
} from '@/types';

export const utilityNavItems: UtilityNavItem[] = [
  { label: 'Notice', href: '#', icon: BellIcon },
  { label: 'Auction Notice', href: '#', icon: GavelIcon },
  { label: 'Calendar 2026', href: '#', icon: CalendarIcon },
  { label: 'Forex Rates', href: '#', icon: TrendingUpIcon },
  { label: 'Cyber Security', href: '#', icon: ShieldCheckIcon },
  { label: 'ATM/Branch', href: '#', icon: MapPinIcon },
  { label: 'English', href: '#', icon: LanguageIcon },
];

const personalMegaMenuColumns: MegaMenuColumn[] = [
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
    href: ROUTE.CARDS,
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
      { label: 'Home Loans', href: `${ROUTE.LOANS}/home-loans` },
      {
        label: 'Agricultural Loans',
        href: `${ROUTE.LOANS}/agricultural-loans`,
      },
      { label: 'Education Loans', href: `${ROUTE.LOANS}/education-loans` },
      { label: 'Vehicle Loans', href: `${ROUTE.LOANS}/vehicle-loans` },
      { label: 'Retail Loans', href: `${ROUTE.LOANS}/retail-loans` },
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

const personalMegaMenu: MegaMenu = {
  columns: personalMegaMenuColumns,
  cta: { label: 'Apply for your visa card', href: '#' },
};

const businessMegaMenuColumns: MegaMenuColumn[] = [
  {
    label: 'SME Banking',
    href: ROUTE.SME_BANKING,
    icon: StoreIcon,
    links: [
      { label: 'SME Loans', href: '#' },
      { label: 'Working Capital', href: '#' },
    ],
  },
  {
    label: 'Corporate Banking',
    icon: BuildingsIcon,
    links: [
      { label: 'Corporate Loans', href: '#' },
      { label: 'Accounts', href: '#' },
      { label: 'Treasury', href: '#' },
    ],
  },
  {
    label: 'Trade and Government',
    icon: CourtIcon,
    links: [
      { label: 'Trade Finance', href: '#' },
      { label: 'Government Business', href: '#' },
      { label: 'Tax Collection', href: '#' },
    ],
  },
  {
    label: 'Payment Solutions',
    icon: CardIcon,
    links: [
      { label: 'Corporate Pay', href: '#' },
      { label: 'Merchant QR', href: '#' },
      { label: 'Payroll', href: '#' },
      { label: 'QR Soundbox', href: '#' },
    ],
  },
  {
    label: 'Services',
    icon: CardStackIcon,
    links: [
      { label: 'Digital Business Banking', href: '#' },
      { label: 'Resources', href: '#' },
    ],
  },
];

const businessMegaMenu: MegaMenu = {
  columns: businessMegaMenuColumns,
  cta: { label: 'Apply for a business loan', href: '#' },
};

const remittanceMegaMenuColumns: MegaMenuColumn[] = [
  {
    label: 'Send Money',
    icon: TransferIcon,
    links: [
      { label: 'Outward Remittance', href: '#' },
      { label: 'Student Payments', href: '#' },
      { label: 'Travel Payments', href: '#' },
    ],
  },
  {
    label: 'Receive Money',
    icon: MoneyBagIcon,
    links: [
      { label: 'Inward Remittance', href: '#' },
      { label: 'Indo-Nepal Remittance', href: '#' },
    ],
  },
  {
    label: 'Locations',
    icon: MapPinIcon,
    links: [
      { label: 'Payout Locations', href: ROUTE.PAYOUT_LOCATIONS },
      { label: 'Representatives Worldwide', href: '#' },
    ],
  },
  {
    label: 'Digital',
    icon: SmartphoneIcon,
    links: [{ label: 'Online Remittance Portal', href: '#' }],
  },
];

const remittanceMegaMenu: MegaMenu = {
  columns: remittanceMegaMenuColumns,
  cta: { label: 'Find a payout location', href: ROUTE.PAYOUT_LOCATIONS },
};

const aboutMegaMenuColumns: MegaMenuColumn[] = [
  {
    label: 'About Everest',
    href: ROUTE.ABOUT,
    icon: BankIcon,
    links: [
      { label: 'Profile', href: ROUTE.ABOUT_PROFILE },
      {
        label: 'Corporate Mission and Vision',
        href: ROUTE.ABOUT_CORPORATE_MISSION_AND_VISION,
      },
      {
        label: 'Organization Structure',
        href: ROUTE.ABOUT_ORGANIZATION_STRUCTURE,
      },
      { label: 'Board of Directors', href: ROUTE.ABOUT_BOARD_OF_DIRECTORS },
      { label: 'Branch Network', href: '#' },
    ],
  },
  {
    label: 'Investor Relations',
    icon: PieChartIcon,
    links: [
      { label: 'Annual & Quarterly Reports', href: '#' },
      { label: 'Capital Adequacy', href: '#' },
      { label: 'AGM', href: '#' },
    ],
  },
  {
    label: 'Media and Updates',
    icon: BellIcon,
    links: [
      { label: 'News', href: '#' },
      { label: 'Notices', href: '#' },
      { label: 'Awards', href: '#' },
    ],
  },
  {
    label: 'Careers and CSR',
    href: '#',
    icon: HeartIcon,
    links: [
      { label: 'Careers', href: '#' },
      { label: 'CSR', href: '#' },
    ],
  },
];

const aboutMegaMenu: MegaMenu = {
  columns: aboutMegaMenuColumns,
  cta: { label: 'Explore careers at Everest', href: '#' },
};

export const mainNavItems: MainNavItem[] = [
  {
    label: 'Personal',
    href: ROUTE.PERSONAL,
    icon: PeopleIcon,
    activePrefixes: [ROUTE.CARDS, ROUTE.LOANS],
    megaMenu: personalMegaMenu,
  },
  {
    label: 'Business',
    href: ROUTE.BUSINESS,
    icon: BriefcaseIcon,
    megaMenu: businessMegaMenu,
  },
  {
    label: 'Remittance',
    href: ROUTE.REMITTANCE,
    icon: BanknoteIcon,
    megaMenu: remittanceMegaMenu,
  },
  {
    label: 'About',
    href: ROUTE.ABOUT,
    icon: BankIcon,
    megaMenu: aboutMegaMenu,
  },
];
