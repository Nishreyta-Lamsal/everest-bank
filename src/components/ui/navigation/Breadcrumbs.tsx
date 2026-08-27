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
  tone?: 'light' | 'dark';
} & Omit<ComponentPropsWithoutRef<'nav'>, 'children'>;

export default function Breadcrumbs({
  items,
  tone = 'light',
  className,
  ...otherProps
}: BreadcrumbsProps) {
  const isDark = tone === 'dark';

  const textClasses = isDark ? 'text-grey-500' : 'text-white';
  const outlineClasses = isDark
    ? 'focus-visible:outline-grey-500'
    : 'focus-visible:outline-white';

  return (
    <nav
      aria-label="Breadcrumb"
      className={cn(
        'absolute inset-x-0 top-0 z-10 py-2.5 backdrop-blur-[5px] md:py-4',
        !isDark && 'bg-black/40 lg:bg-black/20',
        className,
      )}
      {...otherProps}
    >
      <LayoutWrapper>
        <div className="flex items-center gap-1">
          <Link
            href={ROUTE.PERSONAL}
            aria-label="Home"
            className={cn(
              'shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2',
              textClasses,
              outlineClasses,
            )}
          >
            <HomeIcon className="size-4" />
          </Link>
          {items.map((item, index) => {
            const isLast = index === items.length - 1;

            return (
              <span key={item.label} className="flex items-center gap-1">
                <ChevronRightIcon
                  className={cn('size-4 shrink-0', textClasses)}
                />
                {item.href && !isLast ? (
                  <Link
                    href={item.href}
                    className={cn(
                      'text-body-3-mobile lg:text-body-4-desktop hover:underline focus-visible:outline-2 focus-visible:outline-offset-2',
                      textClasses,
                      outlineClasses,
                    )}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span
                    aria-current={isLast ? 'page' : undefined}
                    className={cn(
                      'text-body-3-mobile lg:text-body-4-desktop',
                      textClasses,
                    )}
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
