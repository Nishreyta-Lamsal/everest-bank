'use client';

import { useState } from 'react';

import FooterLinkRow from './FooterLinkRow';
import { Button } from '@/components/admin/ui/button';
import { Input } from '@/components/admin/ui/input';
import { icon } from '@/components/admin/icons';

import { useFooterDraft } from './FooterDraftContext';

import type { FooterColumnRead } from '@/types/admin';

type FooterColumnCardProps = {
  column: FooterColumnRead;
};

export default function FooterColumnCard({ column }: FooterColumnCardProps) {
  const { draft, update } = useFooterDraft();

  const [newLabel, setNewLabel] = useState('');
  const [newHref, setNewHref] = useState('');

  const staged = draft.columns[column.slug] ?? {};
  const isRemoved = draft.removedColumns.includes(column.slug);

  const links = [...column.links].sort(
    (a, b) => (a.position ?? 0) - (b.position ?? 0),
  );
  const pendingLinks = draft.newLinks.filter(
    (entry) => entry.columnSlug === column.slug,
  );

  function toggleRemoved() {
    update((current) => ({
      ...current,
      removedColumns: isRemoved
        ? current.removedColumns.filter((slug) => slug !== column.slug)
        : [...current.removedColumns, column.slug],
    }));
  }

  function addLink() {
    update((current) => ({
      ...current,
      newLinks: [
        ...current.newLinks,
        {
          columnSlug: column.slug,
          // Position lands it at the end; the slug is derived from the label.
          payload: {
            label: newLabel,
            href: newHref,
            position: links.length + pendingLinks.length,
          },
        },
      ],
    }));

    setNewLabel('');
    setNewHref('');
  }

  function removePendingLink(index: number) {
    update((current) => {
      let seen = -1;

      return {
        ...current,
        newLinks: current.newLinks.filter((entry) => {
          if (entry.columnSlug !== column.slug) return true;

          seen += 1;

          return seen !== index;
        }),
      };
    });
  }

  return (
    <div className="flex w-full flex-col gap-4 rounded-[8px] border border-[#e6ecf4] p-4">
      <div className="flex w-full items-center gap-2">
        <Input
          variant="filled"
          size="medium"
          aria-label="Column heading"
          value={staged.label ?? column.label}
          disabled={isRemoved}
          onChange={(event) =>
            update((current) => ({
              ...current,
              columns: {
                ...current.columns,
                [column.slug]: {
                  ...current.columns[column.slug],
                  label: event.target.value,
                },
              },
            }))
          }
          className={
            isRemoved
              ? 'flex-1 font-semibold line-through opacity-60'
              : 'flex-1 font-semibold'
          }
        />
        <button
          type="button"
          onClick={toggleRemoved}
          aria-label={
            isRemoved
              ? `Keep ${column.label} column`
              : `Remove ${column.label} column`
          }
          className="cursor-pointer p-1 text-slate-500 transition-colors hover:text-red-600"
        >
          {isRemoved ? (
            <span className="text-[12px] whitespace-nowrap">Undo</span>
          ) : (
            <icon.trash className="size-4" />
          )}
        </button>
      </div>

      {!isRemoved && (
        <>
          <div className="flex w-full flex-col gap-2">
            {links.map((link) => (
              <FooterLinkRow
                key={link.id}
                columnSlug={column.slug}
                link={link}
              />
            ))}

            {pendingLinks.map((entry, index) => (
              <div
                key={`pending-${index}`}
                className="flex w-full items-center gap-2"
              >
                <Input
                  variant="filled"
                  size="medium"
                  aria-label="New link label"
                  value={entry.payload.label}
                  readOnly
                  className="flex-1"
                />
                <Input
                  variant="filled"
                  size="medium"
                  aria-label="New link URL"
                  value={entry.payload.href}
                  readOnly
                  className="flex-1"
                />
                <button
                  type="button"
                  onClick={() => removePendingLink(index)}
                  aria-label={`Remove ${entry.payload.label}`}
                  className="cursor-pointer p-1 text-slate-500 transition-colors hover:text-red-600"
                >
                  <icon.trash className="size-4" />
                </button>
              </div>
            ))}
          </div>

          <div className="flex w-full items-center gap-2 border-t border-[#e6ecf4] pt-3">
            <Input
              variant="filled"
              size="medium"
              aria-label="New link label"
              placeholder="New link label"
              value={newLabel}
              onChange={(event) => setNewLabel(event.target.value)}
              className="flex-1"
            />
            <Input
              variant="filled"
              size="medium"
              aria-label="New link URL"
              placeholder="/about"
              value={newHref}
              onChange={(event) => setNewHref(event.target.value)}
              className="flex-1"
            />
            <Button
              variant="outline"
              size="small"
              disabled={!newLabel.trim() || !newHref.trim()}
              onClick={addLink}
            >
              <icon.plus />
              Add link
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
