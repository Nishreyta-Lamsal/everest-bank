export type PagesListStatus = 'published' | 'draft';

export type PagesListEntry = {
  id: string;
  title: string;
  path: string;
  sectionsCount: number;
  updatedLabel: string;
  status: PagesListStatus;
};

export const pagesListEntries: PagesListEntry[] = [
  {
    id: 'personal-banking',
    title: 'Personal Banking',
    path: '/',
    sectionsCount: 10,
    updatedLabel: 'updated 2 days ago',
    status: 'published',
  },
  {
    id: 'business-banking',
    title: 'Business Banking',
    path: '/business',
    sectionsCount: 7,
    updatedLabel: 'updated 1 week ago',
    status: 'published',
  },
  {
    id: 'sme-banking',
    title: 'SME Banking',
    path: '/',
    sectionsCount: 10,
    updatedLabel: 'updated 2 days ago',
    status: 'published',
  },
  {
    id: 'remittance',
    title: 'Remittance',
    path: '/',
    sectionsCount: 10,
    updatedLabel: 'updated 2 days ago',
    status: 'published',
  },
  {
    id: 'about-us',
    title: 'About Us',
    path: '/',
    sectionsCount: 10,
    updatedLabel: 'updated 2 days ago',
    status: 'published',
  },
  {
    id: 'atm-branch-locator',
    title: 'ATM / Branch Locator',
    path: '/',
    sectionsCount: 10,
    updatedLabel: 'updated 2 days ago',
    status: 'published',
  },
  {
    id: 'payout-locations',
    title: 'Payout Locations',
    path: '/remittance/payout-locations',
    sectionsCount: 4,
    updatedLabel: 'updated yesterday',
    status: 'draft',
  },
];
