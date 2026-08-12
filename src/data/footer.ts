import type { ComponentType, SVGProps } from 'react';

import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  YoutubeIcon,
} from '@/components/icons';

import { EXTERNAL_LINK } from '@/constants';

export type FooterOfficer = {
  title: string;
  name: string;
  photo: string;
  phone: string;
  extension: string;
  email: string;
};

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

export type FooterLink = {
  label: string;
  href: string;
};

export type FooterLinkColumn = {
  title: string;
  links: FooterLink[];
};

export const footerLinkColumns: FooterLinkColumn[] = [
  {
    title: 'About Everest Bank',
    links: [
      { label: 'About', href: '#' },
      { label: 'Find Us', href: '#' },
      { label: 'News & Notices', href: '#' },
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
      { label: 'Apply for loans', href: '#' },
      { label: 'Fixed Deposite', href: '#' },
      { label: 'Apply for Cards', href: '#' },
      { label: 'Send Money to Nepal', href: '#' },
      { label: 'Online Account Opening', href: '#' },
      { label: 'Check Loan Eligibility', href: '#' },
      { label: 'Cybersecurity Awareness', href: '#' },
      { label: 'Pratibimba', href: '#' },
      { label: 'e-Calendar 2082', href: '#' },
      { label: 'e-Calendar 2083', href: '#' },
    ],
  },
  {
    title: 'Miscellaneous',
    links: [
      { label: 'FD Calculator', href: '#' },
      { label: 'EMI Calculator', href: '#' },
      { label: 'Rates and Fees', href: '#' },
      { label: 'Banking Hours', href: '#' },
      { label: 'Branch Network', href: '#' },
      { label: 'Extension Counter', href: '#' },
      { label: 'Learning and Development', href: '#' },
      { label: 'Downloads', href: '#' },
      { label: 'Videos', href: '#' },
      { label: 'Disclaimer', href: '#' },
      { label: 'Sitemap', href: '#' },
    ],
  },
];

export type FooterSocialLink = {
  label: string;
  href: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
};

export const footerSocialLinks: FooterSocialLink[] = [
  { label: 'Facebook', href: EXTERNAL_LINK.FACEBOOK, icon: FacebookIcon },
  { label: 'Instagram', href: EXTERNAL_LINK.INSTAGRAM, icon: InstagramIcon },
  { label: 'LinkedIn', href: EXTERNAL_LINK.LINKEDIN, icon: LinkedinIcon },
  { label: 'YouTube', href: EXTERNAL_LINK.YOUTUBE, icon: YoutubeIcon },
];
