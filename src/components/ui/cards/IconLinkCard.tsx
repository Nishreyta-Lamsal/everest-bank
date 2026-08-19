import type { ComponentType, SVGProps } from 'react';

import Link from 'next/link';

import { ArrowUpRightIcon } from '@/components/icons';

import { cn } from '@/lib/utils';

type IconLinkCardProps = {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  title: string;
  linkLabel: string;
  href: string;
  className?: string;
};

export default function IconLinkCard({
  icon: Icon,
  title,
  linkLabel,
  href,
  className,
}: IconLinkCardProps) {
  return (
    <div
      className={cn(
        'bg-grey-bluish-grey flex w-full flex-col items-start justify-between rounded-lg p-6',
        className,
      )}
    >
      <div className="flex w-full flex-col items-start gap-4">
        <Icon className="size-8 shrink-0 text-orange-500 lg:size-10" />
        <h3 className="font-heading text-title-0-mobile text-grey-500 lg:text-heading-h5-desktop w-[227px]">
          {title}
        </h3>
      </div>
      <Link
        href={href}
        className="text-body-4-desktop-md inline-flex items-center gap-1 text-red-700"
      >
        {linkLabel}
        <ArrowUpRightIcon className="size-[16px] shrink-0" />
      </Link>
    </div>
  );
}
