'use client';

import FieldLabel from '@/components/admin/shared/FieldLabel';
import { Input } from '@/components/admin/ui/input';

import type { CardTableContent } from '@/types/admin';

type CardTableFieldGroupProps = {
  label: string;
  table: CardTableContent;
  onChange: (table: CardTableContent) => void;
};

export default function CardTableFieldGroup({
  label,
  table,
  onChange,
}: CardTableFieldGroupProps) {
  const rows = table.rows ?? [];

  function updateRow(index: number, next: (typeof rows)[number]) {
    onChange({
      ...table,
      rows: rows.map((row, i) => (i === index ? next : row)),
    });
  }

  return (
    <div className="flex w-full flex-col gap-3 rounded-[6px] border border-[#e6ecf4] p-3">
      <p className="min-w-0 truncate text-[13px] font-semibold text-neutral-900">
        {label}
        {table.heading ? ` · ${table.heading}` : ''}
      </p>

      <FieldLabel label="Heading">
        <Input
          variant="filled"
          size="medium"
          value={table.heading ?? ''}
          onChange={(event) =>
            onChange({ ...table, heading: event.target.value })
          }
        />
      </FieldLabel>

      {rows.map((row, index) => (
        <div
          key={index}
          className="flex w-full flex-col gap-3 rounded-[6px] border border-[#e6ecf4] p-3"
        >
          <FieldLabel label={`Row ${index + 1}`}>
            <Input
              variant="filled"
              size="medium"
              placeholder="Label"
              value={row.label ?? ''}
              onChange={(event) =>
                updateRow(index, { ...row, label: event.target.value })
              }
            />
          </FieldLabel>

          {/* Group headers span the table, so they carry no per-country values. */}
          {!row.is_group_header && (
            <div className="flex w-full gap-3">
              <FieldLabel label={table.column_headers?.[1] ?? 'Nepal'}>
                <Input
                  variant="filled"
                  size="medium"
                  value={row.nepal ?? ''}
                  onChange={(event) =>
                    updateRow(index, { ...row, nepal: event.target.value })
                  }
                />
              </FieldLabel>
              <FieldLabel label={table.column_headers?.[2] ?? 'India'}>
                <Input
                  variant="filled"
                  size="medium"
                  value={row.india ?? ''}
                  onChange={(event) =>
                    updateRow(index, { ...row, india: event.target.value })
                  }
                />
              </FieldLabel>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
