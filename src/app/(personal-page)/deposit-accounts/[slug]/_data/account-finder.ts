import type { AccountFinderCategory } from '../_types';

export const accountFinderCategories: AccountFinderCategory[] = [
  {
    label: 'Everyday Banking',
    accounts: [
      {
        title: 'Everest Maxi Savings Account',
        href: '#',
        image:
          '/images/deposit-accounts/saving-account-finder-everest-maxi.png',
        imageAlt:
          'Consistent, strong and dependable — Everest Maxi Savings Account over a snow-capped mountain peak',
      },
      {
        title: 'Matri-Bhumi Savings Account',
        href: '#',
        image: '/images/deposit-accounts/saving-account-finder-matri-bhumi.png',
        imageAlt:
          'Matri-Bhumi Savings Account for Nepali citizens working abroad',
      },
      {
        title: 'Saugat Saving Account',
        href: '#',
        image: '/images/deposit-accounts/saving-account-finder-saugat.png',
        imageAlt:
          'Saugat Bachat Khata banner with a money bag and rising coin stacks',
      },
      {
        title: 'Everest Special Saving Account',
        href: '#',
        image: '/images/deposit-accounts/saving-account-finder-saugat.png',
        imageAlt: 'Everest Special Saving Account',
        overlayImage:
          '/images/deposit-accounts/saving-account-finder-everest-special-pyramid.png',
        overlayImageAlt:
          'Interest rate pyramid for the Everest Special Saving Account',
      },
    ],
  },
  { label: 'Students', accounts: [] },
  { label: 'Salary Employees', accounts: [] },
  { label: 'Women', accounts: [] },
  { label: 'Senior Citizens', accounts: [] },
  { label: 'Businesses', accounts: [] },
  { label: 'Premium Banking', accounts: [] },
  { label: 'Religious & Community', accounts: [] },
];
