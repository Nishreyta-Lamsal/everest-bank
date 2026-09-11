import type { ComponentType, SVGProps } from 'react';

import { icon } from '@/components/admin/icons';

export type ActivityItem = {
  id: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  title: string;
  category: string;
  time: string;
};

export const activityItems: ActivityItem[] = [
  {
    id: '1',
    icon: icon.edit,
    title: "Treasury Desk updated today's forex rates (USD 139.20)",
    category: 'Rates & Fees',
    time: 'Today · 9:05 AM',
  },
  {
    id: '2',
    icon: icon.checkmark,
    title: 'Ashish Kumar approved ATM downtime notice Maitidevi',
    category: 'Notices & News',
    time: 'Today · 8:40 AM',
  },
  {
    id: '3',
    icon: icon.checkmark,
    title: 'Sagar Mehta published Koshi Province Loan Report Q3 2083',
    category: 'Notices & News',
    time: 'Yesterday · 4:12 PM',
  },
  {
    id: '4',
    icon: icon.checkmark,
    title: 'Digital Team submitted Everest Virtual Dollar Card for review',
    category: 'Products',
    time: 'Yesterday · 11:30 AM',
  },
  {
    id: '5',
    icon: icon.checkmark,
    title: 'Riya Kapoor updated Everest Agriculture Loan eligibility list',
    category: 'Products',
    time: '2 days ago',
  },
  {
    id: '6',
    icon: icon.checkmark,
    title: 'Marketing uploaded dashain-hero.jpg and 3 more files',
    category: 'Assets',
    time: '2 days ago',
  },
];
