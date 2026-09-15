import type { AccountFinderCard, AccountFinderCategory } from '../_types';

export const accountFinderCategories: AccountFinderCategory[] = [
  { slug: 'everyday-banking', label: 'Everyday Banking' },
  { slug: 'students', label: 'Students' },
  { slug: 'salary-employees', label: 'Salary Employees' },
  { slug: 'women', label: 'Women' },
  { slug: 'senior-citizens', label: 'Senior Citizens' },
  { slug: 'businesses', label: 'Businesses' },
  { slug: 'premium-banking', label: 'Premium Banking' },
  { slug: 'religious-community', label: 'Religious & Community' },
];

export const accountFinderCards: AccountFinderCard[] = [
  {
    title: 'Everest Maxi Savings Account',
    href: '#',
    categories: ['everyday-banking'],
    image:
      '/images/deposit-accounts/saving-account-finder-everest-maxi.png',
    imageAlt:
      'Consistent, strong and dependable — Everest Maxi Savings Account over a snow-capped mountain peak',
  },
  {
    title: 'Matri-Bhumi Savings Account',
    href: '#',
    categories: ['everyday-banking'],
    image:
      '/images/deposit-accounts/saving-account-finder-matri-bhumi.png',
    imageAlt: 'Matri-Bhumi Savings Account for Nepali citizens working abroad',
  },
  {
    title: 'Saugat Saving Account',
    href: '#',
    categories: ['everyday-banking'],
    image: '/images/deposit-accounts/saving-account-finder-saugat.png',
    imageAlt:
      'Saugat Bachat Khata banner with a money bag and rising coin stacks',
  },
  {
    title: 'Everest Special Saving Account',
    href: '#',
    categories: ['everyday-banking'],
    image: '/images/deposit-accounts/saving-account-finder-saugat.png',
    imageAlt: 'Everest Special Saving Account',
    overlayImage:
      '/images/deposit-accounts/saving-account-finder-everest-special-pyramid.png',
    overlayImageAlt: 'Interest rate pyramid for the Everest Special Saving Account',
  },
];
