import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/admin/ui/table';
import ProductRow from './ProductRow';

import type { TopProduct } from '../../../_data/dashboard-top-products';

type ProductTableProps = {
  items: TopProduct[];
};

export default function ProductTable({ items }: ProductTableProps) {
  return (
    <Table className="table-fixed">
      <colgroup>
        <col className="w-[240px]" />
        <col />
        <col />
        <col />
        <col className="w-[96px]" />
      </colgroup>
      <TableHeader>
        <TableRow className="h-[48px] border-[#dfdfdf]">
          <TableHead className="text-paragraph-sm px-2 font-normal text-[rgba(15,23,42,0.6)]">
            Product
          </TableHead>
          <TableHead className="text-paragraph-sm px-4 font-normal text-[rgba(15,23,42,0.6)]">
            Type
          </TableHead>
          <TableHead className="text-paragraph-sm px-4 font-normal text-[rgba(15,23,42,0.6)]">
            Views
          </TableHead>
          <TableHead className="text-paragraph-sm px-4 font-normal text-[rgba(15,23,42,0.6)]">
            Applications
          </TableHead>
          <TableHead className="text-paragraph-sm px-4 font-normal text-[rgba(15,23,42,0.6)]">
            7d
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((product, index) => (
          <ProductRow key={product.id} product={product} rank={index + 1} />
        ))}
      </TableBody>
    </Table>
  );
}
