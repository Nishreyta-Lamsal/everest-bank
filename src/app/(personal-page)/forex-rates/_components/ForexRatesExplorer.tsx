'use client';

import { useState } from 'react';

import ForexFilterBar from './ForexFilterBar';
import ForexRatesTable from './ForexRatesTable';

import { forexPublishedDate, forexUpdatedAt } from '../_data/forex-rates';

import type { ForexRate } from '../_types/forex';

type ForexRatesExplorerProps = {
  rates: ForexRate[];
  defaultTime: string;
};

export default function ForexRatesExplorer({
  rates,
  defaultTime,
}: ForexRatesExplorerProps) {
  const [date, setDate] = useState('');
  const [time, setTime] = useState(defaultTime);

  return (
    <div className="flex w-full flex-col items-start gap-8 lg:gap-13">
      <ForexFilterBar
        date={date}
        onDateChange={setDate}
        time={time}
        onTimeChange={setTime}
      />

      <div className="flex w-full flex-col items-start gap-5">
        <div className="bg-cream-25 flex w-full items-center rounded-[4px] p-5">
          <p className="font-heading text-title-4-desktop text-grey-500">
            Latest Exchange Rates as on {forexPublishedDate}
          </p>
        </div>

        <div className="bg-grey-bluish-grey flex w-full flex-col items-start gap-4 rounded-lg p-5.5">
          <ForexRatesTable rates={rates} />
          <p className="text-caption-1 text-grey-500">
            Page updated at: {forexUpdatedAt}
          </p>
        </div>
      </div>
    </div>
  );
}
