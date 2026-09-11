import { TableCell, TableRow } from '@/components/admin/ui/table';

import type { ForexRate } from '../../../_data/dashboard-forex-rates';

type ForexRateRowProps = {
  rate: ForexRate;
};

export default function ForexRateRow({ rate }: ForexRateRowProps) {
  return (
    <TableRow className="h-[48px] border-[#dfdfdf]">
      <TableCell className="text-paragraph-sm-medium w-[164px] px-2 whitespace-nowrap text-[#0c0c0c]">
        {rate.currency}
      </TableCell>
      <TableCell className="text-paragraph-sm-medium px-4 text-[#0c0c0c]">
        {rate.buy}
      </TableCell>
      <TableCell className="text-paragraph-sm-medium px-4 text-[#0c0c0c]">
        {rate.sell}
      </TableCell>
    </TableRow>
  );
}
