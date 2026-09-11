'use client';

import Link from 'next/link';

import { cn } from '@/lib/utils';

import { ADMIN_ROUTE } from '@/constants/admin';

import type { PageSectionRead } from '@/types/admin';

type PageSectionItemProps = {
  slug: string;
  section: PageSectionRead;
  isActive: boolean;
};

export default function PageSectionItem({
  slug,
  section,
  isActive,
}: PageSectionItemProps) {
  return (
    <Link
      href={`${ADMIN_ROUTE.PAGES}/${slug}?section=${section.id}`}
      aria-current={isActive ? 'page' : undefined}
      className={cn(
        'w-full truncate rounded-[4px] px-2 py-2 text-[12px] text-[#4f4f4f]',
        isActive && 'bg-slate-100 font-medium text-neutral-900',
        !section.is_visible && 'opacity-50',
      )}
    >
      {section.label}
    </Link>
  );
}
