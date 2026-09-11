import type { ComponentType, SVGProps } from 'react';

export type SidebarNavItemData = {
  href: string;
  label: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
};

export type SidebarNavGroupData = {
  title: string;
  items?: SidebarNavItemData[];
};
