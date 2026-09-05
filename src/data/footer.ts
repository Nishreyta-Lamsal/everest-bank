import { ROUTE } from '@/constants/route';

import type { FooterLinkColumn, FooterOfficer } from '@/types';

export const footerOfficers: FooterOfficer[] = [
  {
    title: 'Grievance Handling Officer',
    name: 'Mr. Ashutosh Sharma',
    photo: '/images/footer/grievance-officer-photo.png',
    phone: '+977-9851074410',
    extension: '01-4543377 (Ext:1006)',
    email: 'ashutosh@ebl.com.np',
  },
  {
    title: 'Information Officer',
    name: 'Mr. Keshab Raj Paudel',
    photo: '/images/footer/information-officer-photo.png',
    phone: '+977-9851074410',
    extension: '01-4543377 (Ext:1006)',
    email: 'keshab@ebl.com.np',
  },
];

export const footerLinkColumns: FooterLinkColumn[] = [
  {
    title: 'About Everest Bank',
    links: [
      { label: 'About', href: ROUTE.ABOUT },
      { label: 'Find Us', href: ROUTE.BRANCHES },
      { label: 'News & Notices', href: ROUTE.NOTICE },
      { label: 'Press Release', href: '#' },
      { label: 'Careers', href: '#' },
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Use', href: '#' },
      { label: 'EBL Gunaso Portal', href: '#' },
      { label: 'Customer Satisfaction Survey - 2083', href: '#' },
    ],
  },
  {
    title: 'Explore',
    links: [
      { label: 'Apply for loans', href: ROUTE.LOANS },
      { label: 'Fixed Deposits', href: ROUTE.DEPOSIT_ACCOUNTS },
      { label: 'Apply for Cards', href: ROUTE.CARDS },
      { label: 'Send Money to Nepal', href: ROUTE.REMITTANCE },
      { label: 'Online Account Opening', href: '#' },
      { label: 'Check Loan Eligibility', href: ROUTE.ELIGIBILITY_CHECKER },
      { label: 'Cybersecurity Awareness', href: '#' },
      { label: 'Pratibimba', href: '#' },
      { label: 'e-Calendar 2082', href: '#' },
      { label: 'e-Calendar 2083', href: '#' },
    ],
  },
  {
    title: 'Miscellaneous',
    links: [
      { label: 'FD Calculator', href: ROUTE.FD_CALCULATOR },
      { label: 'EMI Calculator', href: ROUTE.EMI_CALCULATOR },
      { label: 'Rates and Fees', href: ROUTE.FOREX_RATES },
      { label: 'Banking Hours', href: '#' },
      { label: 'Branch Network', href: ROUTE.BRANCHES },
      { label: 'Extension Counter', href: '#' },
      { label: 'Learning and Development', href: '#' },
      { label: 'Downloads', href: '#' },
      { label: 'Videos', href: '#' },
      { label: 'Disclaimer', href: '#' },
      { label: 'Sitemap', href: '#' },
    ],
  },
];
