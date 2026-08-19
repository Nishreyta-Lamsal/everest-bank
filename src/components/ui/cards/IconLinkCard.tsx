import type { ComponentType, SVGProps } from 'react';

import Link from 'next/link';

import { ArrowUpRightIcon } from '@/components/icons';

import { cn } from '@/lib/utils';

type IconLinkCardProps = {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  title: string;
  description?: string;
  linkLabel: string;
  href: string;
  headerLayout?: 'inline' | 'stacked';
  titleClassName?: string;
  className?: string;
};

export default function IconLinkCard({
  icon: Icon,
  title,
  description,
  linkLabel,
  href,
  headerLayout = 'inline',
  titleClassName,
  className,
}: IconLinkCardProps) {
  return (
    <div
      className={cn(
        'bg-grey-bluish-grey flex w-full flex-col items-end gap-6 rounded-lg p-4 lg:items-start lg:justify-between lg:gap-0 lg:p-6',
        className,
      )}
    >
      <div
        className={
          headerLayout === 'stacked'
            ? 'flex w-full flex-col items-start gap-5'
            : 'flex w-full items-center gap-2 lg:flex-col lg:items-start lg:gap-4'
        }
      >
        <Icon className="size-6 shrink-0 text-orange-500 lg:size-10" />
        <h3
          className={cn(
            'font-heading text-heading-h4-mobile text-grey-500 lg:text-heading-h4-desktop w-full',
            titleClassName,
          )}
        >
          {title}
        </h3>
        {description && (
          <p className="text-body-2-mobile text-grey-400 lg:text-body-2-desktop">
            {description}
          </p>
        )}
      </div>
      <Link
        href={href}
        className="text-body-4-desktop-md inline-flex items-center gap-1 text-red-700"
      >
        {linkLabel}
        <ArrowUpRightIcon className="size-4 shrink-0" />
      </Link>
    </div>
  );
}
