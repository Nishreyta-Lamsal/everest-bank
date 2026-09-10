export type ProductsListStatus = 'published' | 'draft';

export type ProductsListEntry = {
  id: string;
  title: string;
  path: string;
  updatedLabel: string;
  sectionsCount?: number;
  rateLabel?: string;
  status: ProductsListStatus;
};

export const productsListEntries: ProductsListEntry[] = [
  {
    id: 'everest-agriculture-loan',
    title: 'Everest Agriculture Loan',
    path: '/loans/agriculture',
    updatedLabel: 'updated 2 days ago',
    rateLabel: 'From 8%',
    status: 'published',
  },
  {
    id: 'everest-home-loan',
    title: 'Everest Home Loan',
    path: '/loans/home',
    updatedLabel: 'updated 1 week ago',
    rateLabel: 'From 7.5%',
    status: 'published',
  },
  {
    id: 'everest-personal-loan',
    title: 'Everest Personal Loan',
    path: '/',
    updatedLabel: 'updated 2 days ago',
    sectionsCount: 10,
    status: 'published',
  },
  {
    id: 'remittance',
    title: 'Remittance',
    path: '/',
    updatedLabel: 'updated 2 days ago',
    sectionsCount: 10,
    status: 'published',
  },
  {
    id: 'about-us',
    title: 'About Us',
    path: '/',
    updatedLabel: 'updated 2 days ago',
    sectionsCount: 10,
    status: 'published',
  },
  {
    id: 'atm-branch-locator',
    title: 'ATM / Branch Locator',
    path: '/',
    updatedLabel: 'updated 2 days ago',
    sectionsCount: 10,
    status: 'published',
  },
  {
    id: 'payout-locations',
    title: 'Payout Locations',
    path: '/remittance/payout-locations',
    updatedLabel: 'updated yesterday',
    sectionsCount: 4,
    status: 'draft',
  },
];
