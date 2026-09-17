import { icon } from '@/components/icons';

import { ROUTE } from '@/constants/route';

import type {
  MainNavItem,
  MegaMenu,
  MegaMenuColumn,
  UtilityNavItem,
} from '@/types';

export const utilityNavItems: UtilityNavItem[] = [
  { label: 'Notice', href: ROUTE.NOTICE, icon: icon.bell },
  {
    label: 'Auction Notice',
    href: ROUTE.AUCTION_NOTICE,
    icon: icon.gavel,
  },
  { label: 'Calendar 2026', href: '#', icon: icon.calendar },
  { label: 'Forex Rates', href: ROUTE.FOREX_RATES, icon: icon.trendingUp },
  { label: 'Cyber Security', href: '#', icon: icon.shieldCheck },
  { label: 'ATM/Branch', href: ROUTE.ATM, icon: icon.mapPin },
  { label: 'English', href: '#', icon: icon.language },
];

const personalMegaMenuColumns: MegaMenuColumn[] = [
  {
    label: 'Accounts',
    icon: 'people',
    links: [
      { label: 'Savings Account', href: ROUTE.SAVING_ACCOUNT },
      { label: 'FCY Deposit Account', href: '#' },
      { label: 'Fixed Deposit Account', href: '#' },
      { label: 'Recurring Deposit Accounts', href: '#' },
    ],
    explore: {
      label: 'Explore Deposit Accounts',
      href: ROUTE.DEPOSIT_ACCOUNTS,
    },
  },
  {
    label: 'Cards',
    icon: 'card-stack',
    links: [
      { label: 'Virtual Credit Card', href: '#' },
      { label: 'Debit Card', href: '#' },
      { label: 'Prepaid Dollar Travel Card', href: '#' },
      { label: 'Prepaid Dollar E-Com Card', href: '#' },
      { label: 'Security Tips for E-Commerce', href: '#' },
    ],
    explore: { label: 'Explore Cards', href: ROUTE.CARDS },
  },
  {
    label: 'Loans',
    icon: 'card-stack',
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
    explore: { label: 'Explore Loan Services', href: ROUTE.LOANS },
  },
  {
    label: 'Digital Banking',
    icon: 'card-stack',
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
    icon: 'card-stack',
    links: [
      { label: 'Shares', href: '#' },
      { label: 'ASBA / C-ASBA', href: '#' },
    ],
  },
  {
    label: 'Services',
    icon: 'card-stack',
    links: [
      { label: 'Everyday banking', href: '#' },
      { label: 'Tools', href: ROUTE.TOOLS },
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
    icon: 'store',
    links: [
      { label: 'SME Loans', href: '#' },
      { label: 'Working Capital', href: '#' },
    ],
    explore: { label: 'Explore SME Banking', href: ROUTE.SME_BANKING },
  },
  {
    label: 'Corporate Banking',
    icon: 'buildings',
    links: [
      { label: 'Corporate Loans', href: '#' },
      { label: 'Accounts', href: '#' },
      { label: 'Treasury', href: '#' },
    ],
  },
  {
    label: 'Trade and Government',
    icon: 'court',
    links: [
      { label: 'Trade Finance', href: '#' },
      { label: 'Government Business', href: '#' },
      { label: 'Tax Collection', href: '#' },
    ],
  },
  {
    label: 'Payment Solutions',
    icon: 'card',
    links: [
      { label: 'Corporate Pay', href: '#' },
      { label: 'Merchant QR', href: '#' },
      { label: 'Payroll', href: '#' },
      { label: 'QR Soundbox', href: '#' },
    ],
  },
  {
    label: 'Services',
    icon: 'card-stack',
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
    icon: 'transfer',
    links: [
      { label: 'Outward Remittance', href: '#' },
      { label: 'Student Payments', href: '#' },
      { label: 'Travel Payments', href: '#' },
    ],
  },
  {
    label: 'Receive Money',
    icon: 'money-bag',
    links: [
      { label: 'Inward Remittance', href: '#' },
      { label: 'Indo-Nepal Remittance', href: '#' },
    ],
  },
  {
    label: 'Locations',
    icon: 'map-pin',
    links: [
      { label: 'Payout Locations', href: ROUTE.PAYOUT_LOCATIONS },
      { label: 'Representatives Worldwide', href: '#' },
    ],
  },
  {
    label: 'Digital',
    icon: 'smartphone',
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
    icon: 'bank',
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
      { label: 'Branch Network', href: ROUTE.BRANCHES },
    ],
    explore: { label: 'Explore About Everest', href: ROUTE.ABOUT },
  },
  {
    label: 'Investor Relations',
    icon: 'pie-chart',
    links: [
      { label: 'Annual & Quarterly Reports', href: '#' },
      { label: 'Capital Adequacy', href: '#' },
      { label: 'AGM', href: '#' },
    ],
  },
  {
    label: 'Media and Updates',
    icon: 'bell',
    links: [
      { label: 'News', href: '#' },
      { label: 'Notices', href: ROUTE.NOTICE },
      { label: 'Awards', href: '#' },
    ],
  },
  {
    label: 'Careers and CSR',
    icon: 'heart',
    links: [
      { label: 'Careers', href: '#' },
      { label: 'CSR', href: '#' },
    ],
    explore: { label: 'Explore Careers and CSR', href: '#' },
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
    icon: 'people',
    activePrefixes: [ROUTE.CARDS, ROUTE.LOANS, ROUTE.DEPOSIT_ACCOUNTS],
    megaMenu: personalMegaMenu,
  },
  {
    label: 'Business',
    href: ROUTE.BUSINESS,
    icon: 'briefcase',
    megaMenu: businessMegaMenu,
  },
  {
    label: 'Remittance',
    href: ROUTE.REMITTANCE,
    icon: 'banknote',
    megaMenu: remittanceMegaMenu,
  },
  {
    label: 'About',
    href: ROUTE.ABOUT,
    icon: 'bank',
    megaMenu: aboutMegaMenu,
  },
];
