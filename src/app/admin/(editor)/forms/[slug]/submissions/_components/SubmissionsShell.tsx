'use client';

import Link from 'next/link';
import { useState } from 'react';

import Sidebar from '@/components/admin/layouts/sidebar/Sidebar';
import { icon } from '@/components/admin/icons';
import { Button } from '@/components/admin/ui/button';
import { Card } from '@/components/admin/ui/card';
import { Select } from '@/components/admin/ui/select';
import SubmissionDetailModal from './SubmissionDetailModal';
import SubmissionsTable from './SubmissionsTable';
import SummaryPanel from './SummaryPanel';

import { cn } from '@/lib/utils';

import { useCapability, useMe } from '@/hooks/api/admin/use-auth';
import {
  useExportSubmissions,
  useForm,
  useFormFields,
  useFormSubmissions,
  useSubmissionSummary,
  useUpdateSubmissionStatus,
} from '@/hooks/api/admin/use-forms';

import { ADMIN_ROUTE } from '@/constants/admin';

import { SUBMISSION_STATUS_OPTIONS } from './submission-display';

import type { FormSubmission, SubmissionStatus } from '@/types/admin';

const FILTER_OPTIONS = [
  { label: 'All statuses', value: 'all' },
  ...SUBMISSION_STATUS_OPTIONS,
];

type SubmissionsShellProps = {
  slug: string;
};

export default function SubmissionsShell({ slug }: SubmissionsShellProps) {
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [tab, setTab] = useState<'responses' | 'summary'>('responses');

  // Applicant PII. The backend restricts this to Admin and Superadmin; this
  // check only decides whether to render the screen or an explanation.
  const { isPending: isLoadingUser } = useMe();
  const canViewSubmissions = useCapability('submissions.view');

  const { data: form } = useForm(slug);
  const { data: fields = [] } = useFormFields(slug);
  const filterParams =
    statusFilter === 'all'
      ? undefined
      : { status: statusFilter as SubmissionStatus };

  const { data, isPending, isError, refetch } = useFormSubmissions(
    slug,
    filterParams,
  );
  const updateStatus = useUpdateSubmissionStatus(slug);
  const exportSubmissions = useExportSubmissions(slug);
  // Aggregating decrypts every row, so it is only fetched on the summary tab.
  const summary = useSubmissionSummary(
    slug,
    filterParams,
    canViewSubmissions && tab === 'summary',
  );

  const submissions: FormSubmission[] = data?.results ?? [];
  const selected =
    submissions.find((submission) => submission.id === selectedId) ?? null;

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-blue-50">
      <header className="bg-white-alpha-80 sticky top-0 z-10 flex items-center justify-between px-4 py-2.5 backdrop-blur-sm">
        <Link
          href={`${ADMIN_ROUTE.FORMS}/${slug}`}
          className="text-paragraph-sm flex items-center gap-2 text-[#4f4f4f]"
        >
          <icon.arrowLeft className="size-4" />
          {form?.title ?? 'Form'}
        </Link>
      </header>

      <div className="flex min-h-0 flex-1">
        <Sidebar />
        <main className="flex min-h-0 min-w-0 flex-1 flex-col gap-4 overflow-y-auto p-4">
          {isLoadingUser ? (
            <Card className="flex h-[200px] items-center justify-center">
              <p className="text-paragraph-sm text-neutral-700/68">Loading…</p>
            </Card>
          ) : !canViewSubmissions ? (
            <Card className="flex h-[200px] flex-col items-center justify-center gap-2">
              <p className="text-paragraph-sm text-neutral-900">
                You do not have access to submissions.
              </p>
              <p className="text-paragraph-sm text-neutral-700/68">
                Applicant details are restricted to Admins.
              </p>
            </Card>
          ) : (
            <>
              <section className="flex w-full items-center justify-between">
                <div className="flex flex-col gap-1">
                  <p className="text-heading-3 text-neutral-900">Submissions</p>
                  <p className="text-paragraph-sm text-neutral-700">
                    {data?.count ?? submissions.length} received for{' '}
                    {form?.title ?? 'this form'}.
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-[180px]">
                    <Select
                      variant="filled"
                      size="medium"
                      options={FILTER_OPTIONS}
                      value={statusFilter}
                      onValueChange={setStatusFilter}
                    />
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    // Exports what the filter currently shows, not everything.
                    onClick={() => exportSubmissions.mutate(filterParams)}
                    disabled={
                      exportSubmissions.isPending || submissions.length === 0
                    }
                  >
                    <icon.fileText />
                    {exportSubmissions.isPending ? 'Preparing…' : 'Export CSV'}
                  </Button>
                </div>
              </section>

              {exportSubmissions.isError && (
                <p role="alert" className="text-paragraph-sm text-red-600">
                  Could not export submissions. Please try again.
                </p>
              )}

              <div
                role="tablist"
                aria-label="Submission views"
                className="flex items-center gap-2"
              >
                {(['responses', 'summary'] as const).map((value) => (
                  <button
                    key={value}
                    role="tab"
                    type="button"
                    aria-selected={tab === value}
                    onClick={() => setTab(value)}
                    className={cn(
                      'text-paragraph-sm-medium cursor-pointer rounded-full px-4 py-2 capitalize',
                      tab === value
                        ? 'bg-slate-950 text-white'
                        : 'bg-white/50 text-neutral-700',
                    )}
                  >
                    {value}
                  </button>
                ))}
              </div>

              {tab === 'summary' ? (
                summary.isPending ? (
                  <Card className="flex h-[148px] items-center justify-center">
                    <p className="text-paragraph-sm text-neutral-700/68">
                      Building summary…
                    </p>
                  </Card>
                ) : summary.isError ? (
                  <Card className="flex h-[148px] flex-col items-center justify-center gap-3">
                    <p className="text-paragraph-sm text-neutral-700/68">
                      Could not build the summary.
                    </p>
                    <Button
                      type="button"
                      variant="outline"
                      size="small"
                      onClick={() => summary.refetch()}
                    >
                      Try again
                    </Button>
                  </Card>
                ) : (
                  summary.data && <SummaryPanel summary={summary.data} />
                )
              ) : (
                <Card variant="primary" className="w-full overflow-hidden px-2">
                  {isPending && (
                    <div className="flex h-[148px] items-center justify-center">
                      <p className="text-paragraph-sm text-neutral-700/68">
                        Loading submissions…
                      </p>
                    </div>
                  )}

                  {isError && (
                    <div className="flex h-[148px] flex-col items-center justify-center gap-3">
                      <p className="text-paragraph-sm text-neutral-700/68">
                        Could not load submissions.
                      </p>
                      <Button
                        type="button"
                        variant="outline"
                        size="small"
                        onClick={() => refetch()}
                      >
                        Try again
                      </Button>
                    </div>
                  )}

                  {data && submissions.length === 0 && (
                    <div className="flex h-[148px] items-center justify-center">
                      <p className="text-paragraph-sm text-neutral-700/68">
                        No submissions yet.
                      </p>
                    </div>
                  )}

                  {submissions.length > 0 && (
                    <SubmissionsTable
                      submissions={submissions}
                      fields={fields}
                      onSelect={(submission) => setSelectedId(submission.id)}
                    />
                  )}
                </Card>
              )}
            </>
          )}
        </main>
      </div>

      <SubmissionDetailModal
        submission={selected}
        fields={fields}
        isSaving={updateStatus.isPending}
        onStatusChange={(status) =>
          selected && updateStatus.mutate({ submissionId: selected.id, status })
        }
        onClose={() => setSelectedId(null)}
      />
    </div>
  );
}
