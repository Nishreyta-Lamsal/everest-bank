'use client';

import { useState } from 'react';

import FooterColumnCard from './FooterColumnCard';
import { Button } from '@/components/admin/ui/button';
import { Card } from '@/components/admin/ui/card';
import { Input } from '@/components/admin/ui/input';
import { icon } from '@/components/admin/icons';

import { useFooterDraft } from './FooterDraftContext';
import { useFooterColumns } from '@/hooks/api/admin/use-footer';

export default function FooterColumnsCard() {
  const [newLabel, setNewLabel] = useState('');

  const { draft, update } = useFooterDraft();
  const { data: columns, isPending, isError } = useFooterColumns();

  const sorted = [...(columns ?? [])].sort(
    (a, b) => (a.position ?? 0) - (b.position ?? 0),
  );

  function addColumn() {
    update((current) => ({
      ...current,
      newColumns: [
        ...current.newColumns,
        {
          label: newLabel,
          position: sorted.length + current.newColumns.length,
        },
      ],
    }));

    setNewLabel('');
  }

  return (
    <Card className="w-full">
      <div className="flex w-full flex-col gap-4">
        <div className="flex flex-col gap-1">
          <p className="text-[16px] font-semibold text-neutral-900">
            Link columns
          </p>
          <p className="text-paragraph-sm text-neutral-700">
            Each column is a heading with its links, shown in order.
          </p>
        </div>

        {isPending && (
          <div className="flex w-full flex-col gap-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="h-[96px] w-full animate-pulse rounded-[8px] bg-slate-100"
              />
            ))}
          </div>
        )}

        {isError && (
          <p className="text-[14px] text-neutral-700 opacity-[0.72]">
            Could not load the footer columns.
          </p>
        )}

        {sorted.map((column) => (
          <FooterColumnCard key={column.id} column={column} />
        ))}

        {draft.newColumns.map((column, index) => (
          <div
            key={`pending-column-${index}`}
            className="flex w-full items-center gap-2 rounded-[8px] border border-dashed border-[#e6ecf4] p-4"
          >
            <Input
              variant="filled"
              size="medium"
              aria-label="New column heading"
              value={column.label}
              readOnly
              className="flex-1 font-semibold"
            />
            <span className="text-[12px] whitespace-nowrap text-slate-500">
              Links can be added once saved
            </span>
            <button
              type="button"
              onClick={() =>
                update((current) => ({
                  ...current,
                  newColumns: current.newColumns.filter((_, i) => i !== index),
                }))
              }
              aria-label={`Remove ${column.label}`}
              className="cursor-pointer p-1 text-slate-500 transition-colors hover:text-red-600"
            >
              <icon.trash className="size-4" />
            </button>
          </div>
        ))}

        <div className="flex w-full items-center gap-2">
          <Input
            variant="filled"
            size="medium"
            aria-label="New column heading"
            placeholder="New column heading"
            value={newLabel}
            onChange={(event) => setNewLabel(event.target.value)}
            className="flex-1"
          />
          <Button
            variant="outline"
            size="small"
            disabled={!newLabel.trim()}
            onClick={addColumn}
          >
            <icon.plus />
            Add column
          </Button>
        </div>
      </div>
    </Card>
  );
}
