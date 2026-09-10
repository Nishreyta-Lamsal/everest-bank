import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/admin/ui/table';
import ForexRateRow from './ForexRateRow';

import type { ForexRate } from '../../../_data/dashboard-forex-rates';

type ForexRateTableProps = {
  items: ForexRate[];
};

export default function ForexRateTable({ items }: ForexRateTableProps) {
  return (
    <Table className="table-fixed">
      <colgroup>
        <col className="w-[164px]" />
        <col />
        <col />
      </colgroup>
      <TableHeader>
        <TableRow className="h-[48px] border-[#dfdfdf]">
          <TableHead className="text-paragraph-sm px-2 font-normal text-[rgba(15,23,42,0.6)]">
            Currency
          </TableHead>
          <TableHead className="text-paragraph-sm px-4 font-normal text-[rgba(15,23,42,0.6)]">
            Buy
          </TableHead>
          <TableHead className="text-paragraph-sm px-4 font-normal text-[rgba(15,23,42,0.6)]">
            Sell
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((rate) => (
          <ForexRateRow key={rate.id} rate={rate} />
        ))}
      </TableBody>
    </Table>
  );
}
