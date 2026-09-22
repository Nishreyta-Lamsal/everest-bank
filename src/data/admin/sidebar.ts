import { icon } from '@/components/admin/icons';

import { ADMIN_ROUTE } from '@/constants/admin';

import type { SidebarNavGroupData, SidebarNavItemData } from '@/types/admin';

export const dashboardNavItem: SidebarNavItemData = {
  href: ADMIN_ROUTE.DASHBOARD,
  label: 'Dashboard',
  icon: icon.grid,
};

export const contentNavItems: SidebarNavItemData[] = [
  { href: ADMIN_ROUTE.PAGES, label: 'Pages', icon: icon.pageText },
  { href: ADMIN_ROUTE.PRODUCTS, label: 'Products', icon: icon.bank },
  {
    href: ADMIN_ROUTE.NOTICES_AND_NEWS,
    label: 'Notices and News',
    icon: icon.newspaper,
  },
  {
    href: ADMIN_ROUTE.FOREX_RATES,
    label: 'Forex Rates',
    icon: icon.percent,
  },
  { href: ADMIN_ROUTE.FORMS, label: 'Forms', icon: icon.fileText },
  { href: ADMIN_ROUTE.ASSETS, label: 'Assets', icon: icon.images },
];

export const otherNavItems: SidebarNavItemData[] = [
  { href: ADMIN_ROUTE.FOOTER, label: 'Footer', icon: icon.pageText },
  { href: ADMIN_ROUTE.LOCATIONS, label: 'Locations', icon: icon.bank },
  {
    href: ADMIN_ROUTE.MORE_SERVICES,
    label: 'More Services',
    icon: icon.images,
  },
  { href: ADMIN_ROUTE.CALENDARS, label: 'Calendars', icon: icon.calendar },
];

export const toolsNavItems: SidebarNavItemData[] = [
  {
    href: ADMIN_ROUTE.EMI_CALCULATOR,
    label: 'EMI Calculator',
    icon: icon.percent,
  },
  {
    href: ADMIN_ROUTE.FD_CALCULATOR,
    label: 'FD Calculator',
    icon: icon.percent,
  },
  {
    href: ADMIN_ROUTE.ELIGIBILITY_CHECKER,
    label: 'Eligibility Checker',
    icon: icon.percent,
  },
];

export const sidebarNavGroups: SidebarNavGroupData[] = [
  { title: 'Content', items: contentNavItems },
  { title: 'Other', items: otherNavItems },
  { title: 'Tools', items: toolsNavItems },
  { title: 'Settings' },
];
