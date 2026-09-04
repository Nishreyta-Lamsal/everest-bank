import { tv } from 'tailwind-variants';

import {
  ChevronDownIcon,
  ChevronLeftSmallIcon,
  ChevronRightSmallIcon,
  EllipsisIcon,
} from '@/components/icons';

import { cn } from '@/lib/utils';

import type { ComponentPropsWithoutRef } from 'react';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  pageSize?: number;
  pageSizeOptions?: number[];
  onPageSizeChange?: (pageSize: number) => void;
} & Omit<ComponentPropsWithoutRef<'nav'>, 'children' | 'onChange'>;

type PageItem = number | 'ellipsis';

const EDGE_PAGE_COUNT = 6;

export const paginationClasses = tv({
  slots: {
    page: 'text-caption-1 flex h-[32px] w-[32px] cursor-pointer items-center justify-center rounded-[4px] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500',
    step: 'text-caption-1 flex size-[16px] shrink-0 cursor-pointer items-center justify-center transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500 disabled:cursor-not-allowed',
  },
  variants: {
    active: {
      true: { page: 'bg-red-500 text-white' },
      false: { page: 'text-grey-500 hover:bg-grey-25' },
    },
    disabled: {
      true: { step: 'text-grey-200' },
      false: { step: 'text-grey-500 hover:text-red-500' },
    },
  },
  defaultVariants: {
    active: false,
    disabled: false,
  },
});

function range(start: number, end: number) {
  return Array.from({ length: end - start + 1 }, (_, index) => start + index);
}

function getPageItems(currentPage: number, totalPages: number): PageItem[] {
  if (totalPages <= EDGE_PAGE_COUNT + 2) {
    return range(1, totalPages);
  }

  if (currentPage <= EDGE_PAGE_COUNT - 2) {
    return [...range(1, EDGE_PAGE_COUNT), 'ellipsis', totalPages];
  }

  if (currentPage >= totalPages - (EDGE_PAGE_COUNT - 3)) {
    return [
      1,
      'ellipsis',
      ...range(totalPages - EDGE_PAGE_COUNT + 1, totalPages),
    ];
  }

  return [
    1,
    'ellipsis',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    'ellipsis',
    totalPages,
  ];
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  pageSize,
  pageSizeOptions = [10, 20, 50, 100],
  onPageSizeChange,
  className,
  ...otherProps
}: PaginationProps) {
  const { page, step } = paginationClasses();

  const pageItems = getPageItems(currentPage, totalPages);
  const isFirstPage = currentPage <= 1;
  const isLastPage = currentPage >= totalPages;
  const showPageSize = Boolean(pageSize && onPageSizeChange);

  return (
    <nav
      aria-label="Pagination"
      className={cn('flex items-center justify-center gap-2', className)}
      {...otherProps}
    >
      <div className="flex items-center gap-1">
        <button
          type="button"
          aria-label="Go to previous page"
          disabled={isFirstPage}
          onClick={() => onPageChange(currentPage - 1)}
          className={step({ disabled: isFirstPage })}
        >
          <ChevronLeftSmallIcon className="size-4" />
        </button>

        <ul className="flex items-center justify-center gap-1">
          {pageItems.map((item, index) =>
            item === 'ellipsis' ? (
              <li
                key={`ellipsis-after-${pageItems[index - 1]}`}
                aria-hidden="true"
                className="text-grey-200 flex h-[32px] w-[32px] items-center justify-center rounded-[4px] px-1"
              >
                <EllipsisIcon className="size-4" />
              </li>
            ) : (
              <li key={item}>
                <button
                  type="button"
                  aria-label={`Go to page ${item}`}
                  aria-current={item === currentPage ? 'page' : undefined}
                  onClick={() => onPageChange(item)}
                  className={page({ active: item === currentPage })}
                >
                  {item}
                </button>
              </li>
            ),
          )}
        </ul>

        <button
          type="button"
          aria-label="Go to next page"
          disabled={isLastPage}
          onClick={() => onPageChange(currentPage + 1)}
          className={step({ disabled: isLastPage })}
        >
          <ChevronRightSmallIcon className="size-4" />
        </button>
      </div>

      {showPageSize && (
        <div className="border-grey-200 relative h-[32px] rounded-md border bg-white">
          <select
            aria-label="Results per page"
            value={pageSize}
            onChange={(event) => onPageSizeChange?.(Number(event.target.value))}
            className="text-caption-1 text-grey-500 h-full cursor-pointer appearance-none rounded-md bg-transparent pr-8.5 pl-2.5 opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
          >
            {pageSizeOptions.map((option) => (
              <option key={option} value={option}>
                {option}/ Page
              </option>
            ))}
          </select>
          <ChevronDownIcon className="text-grey-200 pointer-events-none absolute top-1/2 right-2.5 size-4 -translate-y-1/2 opacity-80" />
        </div>
      )}
    </nav>
  );
}
