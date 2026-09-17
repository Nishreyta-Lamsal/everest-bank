'use client';

import { useState } from 'react';

import { icon } from '@/components/admin/icons';
import { Switch } from '@/components/admin/ui/switch';

import { useUpdatePage } from '@/hooks/api/admin/use-pages';

import type { Page } from '@/types/admin';

type ProductsListRowProps = {
  page: Page;
  onSelect: () => void;
};

export default function ProductsListRow({
  page,
  onSelect,
}: ProductsListRowProps) {

  const [showInMenu, setShowInMenu] = useState(Boolean(page.show_in_menu));

  const updatePage = useUpdatePage(page.slug);

  const sectionsLabel = `${page.sections_count} section${page.sections_count === 1 ? '' : 's'}`;
  const updatedLabel = `updated ${new Date(page.updated_at).toLocaleDateString()}`;
  const meta = `${page.path} · ${sectionsLabel} · ${updatedLabel}`;

  function handleShowInMenuChange(next: boolean) {
    setShowInMenu(next);

    updatePage.mutate(
      { show_in_menu: next },
      { onError: () => setShowInMenu(!next) },
    );
  }

  return (
    <div className="flex w-full items-center">
      <button
        type="button"
        onClick={onSelect}
        className="flex h-[74px] min-w-0 flex-1 cursor-pointer items-center gap-4 px-4 text-left"
      >
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex shrink-0 items-center rounded-[4px] bg-slate-100 p-3">
            <icon.bank className="size-6 text-slate-950" />
          </div>
          <div className="flex min-w-0 flex-col gap-1.5">
            <p className="truncate text-[16px] leading-[1.3] text-neutral-700">
              {page.title}
            </p>
            <p className="truncate text-[12px] leading-[1.3] text-neutral-700/68">
              {meta}
            </p>
          </div>
        </div>
      </button>

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

        <button
          type="button"
          onClick={onSelect}
          aria-label={`Open ${page.title}`}
          className="flex cursor-pointer items-center"
        >
          <icon.chevronRight className="size-[16px] shrink-0 text-[#7d7c7d]" />
        </button>
      </div>
    </div>
  );
}
