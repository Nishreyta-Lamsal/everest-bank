import type { ComponentType, SVGProps } from 'react';

import { icon } from '@/components/icons';

export type BusinessIndustryCard = {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
  href: string;
  linkLabel: string;
};

export const businessIndustryCards: BusinessIndustryCard[] = [
  {
    icon: icon.factory,
    title: 'Manufacturing',
    description:
      'Equipment finance, working capital, and production-focused banking.',
    href: '#',
    linkLabel: 'Explore Manufacturing Bank',
  },
  {
    icon: icon.pieChart,
    title: 'Trading & Import/Export',
    description:
      'Trade finance, letters of credit, and foreign exchange solutions.',
    href: '#',
    linkLabel: 'Explore Trade Solutions',
  },
  {
    icon: icon.buildings,
    title: 'Hospitality & Tourism',
    description:
      'Flexible financing and payment solutions for hotels and tourism businesses.',
    href: '#',
    linkLabel: 'Explore Hospitality Banking',
  },
  {
    icon: icon.growth,
    title: 'Agriculture & Agro-business',
    description:
      'Priority-sector financing designed for farmers, cooperatives, and agribusinesses.',
    href: '#',
    linkLabel: 'Explore Agriculture Banking',
  },
];
