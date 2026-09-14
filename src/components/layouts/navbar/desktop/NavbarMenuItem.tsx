import Link from 'next/link';

import { icon } from '@/components/icons';

import { cn } from '@/lib/utils';

import type { NavbarMenuItemProps } from '@/types';

export default function NavbarMenuItem({
  label,
  href,
  isFirst = false,
  hasDropdown = false,
  isExpanded = false,
  isActive = false,
  onFocus,
  onBlur,
}: NavbarMenuItemProps) {
  return (
    <Link
      href={href}
      onFocus={onFocus}
      onBlur={onBlur}
      aria-haspopup={hasDropdown || undefined}
      aria-expanded={hasDropdown ? isExpanded : undefined}
      aria-current={isActive ? 'page' : undefined}
      className={cn(
        'text-body-3-desktop flex items-center gap-1 border-b-2 border-transparent py-3 pr-6 text-red-500! -outline-offset-2 transition-colors hover:border-red-500 focus-visible:outline-red-600',
        isFirst ? 'pl-22' : 'pl-6',
        isActive && 'bg-red-500 text-white!',
        isExpanded && 'border-red-500',
      )}
    >
      {label}
      <icon.chevronDown className="size-[16px] shrink-0" />
    </Link>
  );
}
