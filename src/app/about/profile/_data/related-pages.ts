import { ROUTE } from '@/constants';

export type RelatedPage = {
  title: string;
  href: string;
};

export const relatedPages: RelatedPage[] = [
  {
    title: 'Corporate Mission & Vision',
    href: ROUTE.ABOUT_CORPORATE_MISSION_AND_VISION,
  },
  {
    title: 'Organizational Structure',
    href: ROUTE.ABOUT_ORGANIZATION_STRUCTURE,
  },
  { title: 'Board of Directors', href: ROUTE.ABOUT_BOARD_OF_DIRECTORS },
  { title: 'Management Team', href: '/about/management-team' },
  { title: 'Department Head', href: '/about/department-head' },
  { title: 'Province Head', href: '/about/province-head' },
  { title: 'Branches', href: '/about/branches' },
  {
    title: 'Pioneer Achievements & Awards',
    href: '/about/awards-recognition',
  },
  { title: 'Issuer Rating', href: '/about/issuer-rating' },
  { title: 'CSR', href: '/about/csr' },
];
