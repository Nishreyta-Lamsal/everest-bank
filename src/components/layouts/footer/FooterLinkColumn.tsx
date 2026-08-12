import Link from 'next/link';

import type { FooterLinkColumn as FooterLinkColumnData } from '@/data';

import { cn } from '@/lib/utils';

type FooterLinkColumnProps = {
  column: FooterLinkColumnData;
  className?: string;
};

export default function FooterLinkColumn({
  column,
  className,
}: FooterLinkColumnProps) {
  return (
    <div className={cn('flex shrink-0 flex-col gap-6', className)}>
      <p className="font-heading text-title-2-desktop-md text-grey-500">
        {column.title}
      </p>
      <div className="flex flex-col items-start gap-4">
        {column.links.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="text-grey-400 hover:text-red-500 text-body-4-desktop transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
