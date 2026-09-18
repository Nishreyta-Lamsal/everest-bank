'use client';

import { TableCell, TableRow } from '@/components/admin/ui/table';
import { Input } from '@/components/admin/ui/input';
import { icon } from '@/components/admin/icons';

import type { ForexRowWrite } from '@/types/admin';

type ForexRateEditRowProps = {
  row: ForexRowWrite;
  onChange: (row: ForexRowWrite) => void;
  onRemove: () => void;
};

const RATE_FIELDS = [
  { key: 'cash_purchase', label: 'Cash purchase' },
  { key: 'doc_cash_purchase', label: 'Doc & cash purchase' },
  { key: 'document_sales', label: 'Document sales' },
] as const;

export default function ForexRateEditRow({
  row,
  onChange,
  onRemove,
}: ForexRateEditRowProps) {
  return (
    <TableRow className="h-[52px] border-[#dfdfdf]">
      <TableCell className="px-4">
        <div className="flex items-center gap-2">
          <Input
            variant="filled"
            size="medium"
            placeholder="Currency name"
            aria-label="Currency name"
            value={row.currency_name}
            onChange={(event) =>
              onChange({ ...row, currency_name: event.target.value })
            }
            className="w-[180px]"
          />
          <Input
            variant="filled"
            size="medium"
            placeholder="CODE"
            aria-label="Currency code"
            value={row.currency_code}
            onChange={(event) =>
              onChange({
                ...row,
                currency_code: event.target.value.toUpperCase(),
              })
            }
            className="w-[86px]"
          />
        </div>
      </TableCell>
      <TableCell className="px-4">
        <Input
          variant="filled"
          size="medium"
          inputMode="numeric"
          aria-label={`Unit for ${row.currency_code}`}
          value={row.unit ?? ''}
          onChange={(event) =>
            onChange({ ...row, unit: Number(event.target.value) || 0 })
          }
          className="w-[80px]"
        />
      </TableCell>
      {RATE_FIELDS.map((field) => (
        <TableCell key={field.key} className="px-4">
          <Input
            variant="filled"
            size="medium"
            inputMode="decimal"
            aria-label={`${field.label} for ${row.currency_code}`}
            value={row[field.key] ?? ''}
            onChange={(event) =>
              onChange({ ...row, [field.key]: event.target.value })
            }
            className="w-[120px]"
          />
        </TableCell>
      ))}
      <TableCell className="px-4">
        <button
          type="button"
          onClick={onRemove}
          aria-label={`Remove ${row.currency_name || 'currency'}`}
          className="cursor-pointer text-slate-500 transition-colors hover:text-red-600"
        >
          <icon.trash className="size-4" />
        </button>
      </TableCell>
    </TableRow>
  );
}
