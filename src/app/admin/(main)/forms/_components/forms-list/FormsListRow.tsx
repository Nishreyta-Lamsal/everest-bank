import Link from 'next/link';

import { icon } from '@/components/admin/icons';

import { cn } from '@/lib/utils';
import { formatRelativeTime } from '@/lib/admin/format-relative-time';

import { ADMIN_ROUTE } from '@/constants/admin';

import type { Form, FormStatus } from '@/types/admin';

const statusStyles: Record<FormStatus, { label: string; className: string }> = {
  published: { label: 'Published', className: 'bg-[#ebfef6] text-[#059669]' },
  draft: { label: 'Draft', className: 'bg-[#edf2f7] text-[#65738a]' },
  archived: { label: 'Archived', className: 'bg-[#fef3f2] text-[#b42318]' },
};

function plural(count: number, noun: string) {
  return `${count} ${noun}${count === 1 ? '' : 's'}`;
}

type FormsListRowProps = {
  form: Form;
};

export default function FormsListRow({ form }: FormsListRowProps) {
  const status = statusStyles[form.status] ?? statusStyles.draft;

  return (
    <Link
      href={`${ADMIN_ROUTE.FORMS}/${form.slug}`}
      className="flex w-full items-center"
    >
      <div className="flex h-[74px] min-w-0 flex-1 items-center gap-4 px-4">
        <div className="flex shrink-0 items-center rounded-[4px] bg-slate-100 p-3">
          <icon.fileText className="size-6 text-slate-950" />
        </div>
        <div className="flex min-w-0 flex-col gap-1.5">
          <p className="truncate text-[16px] leading-[1.3] text-neutral-700">
            {form.title}
          </p>
          <p className="truncate text-[12px] leading-[1.3] text-neutral-700/68">
            /{form.slug} · {plural(form.fields_count, 'field')} ·{' '}
            {plural(form.submissions_count, 'submission')} · updated{' '}
            {formatRelativeTime(form.updated_at)}
          </p>
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
