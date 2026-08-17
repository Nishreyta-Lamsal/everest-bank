export type AboutLinkCard = {
  title: string;
  href: string;
  image: string;
  imageAlt: string;
};

export const aboutLinkCards: AboutLinkCard[] = [
  {
    title: 'Profile',
    href: '#',
    image: '/images/about/profile.png',
    imageAlt: 'Signage on the exterior of an Everest Bank branch',
  },
  {
    title: 'Mission & Vision',
    href: '#',
    image: '/images/about/mission-vision.png',
    imageAlt: 'Everest Bank leadership signing an agreement',
  },
  {
    title: 'Organizational Structure',
    href: '#',
    image: '/images/about/org-structure.png',
    imageAlt: 'Everest Bank staff gathered for a group photo',
  },
  {
    title: 'Branch Network',
    href: '#',
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
