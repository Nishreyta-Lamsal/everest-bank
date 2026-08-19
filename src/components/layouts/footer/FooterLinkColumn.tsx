import Link from 'next/link';

import { cn } from '@/lib/utils';

import type { FooterLinkColumnProps } from '@/types';

export default function FooterLinkColumn({
  column,
  className,
}: FooterLinkColumnProps) {
  return (
    <div className={cn('flex shrink-0 flex-col gap-6', className)}>
      <p className="font-heading text-title-3-desktop-md text-grey-500">
        {column.title}
      </p>
      <div className="flex flex-col items-start gap-4">
        {column.links.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="text-grey-400 text-body-4-desktop transition-colors hover:text-red-500"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
