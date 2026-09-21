import Image from 'next/image';

import { icon } from '@/components/icons';

import { cn } from '@/lib/utils';

import { forexColumns } from '../_data/forex-rates';

import type { ForexRate } from '../_types/forex';

type ForexRatesTableProps = {
  rates: ForexRate[];
};

const cellClasses =
  'font-heading text-title-4-desktop text-grey-500 h-[44px] border-b border-[#eaecf0] px-6 py-3 text-left align-middle';

export default function ForexRatesTable({ rates }: ForexRatesTableProps) {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full border-collapse">
        <caption className="sr-only">
          Foreign exchange rates by currency
        </caption>
        <thead>
          <tr>
            {forexColumns.map((column) => (
              <th
                key={column.key}
                scope="col"
                className={cn(
                  'h-[47px] border-b border-[#eaecf0] bg-[#fcfcfd] px-6 py-2 text-left align-top',
                  column.width,
                )}
              >
                <span className="text-grey-400 flex items-start gap-2">
                  <span className="font-heading text-title-4-desktop block whitespace-nowrap">
                    {column.label}
                    {column.subLabel && (
                      <span className="text-caption-1 font-body block">
                        {column.subLabel}
                      </span>
                    )}
                  </span>
                  <icon.arrowBottom
                    aria-hidden="true"
                    className="mt-0.5 size-[12px] shrink-0"
                  />
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rates.map((rate) => (
            <tr key={rate.code}>
              <th scope="row" className={cn(cellClasses, 'font-normal')}>
                <span className="flex items-center gap-1.5">
                  {rate.flag ? (
                    <Image
                      src={rate.flag}
                      alt=""
                      width={14}
                      height={14}
                      unoptimized
                      className="size-[14px] shrink-0 rounded-[2px] object-cover"
                    />
                  ) : (
                    <span
                      aria-hidden="true"
                      className="bg-grey-50 size-[14px] shrink-0 rounded-[2px]"
                    />
                  )}
                  <span className="whitespace-nowrap">{rate.name}</span>
                </span>
              </th>
              <td className={cellClasses}>{rate.unit}</td>
              <td className={cellClasses}>{rate.cashPurchase.toFixed(2)}</td>
              <td className={cellClasses}>
                {rate.docAndCashPurchase.toFixed(2)}
              </td>
              <td className={cellClasses}>{rate.documentSales.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
