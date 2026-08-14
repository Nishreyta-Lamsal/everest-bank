export type LoanCard = {
  title: string;
  href: string;
  image: string;
  imageWidth?: number;
  imageHeight?: number;
  alt: string;
  zoomed?: boolean;
};

export const loanCards: LoanCard[] = [
  {
    title: 'Making Your Dream Home More Attainable',
    href: '#',
    image: '/images/loans/home-loan.png',
    imageWidth: 736,
    imageHeight: 1104,
    alt: 'A couple holding house keys in front of their new home',
    zoomed: true,
  },
  {
    title: 'Simple Financing Solutions For Everyday Goals',
    href: '#',
    image: '/images/loans/personal-loan.png',
    alt: 'A family relaxing together at home',
  },
  {
    title: 'Drive Forward With Smarter Financial Support',
    href: '#',
    image: '/images/loans/auto-loan.png',
    alt: 'A couple signing paperwork inside a car',
  },
];
