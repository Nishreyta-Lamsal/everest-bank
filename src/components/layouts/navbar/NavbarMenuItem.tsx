import Link from 'next/link';

import { ChevronDownIcon } from '@/components/icons';

import { cn } from '@/lib/utils';

type NavbarMenuItemProps = {
  label: string;
  href: string;
  isFirst?: boolean;
};

export default function NavbarMenuItem({
  label,
  href,
  isFirst = false,
}: NavbarMenuItemProps) {
  return (
    <Link
      href={href}
      className={cn(
        'text-red-500! hover:bg-red-500 hover:text-white! flex items-center gap-1 py-3 pr-6 text-body-3-desktop transition-colors',
        isFirst ? 'pl-22' : 'pl-6',
      )}
    >
      {label}
      <ChevronDownIcon className="size-4 shrink-0" />
    </Link>
  );
}
