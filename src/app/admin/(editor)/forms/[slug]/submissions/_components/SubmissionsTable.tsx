'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/admin/ui/table';

import { cn } from '@/lib/utils';
import { formatRelativeTime } from '@/lib/admin/format-relative-time';

import { SUBMISSION_STATUS_STYLES, summarise } from './submission-display';

import type { FormField, FormSubmission } from '@/types/admin';

type SubmissionsTableProps = {
  submissions: FormSubmission[];
  fields: FormField[];
  onSelect: (submission: FormSubmission) => void;
};

export default function SubmissionsTable({
  submissions,
  fields,
  onSelect,
}: SubmissionsTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Submission</TableHead>
          <TableHead>Received</TableHead>
          <TableHead className="text-right">Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {submissions.map((submission) => {
          const badge = SUBMISSION_STATUS_STYLES[submission.status];
          const summary = summarise(submission, fields);

          return (
            <TableRow
              key={submission.id}
              onClick={() => onSelect(submission)}
              className="cursor-pointer"
            >
              <TableCell className="py-3">
                <div className="flex min-w-0 flex-col gap-1">
                  <span className="truncate text-[14px] text-neutral-900">
                    {summary.length > 0
                      ? summary.map((answer) => answer.value).join(' · ')
                      : `Submission #${submission.id}`}
                  </span>
                  <span className="truncate text-[12px] text-neutral-700/68">
                    {summary.map((answer) => answer.label).join(' · ') ||
                      'No answers recorded'}
                  </span>
                </div>
              </TableCell>
              <TableCell className="py-3 text-[12px] text-neutral-700/68">
                {formatRelativeTime(submission.created_at)}
              </TableCell>
              <TableCell className="py-3 text-right">
                <span
                  className={cn(
                    'text-paragraph-sm-medium inline-flex items-center rounded-full px-3 py-1',
                    badge.className,
                  )}
                >
                  {badge.label}
                </span>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
