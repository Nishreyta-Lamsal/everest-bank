import { ROUTE } from '@/constants';

import type { ContentSidebarLink } from '@/components/shared/content/ContentSidebar';

export const relatedPages: ContentSidebarLink[] = [
  { title: 'Profile', href: ROUTE.ABOUT_PROFILE },
  {
    title: 'Corporate Mission & Vision',
    href: ROUTE.ABOUT_CORPORATE_MISSION_AND_VISION,
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
