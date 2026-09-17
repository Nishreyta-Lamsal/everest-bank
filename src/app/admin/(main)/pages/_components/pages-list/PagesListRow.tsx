'use client';

import Link from 'next/link';
import { useState } from 'react';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { icon } from '@/components/admin/icons';
import { Switch } from '@/components/admin/ui/switch';

import { cn } from '@/lib/utils';
import { formatRelativeTime } from '@/lib/admin/format-relative-time';

import { useUpdatePage } from '@/hooks/api/admin/use-pages';

import { ADMIN_ROUTE } from '@/constants/admin';

import type { Page } from '@/types/admin';

type PagesListRowProps = {
  page: Page;
};

export default function PagesListRow({ page }: PagesListRowProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: page.id });

  const [showInMenu, setShowInMenu] = useState(Boolean(page.show_in_menu));

  const updatePage = useUpdatePage(page.slug);

  const sectionsLabel = `${page.sections_count} section${page.sections_count === 1 ? '' : 's'}`;
  const updatedLabel = `updated ${formatRelativeTime(page.updated_at)}`;

  function handleShowInMenuChange(next: boolean) {
    setShowInMenu(next);

    updatePage.mutate(
      { show_in_menu: next },
      { onError: () => setShowInMenu(!next) },
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className={cn(
        'flex w-full items-center',
        // Opaque only while dragging, so the lifted row covers the ones it
        // passes over without altering the list's dividers at rest.
        isDragging && 'relative z-10 rounded-[8px] bg-white shadow-lg',
      )}
    >
      <button
        ref={setActivatorNodeRef}
        type="button"
        aria-label={`Reorder ${page.title}`}
        className="flex h-[74px] shrink-0 cursor-grab touch-none items-center pl-2 text-[#7d7c7d] active:cursor-grabbing"
        {...attributes}
        {...listeners}
      >
        <icon.dragHandle className="size-[16px] shrink-0" />
      </button>

      <Link
        href={`${ADMIN_ROUTE.PAGES}/${page.slug}`}
        className="flex h-[74px] min-w-0 flex-1 items-center gap-4 px-4"
      >
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex shrink-0 items-center rounded-[4px] bg-slate-100 p-3">
            <icon.pageText className="size-6 text-slate-950" />
          </div>
          <div className="flex min-w-0 flex-col gap-1.5">
            <p className="truncate text-[16px] leading-[1.3] text-neutral-700">
              {page.title}
            </p>
            <p className="truncate text-[12px] leading-[1.3] text-neutral-700/68">
              {page.path} · {sectionsLabel} · {updatedLabel}
            </p>
          </div>
        </div>
      </Link>

      <div className="flex h-[74px] shrink-0 items-center gap-4 px-4">
        <label className="flex cursor-pointer items-center gap-2">
          <span className="text-paragraph-sm-medium text-neutral-700">
            Show in menu
          </span>
          <Switch
            checked={showInMenu}
            disabled={updatePage.isPending}
            onCheckedChange={handleShowInMenuChange}
          />
        </label>

        <Link
          href={`${ADMIN_ROUTE.PAGES}/${page.slug}`}
          aria-label={`Open ${page.title}`}
          className="flex items-center"
        >
          <icon.chevronRight className="size-[16px] shrink-0 text-[#7d7c7d]" />
        </Link>
      </div>
    </div>
  );
}
