import Link from 'next/link';

import { icon } from '@/components/admin/icons';

import { cn } from '@/lib/utils';

import type { ProductsListEntry, ProductsListStatus } from '@/data/admin';

const statusStyles: Record<
  ProductsListStatus,
  { label: string; className: string }
> = {
  published: {
    label: 'Published',
    className: 'bg-[#ebfef6] text-[#059669]',
  },
  draft: {
    label: 'Draft',
    className: 'bg-[#edf2f7] text-[#65738a]',
  },
};

type ProductsListRowProps = {
  entry: ProductsListEntry;
};

export default function ProductsListRow({ entry }: ProductsListRowProps) {
  const status = statusStyles[entry.status];
  const sectionsLabel =
    entry.sectionsCount !== undefined
      ? `${entry.sectionsCount} section${entry.sectionsCount === 1 ? '' : 's'}`
      : undefined;
  const meta = entry.rateLabel
    ? `${entry.path} · ${entry.updatedLabel} · ${entry.rateLabel}`
    : `${entry.path} · ${sectionsLabel} · ${entry.updatedLabel}`;

  return (
    <Link href={`/products/${entry.id}`} className="flex w-full items-center">
      <div className="flex h-[74px] min-w-0 flex-1 items-center gap-4 px-4">
        <icon.dragHandle className="size-4 shrink-0 text-slate-950" />
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex shrink-0 items-center rounded-[4px] bg-slate-100 p-3">
            <icon.bank className="size-6 text-slate-950" />
          </div>
          <div className="flex min-w-0 flex-col gap-1.5">
            <p className="truncate text-[16px] leading-[1.3] text-neutral-700">
              {entry.title}
            </p>
            <p className="truncate text-[12px] leading-[1.3] text-neutral-700/68">
              {meta}
            </p>
          </div>
        </div>
      </div>
      <div className="flex h-[74px] shrink-0 items-center gap-4 px-4">
        <span
          className={cn(
            'text-paragraph-sm-medium flex items-center justify-center gap-1.5 rounded-full px-3 py-2',
            status.className,
          )}
        >
          {status.label}
        </span>
        <icon.chevronRight className="size-[16px] shrink-0 text-[#7d7c7d]" />
      </div>
    </Link>
  );
}
