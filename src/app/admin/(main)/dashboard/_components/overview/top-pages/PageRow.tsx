import { icon } from '@/components/admin/icons';
import { TableCell, TableRow } from '@/components/admin/ui/table';

import { cn } from '@/lib/utils';

import type { TopPage } from '../../../_data/dashboard-top-pages';

const trendColor: Record<TopPage['trend'], string> = {
  up: 'text-[#0b9487]',
  down: 'text-[#f04244]',
};

const changeLabelColor: Record<TopPage['trend'], string> = {
  up: 'text-slate-900',
  down: 'text-[#f04244]',
};

type PageRowProps = {
  page: TopPage;
};

export default function PageRow({ page }: PageRowProps) {
  return (
    <TableRow className="h-[48px] border-[#dfdfdf]">
      <TableCell className="text-paragraph-sm-medium w-[240px] px-2 whitespace-nowrap text-[#0c0c0c]">
        {page.name}
      </TableCell>
      <TableCell className="text-paragraph-sm px-4 text-[rgba(15,23,42,0.6)]">
        {page.avgViewTime}
      </TableCell>
      <TableCell className="text-paragraph-sm-medium px-4 text-[#0c0c0c]">
        {page.views}
      </TableCell>
      <TableCell className="w-[96px] px-4">
        <div className="flex items-center gap-1">
          <p
            className={cn(
              'text-paragraph-sm whitespace-nowrap',
              changeLabelColor[page.trend],
            )}
          >
            {page.changeLabel}
          </p>
          <icon.trendUp className={cn('size-4', trendColor[page.trend])} />
        </div>
      </TableCell>
    </TableRow>
  );
}
