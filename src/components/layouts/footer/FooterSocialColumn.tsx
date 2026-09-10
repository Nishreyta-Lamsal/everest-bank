import Link from 'next/link';

import { icon } from '@/components/icons';

import { cn } from '@/lib/utils';

import { socialIconMap } from '@/constants/social-icon-map';

import type { FooterSocialColumnProps } from '@/types';

export default function FooterSocialColumn({
  links,
  className,
}: FooterSocialColumnProps) {
  return (
    <div className={cn('flex shrink-0 flex-col gap-6', className)}>
      <p className="font-heading text-title-3-desktop-md text-grey-500">
        Socials:
      </p>
      <div className="flex flex-col items-start gap-6">
        {links.map(({ label, href, iconName }) => {
          const Icon = socialIconMap[iconName] ?? icon.x;

          return (
            <Link
              key={label}
              href={href}
              className="text-grey-400 text-body-4-desktop flex items-center gap-2 transition-colors hover:text-red-500"
            >
              <Icon className="size-[16px] shrink-0" />
              {label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
