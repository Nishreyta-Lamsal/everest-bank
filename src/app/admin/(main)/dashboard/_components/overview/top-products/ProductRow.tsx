import { icon } from '@/components/admin/icons';
import { TableCell, TableRow } from '@/components/admin/ui/table';

import { cn } from '@/lib/utils';

import type { TopProduct } from '../../../_data/dashboard-top-products';

const trendColor: Record<TopProduct['trend'], string> = {
  up: 'text-[#0b9487]',
  down: 'text-[#f04244]',
};

const changeLabelColor: Record<TopProduct['trend'], string> = {
  up: 'text-slate-900',
  down: 'text-[#f04244]',
};

type ProductRowProps = {
  product: TopProduct;
  rank: number;
};

export default function ProductRow({ product, rank }: ProductRowProps) {
  return (
    <TableRow className="h-[48px] border-[#dfdfdf]">
      <TableCell className="w-[240px] px-2 whitespace-nowrap text-[#0c0c0c]">
        <span className="text-paragraph-sm-medium">
          {rank}. {product.name}
        </span>
      </TableCell>
      <TableCell className="text-paragraph-sm px-4 text-[rgba(15,23,42,0.6)]">
        {product.type}
      </TableCell>
      <TableCell className="text-paragraph-sm-medium px-4 text-[#0c0c0c]">
        {product.views}
      </TableCell>
      <TableCell className="text-paragraph-sm px-4 text-[rgba(15,23,42,0.6)]">
        {product.applications}
      </TableCell>
      <TableCell className="w-[96px] px-4">
        <div className="flex items-center gap-1">
          <p
            className={cn(
              'text-paragraph-sm whitespace-nowrap',
              changeLabelColor[product.trend],
            )}
          >
            {product.changeLabel}
          </p>
          <icon.trendUp className={cn('size-4', trendColor[product.trend])} />
        </div>
      </TableCell>
    </TableRow>
  );
}
