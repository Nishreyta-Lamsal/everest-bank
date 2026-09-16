'use client';

import { SidebarNavGroup } from './SidebarNavGroup';
import { SidebarNavItem } from './SidebarNavItem';

import { dashboardNavItem, sidebarNavGroups } from '@/data/admin';

export default function Sidebar() {
  return (
    <aside className="sticky top-15 flex h-[calc(100vh-60px)] w-[230px] shrink-0 flex-col gap-4.5 overflow-y-auto bg-[rgba(251,251,251,0.8)] px-4 py-3 backdrop-blur-xs">
      <SidebarNavItem {...dashboardNavItem} />

      <div className="flex w-full flex-col gap-2">
        {sidebarNavGroups.map((group) => (
          <SidebarNavGroup key={group.title} {...group} />
        ))}
      </div>
    </aside>
  );
}
