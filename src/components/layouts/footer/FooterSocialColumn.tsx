import Link from 'next/link';

import { footerSocialLinks } from '@/data';

import { cn } from '@/lib/utils';

import type { FooterSocialColumnProps } from '@/types';

export default function FooterSocialColumn({
  className,
}: FooterSocialColumnProps) {
  return (
    <div className={cn('flex shrink-0 flex-col gap-6', className)}>
      <p className="font-heading text-title-2-desktop-md text-grey-500">
        Socials:
      </p>
      <div className="flex flex-col items-start gap-6">
        {footerSocialLinks.map(({ label, href, icon: Icon }) => (
          <Link
            key={label}
            href={href}
            className="text-grey-400 text-body-4-desktop flex items-center gap-2 transition-colors hover:text-red-500"
          >
            <Icon className="size-[16px] shrink-0" />
            {label}
          </Link>
        ))}
      </div>
    </div>
  );
}
