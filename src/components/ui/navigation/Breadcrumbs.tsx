import type { ComponentPropsWithoutRef } from 'react';
import Link from 'next/link';

import LayoutWrapper from '@/components/layouts/wrapper/LayoutWrapper';
import { ChevronRightIcon, HomeIcon } from '@/components/icons';

import { cn } from '@/lib/utils';

import { ROUTE } from '@/constants';

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
} & Omit<ComponentPropsWithoutRef<'nav'>, 'children'>;

export default function Breadcrumbs({
  items,
  className,
  ...otherProps
}: BreadcrumbsProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={cn(
        'absolute inset-x-0 top-0 z-10 bg-black/40 py-2.5 backdrop-blur-[5px] md:bg-black/20 md:py-4',
        className,
      )}
      {...otherProps}
    >
      <LayoutWrapper>
        <div className="flex items-center gap-1">
          <Link
            href={ROUTE.PERSONAL}
            aria-label="Home"
            className="shrink-0 text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <HomeIcon className="size-4" />
          </Link>
          {items.map((item, index) => {
            const isLast = index === items.length - 1;

            return (
              <span key={item.label} className="flex items-center gap-1">
                <ChevronRightIcon className="size-4 shrink-0 text-white" />
                {item.href && !isLast ? (
                  <Link
                    href={item.href}
                    className="text-body-3-mobile lg:text-body-4-desktop text-white hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span
                    aria-current={isLast ? 'page' : undefined}
                    className="text-body-3-mobile lg:text-body-4-desktop text-white"
                  >
                    {item.label}
                  </span>
                )}
              </span>
            );
          })}
        </div>
      </LayoutWrapper>
    </nav>
  );
}
