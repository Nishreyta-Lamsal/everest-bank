'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';

import type { SidebarNavItemData } from '@/types/admin';

export function SidebarNavItem({
  href,
  label,
  icon: Icon,
}: SidebarNavItemData) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        'flex w-full items-center gap-1 rounded-lg px-3 py-2',
        isActive
          ? 'bg-blue-900 text-slate-50'
          : 'bg-white-alpha-50 text-slate-900',
      )}
    >
      <Icon className="size-4.5" />
      <span
        className={isActive ? 'text-paragraph-sm-medium' : 'text-paragraph-sm'}
      >
        {label}
      </span>
    </Link>
  );
}
