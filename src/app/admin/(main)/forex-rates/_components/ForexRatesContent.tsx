'use client';

import { useState } from 'react';

import ForexRateEditRow from './ForexRateEditRow';
import { Badge } from '@/components/admin/ui/badge';
import { Button } from '@/components/admin/ui/button';
import { Card } from '@/components/admin/ui/card';
import { Input } from '@/components/admin/ui/input';
import { Select } from '@/components/admin/ui/select';
import { icon } from '@/components/admin/icons';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/admin/ui/table';

import {
  useForexTables,
  useImportForexRates,
  usePublishForexRates,
  useUpdateForexRates,
} from '@/hooks/api/admin/use-forex';
import { readApiError } from '@/lib/admin/read-api-error';
import { emptyForexRow, toForexRowsWrite } from '@/lib/admin/forex-rows';
import { todayIsoDate } from '@/lib/forex-rates';

import type { ForexRowWrite } from '@/types/admin';

const COLUMNS = [
  'Currency',
  'Unit',
  'Cash Purchase',
  'Doc & Cash (Purchase)',
  'Document (Sales)',
];

export default function ForexRatesContent() {
  // Defaults to today so the first fetch always names a date.
  const [date, setDate] = useState(todayIsoDate);
  const [time, setTime] = useState('');
  const [editedRows, setEditedRows] = useState<ForexRowWrite[] | null>(null);

  const { data: dayTables, isPending, isError } = useForexTables(date);

  const tables = dayTables?.tables ?? [];
  // Each import adds a table to the date, so the newest is the default view.
  const selectedTable =
    tables.find((table) => table.time === time) ?? tables[tables.length - 1];
  const day = selectedTable;

  const updateRates = useUpdateForexRates(date, selectedTable?.time);
  const importRates = useImportForexRates();
  const publishRates = usePublishForexRates();

  // The fetched table is the source of truth until something is edited, so a
  // refetch (after an import or publish) shows the server's rows again.
  const rows = editedRows ?? toForexRowsWrite(day?.rows);
  const hasUnsavedEdits = editedRows !== null;

  function updateRow(index: number, next: ForexRowWrite) {
    setEditedRows(rows.map((row, i) => (i === index ? next : row)));
  }

  function addRow() {
    setEditedRows([...rows, emptyForexRow(rows.length)]);
  }

  function removeRow(index: number) {
    setEditedRows(rows.filter((_, i) => i !== index));
  }

  if (isPending) {
    return (
      <Card className="w-full">
        <div className="flex w-full flex-col gap-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="h-[48px] w-full animate-pulse rounded-[6px] bg-slate-100"
            />
          ))}
        </div>
      </Card>
    );
  }

  // The API requires these on every row, so an incomplete one blocks the save
  // here rather than coming back as a validation error.
  const hasIncompleteRow = rows.some(
    (row) =>
      !row.currency_code.trim() ||
      !row.currency_name.trim() ||
      !row.cash_purchase.trim() ||
      !row.document_sales.trim(),
  );

  const mutationError =
    updateRates.error ?? importRates.error ?? publishRates.error;
  const isBusy =
    updateRates.isPending || importRates.isPending || publishRates.isPending;

  return (
    <Card className="w-full">
      <div className="flex w-full flex-col gap-6">
        <div className="flex w-full flex-wrap items-end justify-between gap-4">
          <div className="flex flex-col gap-1">
            <p className="text-[12px] font-medium text-slate-950 opacity-[0.68]">
              Rate date
            </p>
            <div className="flex items-center gap-3">
              <Input
                type="date"
                variant="filled"
                size="medium"
                value={date}
                onChange={(event) => {
                  setEditedRows(null);
                  // Times belong to a date, so a stale one would match nothing.
                  setTime('');
                  setDate(event.target.value);
                }}
                className="w-[180px]"
              />
              {/* Each import adds a table to the date, so they're picked apart
                  by the time they were stamped with. */}
              {tables.length > 1 && (
                <Select
                  options={tables.map((table) => ({
                    label: table.time ?? '—',
                    value: table.time ?? '',
                  }))}
                  value={selectedTable?.time ?? ''}
                  onValueChange={(next) => {
                    setEditedRows(null);
                    setTime(next);
                  }}
                  className="w-[140px]"
                />
              )}
              {day?.is_published ? (
                <Badge variant="success">Published</Badge>
              ) : null}
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Only offered once a value is actually edited by hand. */}
            {hasUnsavedEdits && (
              <Button
                variant="secondary"
                disabled={isBusy || hasIncompleteRow}
                onClick={() =>
                  updateRates.mutate(
                    { rows },
                    { onSuccess: () => setEditedRows(null) },
                  )
                }
              >
                {updateRates.isPending ? 'Saving…' : 'Save changes'}
              </Button>
            )}
            <Button
              variant="outline"
              disabled={isBusy}
              onClick={() =>
                importRates.mutate(
                  { date },
                  {
                    onSuccess: (imported) => {
                      setEditedRows(null);
                      // Jump to the table the import just created.
                      setTime(imported.time ?? '');
                    },
                  },
                )
              }
            >
              {importRates.isPending ? 'Importing…' : 'Import'}
            </Button>
            <Button
              variant="primary"
              disabled={isBusy || rows.length === 0 || hasUnsavedEdits}
              onClick={() =>
                publishRates.mutate({ date, time: selectedTable?.time })
              }
            >
              {publishRates.isPending ? 'Publishing…' : 'Publish'}
            </Button>
          </div>
        </div>

        {rows.length === 0 ? (
          <p className="text-[14px] text-neutral-700 opacity-[0.72]">
            {isError
              ? 'Could not load the rates for this date.'
              : 'No rates for this date yet. Import them, or enter them by hand.'}
          </p>
        ) : (
          <div className="w-full overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-[#dfdfdf]">
                  {COLUMNS.map((column) => (
                    <TableHead
                      key={column}
                      className="text-paragraph-sm-medium px-4 whitespace-nowrap text-[rgba(15,23,42,0.6)]"
                    >
                      {column}
                    </TableHead>
                  ))}
                  <TableHead className="w-[56px] px-4">
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((row, index) => (
                  <ForexRateEditRow
                    key={index}
                    row={row}
                    onChange={(next) => updateRow(index, next)}
                    onRemove={() => removeRow(index)}
                  />
                ))}
              </TableBody>
            </Table>
          </div>
        )}

        <div>
          <Button variant="outline" size="small" onClick={addRow}>
            <icon.plus />
            Add currency
          </Button>
        </div>

        {day?.updated_at && (
          <p className="text-paragraph-mini text-[rgba(15,23,42,0.6)]">
            Last updated {new Date(day.updated_at).toLocaleString()}
            {day.source ? ` · source: ${day.source}` : ''}
          </p>
        )}

        {hasUnsavedEdits && hasIncompleteRow && (
          <p className="text-[12px] text-amber-700">
            Every currency needs a name, code, cash purchase and document sales
            value before it can be saved.
          </p>
        )}

        {Boolean(mutationError) && (
          <p className="text-[12px] text-red-600">
            {readApiError(mutationError, 'Could not update the forex rates.')}
          </p>
        )}
      </div>
    </Card>
  );
}
