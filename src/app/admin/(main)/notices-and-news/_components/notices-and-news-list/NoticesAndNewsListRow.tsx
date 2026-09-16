'use client';

import { useEffect, useRef, useState } from 'react';

import { icon } from '@/components/admin/icons';
import NoticesAndNewsEditDrawer from './NoticesAndNewsEditDrawer';

import { cn } from '@/lib/utils';
import { formatUpdatedLabel } from '@/lib/admin/format-updated-label';

import type { NewsStatus, NoticesAndNewsEntry } from '@/types/admin';

const statusStyles: Record<NewsStatus, string> = {
  published: 'bg-[#ebfef6] text-[#059669]',
  draft: 'bg-[#edf2f7] text-[#65738a]',
};

type NoticesAndNewsListRowProps = {
  entry: NoticesAndNewsEntry;
  kind: 'notice' | 'news';
};

export default function NoticesAndNewsListRow({
  entry,
  kind,
}: NoticesAndNewsListRowProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const statusClassName = statusStyles[entry.status] ?? statusStyles.draft;
  const meta = formatUpdatedLabel(entry.updated_at);

  useEffect(
    function () {
      if (!isMenuOpen) return;

      function handlePointerDown(event: MouseEvent) {
        if (!menuRef.current?.contains(event.target as Node)) {
          setIsMenuOpen(false);
        }
      }

      function handleKeyDown(event: KeyboardEvent) {
        if (event.key === 'Escape') setIsMenuOpen(false);
      }

      document.addEventListener('mousedown', handlePointerDown);
      document.addEventListener('keydown', handleKeyDown);

      return function () {
        document.removeEventListener('mousedown', handlePointerDown);
        document.removeEventListener('keydown', handleKeyDown);
      };
    },
    [isMenuOpen],
  );

  return (
    <>
      <div className="flex w-full items-center">
        <div className="flex h-[74px] min-w-0 flex-1 items-center gap-4 px-4">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex shrink-0 items-center rounded-[4px] bg-slate-100 p-3">
              <icon.newspaper className="size-6 text-slate-950" />
            </div>
            <div className="flex min-w-0 flex-col gap-1.5">
              <p className="truncate text-[16px] leading-[1.3] text-neutral-700">
                {entry.title}
              </p>
              <p className="truncate text-[12px] leading-[1.3] text-neutral-700/68">
                {meta}
              </p>
            </div>
          </div>
        </div>

        <div className="flex h-[74px] shrink-0 items-center gap-4 px-4">
          <span
            className={cn(
              'text-paragraph-sm-medium flex items-center justify-center gap-1.5 rounded-full px-3 py-2',
              statusClassName,
            )}
          >
            {entry.status_label}
          </span>

          <div ref={menuRef} className="relative">
            <button
              type="button"
              onClick={() => setIsMenuOpen((open) => !open)}
              aria-label={`Actions for ${entry.title}`}
              aria-haspopup="menu"
              aria-expanded={isMenuOpen}
              className="flex size-8 cursor-pointer items-center justify-center rounded-full text-[#7d7c7d] transition-colors hover:bg-slate-100 hover:text-slate-950"
            >
              <icon.moreDots className="size-4" />
            </button>

            {isMenuOpen && (
              <div
                role="menu"
                className="absolute top-full right-0 z-10 mt-1 flex min-w-[160px] flex-col rounded-[8px] border border-black/5 bg-white py-1 shadow-lg"
              >
                <button
                  type="button"
                  role="menuitem"
                  onClick={() => {
                    setIsMenuOpen(false);
                    setIsEditOpen(true);
                  }}
                  className="flex cursor-pointer items-center gap-2 px-3 py-2 text-left text-[14px] text-neutral-900 transition-colors hover:bg-slate-50"
                >
                  <icon.edit className="size-4 shrink-0 text-slate-600" />
                  Edit
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {isEditOpen && (
        <NoticesAndNewsEditDrawer
          entry={entry}
          kind={kind}
          isOpen={isEditOpen}
          onClose={() => setIsEditOpen(false)}
        />
      )}
    </>
  );
}
