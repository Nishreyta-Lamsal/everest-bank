'use client';

import { useEffect, useRef, useState } from 'react';

import { icon } from '@/components/admin/icons';
import CardEditDrawer from './CardEditDrawer';
import { ConfirmDialog } from '@/components/admin/ui/confirm-dialog';

import { useDeleteCard } from '@/hooks/api/admin/use-more-services';

import { cn } from '@/lib/utils';
import { formatUpdatedLabel } from '@/lib/admin/format-updated-label';
import { readApiError } from '@/lib/admin/read-api-error';

import type { Card, CardScreen } from '@/types/admin';

type CardListRowProps = {
  card: Card;
  groupSlug: string;
  screens: CardScreen[];
  openMenuUpward?: boolean;
};

export default function CardListRow({
  card,
  groupSlug,
  screens,
  openMenuUpward = false,
}: CardListRowProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const deleteCard = useDeleteCard(groupSlug);

  const meta = [
    formatUpdatedLabel(card.updated_at),
    card.page ? `Page: ${card.resolved_href}` : card.href,
    card.screens.length === 0
      ? 'every page'
      : card.screens
          .map(
            (key) => screens.find((screen) => screen.key === key)?.label ?? key,
          )
          .join(', '),
  ]
    .filter(Boolean)
    .join(' · ');

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
            {card.image?.file_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={card.image.file_url}
                alt=""
                className="size-10 shrink-0 rounded-lg object-cover"
              />
            ) : (
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-slate-100">
                <icon.image className="size-4 text-slate-400" />
              </div>
            )}
            <div className="flex min-w-0 flex-col gap-1.5">
              <p className="truncate text-[16px] leading-[1.3] text-neutral-700">
                {card.title}
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
              card.is_active
                ? 'bg-[#ebfef6] text-[#059669]'
                : 'bg-[#edf2f7] text-[#65738a]',
            )}
          >
            {card.is_active ? 'Shown' : 'Hidden'}
          </span>

          <div ref={menuRef} className="relative">
            <button
              type="button"
              onClick={() => setIsMenuOpen((open) => !open)}
              aria-label={`Actions for ${card.title}`}
              aria-haspopup="menu"
              aria-expanded={isMenuOpen}
              className="flex size-8 cursor-pointer items-center justify-center rounded-full text-[#7d7c7d] transition-colors hover:bg-slate-100 hover:text-slate-950"
            >
              <icon.moreDots className="size-4" />
            </button>

            {isMenuOpen && (
              <div
                role="menu"
                className={cn(
                  'absolute right-0 z-20 flex min-w-[160px] flex-col rounded-[8px] border border-black/5 bg-white py-1 shadow-lg',
                  openMenuUpward ? 'bottom-full mb-1' : 'top-full mt-1',
                )}
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
                <button
                  type="button"
                  role="menuitem"
                  onClick={() => {
                    setIsMenuOpen(false);
                    setIsDeleteOpen(true);
                  }}
                  className="flex cursor-pointer items-center gap-2 px-3 py-2 text-left text-[14px] text-red-600 transition-colors hover:bg-red-50"
                >
                  <icon.trash className="size-4 shrink-0" />
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {isEditOpen && (
        <CardEditDrawer
          groupSlug={groupSlug}
          card={card}
          isOpen={isEditOpen}
          onClose={() => setIsEditOpen(false)}
        />
      )}

      <ConfirmDialog
        isOpen={isDeleteOpen}
        onClose={() => {
          setIsDeleteOpen(false);
          deleteCard.reset();
        }}
        onConfirm={() =>
          deleteCard.mutate(card.id, {
            onSuccess: () => setIsDeleteOpen(false),
          })
        }
        title="Delete card?"
        description={
          <>
            <span className="font-medium text-neutral-900">{card.title}</span>
            {' will be permanently removed. This cannot be undone.'}
          </>
        }
        isPending={deleteCard.isPending}
        error={
          deleteCard.isError
            ? readApiError(deleteCard.error, 'Could not delete this card.')
            : undefined
        }
      />
    </>
  );
}
