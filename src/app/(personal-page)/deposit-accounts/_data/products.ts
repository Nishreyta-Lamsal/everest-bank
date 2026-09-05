import { ROUTE } from '@/constants';

import type { ProductListEntry } from '@/types';

export const depositProducts: ProductListEntry[] = [
  {
    index: '01',
    title: 'Savings Account',
    description: 'Save with flexibility and easy access to your money.',
    href: ROUTE.SAVING_ACCOUNT,
  },
  {
    index: '02',
    title: 'Current Account',
    description: 'Designed for businesses and frequent transactions.',
    href: '#',
  },
  {
    index: '03',
    title: 'Fixed Deposit Account',
    description: 'Grow your savings with guaranteed returns.',
    href: '#',
  },
  {
    index: '04',
    title: 'Recurring Deposit Account',
    description: 'Build your savings gradually.',
    href: '#',
  },
  {
    index: '05',
    title: 'FCY Deposit Account',
    description: 'Bank in major foreign currencies.',
    href: '#',
  },
];

export const depositProductsImage = {
  src: '/images/deposit-accounts/deposit-accounts-products.png',
  alt: 'A woman holding a piggy bank while standing in her living room',
};
