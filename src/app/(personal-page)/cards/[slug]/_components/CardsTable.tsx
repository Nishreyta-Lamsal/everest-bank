import { cn } from '@/lib/utils';

import type { CardLimitsTableRow } from '../_data';

type CardsTableProps = {
  heading: string;
  columnHeaders: [string, string, string];
  rows: CardLimitsTableRow[];
};

export default function CardsTable({
  heading,
  columnHeaders,
  rows,
}: CardsTableProps) {
  const [labelHeader, nepalHeader, indiaHeader] = columnHeaders;

  return (
    <div className="flex w-full flex-col items-start gap-4 lg:gap-6">
      <h3 className="font-heading text-heading-h4-mobile-md lg:text-heading-h4-desktop-md text-grey-500">
        {heading}
      </h3>
      <div className="bg-grey-bluish-grey w-full overflow-x-auto rounded-lg p-4 lg:p-[22px]">
        <table className="w-full min-w-[600px] border-collapse">
          <thead>
            <tr>
              <th className="border-b border-[#eaecf0] px-6 py-4 text-left">
                <span className="font-heading text-title-4-desktop-md text-grey-500">
                  {labelHeader}
                </span>
              </th>
              <th className="w-[130px] border-b border-[#eaecf0] px-6 py-4 text-left">
                <span className="font-heading text-title-4-desktop-md text-grey-500">
                  {nepalHeader}
                </span>
              </th>
              <th className="w-[127px] border-b border-[#eaecf0] px-6 py-4 text-left">
                <span className="font-heading text-title-4-desktop-md text-grey-500">
                  {indiaHeader}
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={`${row.label}-${index}`}>
                <td
                  className={cn(
                    'border-b border-[#eaecf0] py-4',
                    row.isGroupHeader ? 'px-6' : 'pr-8 pl-10',
                  )}
                >
                  <span
                    className={cn(
                      row.isGroupHeader
                        ? 'font-heading text-title-4-desktop text-grey-500'
                        : 'text-body-4-desktop text-grey-400',
                    )}
                  >
                    {row.label}
                  </span>
                </td>
                <td className="border-b border-[#eaecf0] px-6 py-3">
                  {row.nepal && (
                    <span className="font-heading text-title-4-desktop text-grey-400">
                      {row.nepal}
                    </span>
                  )}
                </td>
                <td className="border-b border-[#eaecf0] px-6 py-3">
                  {row.india && (
                    <span className="font-heading text-title-4-desktop text-grey-400">
                      {row.india}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
