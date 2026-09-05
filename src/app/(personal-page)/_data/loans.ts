import { ROUTE } from '@/constants';

export type LoanCard = {
  title: string;
  href: string;
  image: string;
};

export const loanCards: LoanCard[] = [
  {
    title: 'Making Your Dream Home More Attainable',
    href: ROUTE.LOANS,
    image: '/images/loans/home-loan.png',
  },
  {
    title: 'Simple Financing Solutions For Everyday Goals',
    href: ROUTE.LOANS,
    image: '/images/loans/personal-loan.png',
  },
  {
    title: 'Drive Forward With Smarter Financial Support',
    href: ROUTE.LOANS,
    image: '/images/loans/auto-loan.png',
  },
];
