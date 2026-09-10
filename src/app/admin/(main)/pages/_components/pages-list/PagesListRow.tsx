import Link from 'next/link';

import { icon } from '@/components/admin/icons';

import { cn } from '@/lib/utils';
import { formatRelativeTime } from '@/lib/admin/format-relative-time';

import type { Page } from '@/types/admin';

const statusStyles = {
  published: {
    label: 'Published',
    className: 'bg-[#ebfef6] text-[#059669]',
  },
  draft: {
    label: 'Draft',
    className: 'bg-[#edf2f7] text-[#65738a]',
  },
} as const;

type PagesListRowProps = {
  page: Page;
};

export default function PagesListRow({ page }: PagesListRowProps) {
  const status = statusStyles[page.is_active === false ? 'draft' : 'published'];
  const sectionsLabel = `${page.sections_count} section${page.sections_count === 1 ? '' : 's'}`;
  const updatedLabel = `updated ${formatRelativeTime(page.updated_at)}`;

  return (
    <Link href={`/pages/${page.slug}`} className="flex w-full items-center">
      <div className="flex h-[74px] min-w-0 flex-1 items-center gap-4 px-4">
        <icon.dragHandle className="size-4 shrink-0 text-slate-950" />
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex shrink-0 items-center rounded-[4px] bg-slate-100 p-3">
            <icon.pageText className="size-6 text-slate-950" />
          </div>
          <div className="flex min-w-0 flex-col gap-1.5">
            <p className="truncate text-[16px] leading-[1.3] text-neutral-700">
              {page.title}
            </p>
            <p className="truncate text-[12px] leading-[1.3] text-neutral-700/68">
              {page.path} · {sectionsLabel} · {updatedLabel}
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
