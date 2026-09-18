'use client';

import Modal from '@/components/ui/modal/Modal';
import { Select } from '@/components/admin/ui/select';

import { cn } from '@/lib/utils';

import {
  SUBMISSION_STATUS_OPTIONS,
  SUBMISSION_STATUS_STYLES,
  orderedAnswers,
} from './submission-display';

import type {
  FormField,
  FormSubmission,
  SubmissionStatus,
} from '@/types/admin';

type SubmissionDetailModalProps = {
  submission: FormSubmission | null;
  fields: FormField[];
  isSaving: boolean;
  onStatusChange: (status: SubmissionStatus) => void;
  onClose: () => void;
};

export default function SubmissionDetailModal({
  submission,
  fields,
  isSaving,
  onStatusChange,
  onClose,
}: SubmissionDetailModalProps) {
  if (!submission) return null;

  const badge = SUBMISSION_STATUS_STYLES[submission.status];
  const answers = orderedAnswers(submission, fields);

  return (
    <Modal
      isOpen
      onClose={onClose}
      title={`Submission #${submission.id}`}
      className="max-w-lg"
    >
      <div className="flex w-full flex-col gap-4 px-5 py-4">
        <div className="flex items-center justify-between gap-3">
          <span
            className={cn(
              'text-paragraph-sm-medium flex items-center rounded-full px-3 py-1',
              badge.className,
            )}
          >
            {badge.label}
          </span>
          <div className="w-[160px]">
            <Select
              variant="filled"
              size="small"
              options={SUBMISSION_STATUS_OPTIONS}
              value={submission.status}
              disabled={isSaving}
              onValueChange={(value) =>
                onStatusChange(value as SubmissionStatus)
              }
            />
          </div>
        </div>

        {submission.data === null ? (
          <p className="rounded-lg bg-red-50 px-3 py-2.5 text-[12px] text-red-700">
            This submission could not be decrypted. It was most likely encrypted
            with a key that is no longer configured.
          </p>
        ) : (
          <dl className="flex w-full flex-col divide-y divide-black/5">
            {answers.map((answer) => (
              <div key={answer.key} className="flex flex-col gap-1 py-2.5">
                <dt className="text-[11px] font-medium tracking-wide text-neutral-700/68 uppercase">
                  {answer.label}
                </dt>
                <dd className="text-[14px] break-words text-neutral-900">
                  {answer.value}
                </dd>
              </div>
            ))}
            {answers.length === 0 && (
              <p className="py-2.5 text-[12px] text-neutral-700/68">
                No answers were recorded.
              </p>
            )}
          </dl>
        )}

        <div className="flex flex-col gap-1 border-t border-black/5 pt-3">
          <p className="text-[11px] text-neutral-700/68">
            Received {new Date(submission.created_at).toLocaleString()}
          </p>
          {submission.ip_address && (
            <p className="text-[11px] text-neutral-700/68">
              IP {submission.ip_address}
            </p>
          )}
        </div>
      </div>
    </Modal>
  );
}
