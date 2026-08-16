'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { mainNavItems } from '@/data';

import { cn, isNavItemActive } from '@/lib/utils';

export default function BottomNavigationBar() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-0 z-40 flex w-full items-center bg-white shadow-[0px_-1px_5px_rgba(0,0,0,0.08)] lg:hidden"
    >
      {mainNavItems.map((item, index) => {
        const isActive = isNavItemActive(pathname, item.href);

        return (
          <Link
            key={item.label}
            href={item.href}
            aria-current={isActive ? 'page' : undefined}
            className={cn(
              'flex flex-1 flex-col items-center gap-1 py-2.5 transition-colors',
              isActive ? 'bg-red-500 text-white' : 'text-red-500',
              index === 0 && 'pl-4',
              index === mainNavItems.length - 1 && 'pr-4',
            )}
          >
            <item.icon className="size-[18px] shrink-0" />
            <span className="text-body-4-desktop">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
