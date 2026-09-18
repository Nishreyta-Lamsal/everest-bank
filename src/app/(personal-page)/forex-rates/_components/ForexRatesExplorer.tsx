'use client';

import { useState } from 'react';

import ForexFilterBar from './ForexFilterBar';
import ForexRatesTable from './ForexRatesTable';

import { useForexDayTables } from '@/hooks/api/use-forex-rates';

import { formatForexDate, toForexRates } from '@/lib/forex-rates';

import { forexPublishedDate, forexUpdatedAt } from '../_data/forex-rates';

import type { ForexRate } from '../_types/forex';

type ForexRatesExplorerProps = {
  rates: ForexRate[];
  publishedDate?: string;
  publishedTime?: string;
  updatedAt?: string;
};

export default function ForexRatesExplorer({
  rates,
  publishedDate,
  publishedTime,
  updatedAt,
}: ForexRatesExplorerProps) {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const { data: day, isFetching } = useForexDayTables(date);

  const tables = day?.tables ?? [];
  const timeOptions = tables
    .filter((table) => Boolean(table.time))
    .map((table) => ({ label: table.time!, value: table.time! }));

  const selectedTable =
    tables.find((table) => table.time === time) ?? tables[0];

  const selectedRates = date ? toForexRates(selectedTable?.rows ?? []) : rates;
  const selectedDate = date ? day?.date : publishedDate;
  const selectedTime = date ? selectedTable?.time : publishedTime;
  const selectedUpdatedAt = date ? selectedTable?.updated_at : updatedAt;
  const hasNoRates = Boolean(date) && !isFetching && selectedRates.length === 0;

  function handleDateChange(nextDate: string) {
    setTime('');
    setDate(nextDate);
  }

  return (
    <div className="flex w-full flex-col items-start gap-8 lg:gap-13">
      <ForexFilterBar
        date={date}
        onDateChange={handleDateChange}
        time={selectedTime ?? ''}
        onTimeChange={setTime}
        timeOptions={timeOptions}
      />

      <div className="flex w-full flex-col items-start gap-5">
        <div className="bg-cream-25 flex w-full items-center rounded-[4px] p-5">
          <p className="font-heading text-title-4-desktop text-grey-500">
            {hasNoRates
              ? `No published rates for ${formatForexDate(date)}`
              : `Latest Exchange Rates as on ${
                  formatForexDate(selectedDate) || forexPublishedDate
                }${selectedTime ? ` at ${selectedTime}` : ''}`}
          </p>
        </div>

        <div className="bg-grey-bluish-grey flex w-full flex-col items-start gap-4 rounded-lg p-5.5">
          {hasNoRates ? (
            <p className="text-body-3-desktop text-grey-400 w-full py-10 text-center">
              Rates for this date have not been published. Try another date.
            </p>
          ) : (
            <ForexRatesTable rates={selectedRates} />
          )}
          <p className="text-caption-1 text-grey-500">
            Page updated at:{' '}
            {selectedUpdatedAt
              ? new Date(selectedUpdatedAt)
                  .toLocaleString('sv-SE')
                  .replace('T', ' ')
              : forexUpdatedAt}
          </p>
        </div>
      </div>
    </div>
  );
}
