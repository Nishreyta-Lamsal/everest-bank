import { ROUTE } from '@/constants';

export type AboutLinkCard = {
  title: string;
  href: string;
  image: string;
  imageAlt: string;
};

export const aboutLinkCards: AboutLinkCard[] = [
  {
    title: 'Profile',
    href: ROUTE.ABOUT_PROFILE,
    image: '/images/about/profile.png',
    imageAlt: 'Signage on the exterior of an Everest Bank branch',
  },
  {
    title: 'Mission & Vision',
    href: ROUTE.ABOUT_CORPORATE_MISSION_AND_VISION,
    image: '/images/about/mission-vision.png',
    imageAlt: 'Everest Bank leadership signing an agreement',
  },
  {
    title: 'Organizational Structure',
    href: ROUTE.ABOUT_ORGANIZATION_STRUCTURE,
    image: '/images/about/org-structure.png',
    imageAlt: 'Everest Bank staff gathered for a group photo',
  },
  {
    title: 'Branch Network',
    href: ROUTE.BRANCHES,
    image: '/images/about/branch-network.png',
    imageAlt: 'Ribbon-cutting ceremony at an Everest Bank branch opening',
  },
  {
    title: 'Awards & Recognition',
    href: '#',
    image: '/images/about/awards.png',
    imageAlt: 'An Everest Bank representative receiving an award',
  },
  {
    title: 'CSR',
    href: '#',
    image: '/images/about/csr.png',
    imageAlt: 'Everest Bank representatives at a community outreach event',
  },
];
