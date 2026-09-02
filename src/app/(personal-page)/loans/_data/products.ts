import { ROUTE } from '@/constants';

import type { ProductListEntry } from '@/types';

export const loanProducts: ProductListEntry[] = [
  {
    index: '01',
    title: 'Retail Loans',
    description:
      'Finance a home, a vehicle, or personal plans with flexible repayment terms.',
    href: `${ROUTE.LOANS}/retail-loans`,
  },
  {
    index: '02',
    title: 'Corporate Loans',
    description:
      'Fund large scale investments and expansion with tailored corporate financing.',
    href: '#',
  },
  {
    index: '03',
    title: 'Agriculture Loans',
    description:
      'Support farming, livestock, and agribusiness with seasonal repayment options.',
    href: `${ROUTE.LOANS}/agricultural-loans`,
  },
  {
    index: '04',
    title: 'Deprived Sector Loans',
    description:
      'Concessional lending that widens access to credit for underserved communities.',
    href: '#',
  },
  {
    index: '05',
    title: 'Loan Against Fixed Deposit',
    description:
      'Borrow against your fixed deposit without breaking it or losing your returns.',
    href: '#',
  },
];

export const loanProductsImage = {
  src: '/images/loans/loan-services-products.png',
  alt: 'A shopkeeper standing behind the counter of his grocery store',
};
