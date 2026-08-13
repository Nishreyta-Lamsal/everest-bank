import Link from 'next/link';

import { ChevronDownIcon } from '@/components/icons';

import { cn } from '@/lib/utils';

type NavbarMenuItemProps = {
  label: string;
  href: string;
  isFirst?: boolean;
  hasDropdown?: boolean;
  isExpanded?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
};

export default function NavbarMenuItem({
  label,
  href,
  isFirst = false,
  hasDropdown = false,
  isExpanded = false,
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
      className={cn(
        'text-body-3-desktop flex items-center gap-1 py-3 pr-6 text-red-500! -outline-offset-2 transition-colors hover:bg-red-500 hover:text-white! focus-visible:outline-red-600',
        isFirst ? 'pl-22' : 'pl-6',
      )}
    >
      {label}
      <ChevronDownIcon className="size-4 shrink-0" />
    </Link>
  );
}
