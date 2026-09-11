import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/admin/ui/table';
import PageRow from './PageRow';

import type { TopPage } from '../../../_data/dashboard-top-pages';

type PageTableProps = {
  items: TopPage[];
};

export default function PageTable({ items }: PageTableProps) {
  return (
    <Table className="table-fixed">
      <colgroup>
        <col className="w-[240px]" />
        <col />
        <col />
        <col className="w-[96px]" />
      </colgroup>
      <TableHeader>
        <TableRow className="h-[48px] border-[#dfdfdf]">
          <TableHead className="text-paragraph-sm px-2 font-normal text-[rgba(15,23,42,0.6)]">
            Page
          </TableHead>
          <TableHead className="text-paragraph-sm px-4 font-normal text-[rgba(15,23,42,0.6)]">
            Avg view time
          </TableHead>
          <TableHead className="text-paragraph-sm px-4 font-normal text-[rgba(15,23,42,0.6)]">
            Views
          </TableHead>
          <TableHead className="text-paragraph-sm px-4 font-normal text-[rgba(15,23,42,0.6)]">
            7d
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((page) => (
          <PageRow key={page.id} page={page} />
        ))}
      </TableBody>
    </Table>
  );
}
