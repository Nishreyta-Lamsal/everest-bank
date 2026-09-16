import type {
  FormField,
  FormSubmission,
  SubmissionStatus,
} from '@/types/admin';

export const SUBMISSION_STATUS_STYLES: Record<
  SubmissionStatus,
  { label: string; className: string }
> = {
  new: { label: 'New', className: 'bg-[#eff6ff] text-[#1d4ed8]' },
  reviewed: { label: 'Reviewed', className: 'bg-[#ebfef6] text-[#059669]' },
  archived: { label: 'Archived', className: 'bg-[#edf2f7] text-[#65738a]' },
};

export const SUBMISSION_STATUS_OPTIONS = [
  { label: 'New', value: 'new' },
  { label: 'Reviewed', value: 'reviewed' },
  { label: 'Archived', value: 'archived' },
];

/**
 * Turn a raw answer into something readable. Choice fields store the option
 * value, so the label is looked up; otherwise the value is shown as typed.
 */
export function displayValue(field: FormField | undefined, value: unknown) {
  if (value === null || value === undefined || value === '') return '—';
  if (typeof value === 'boolean') return value ? 'Yes' : 'No';

  if (field) {
    const options =
      field.options_source === 'static'
        ? field.options
        : field.resolved_options;
    const match = options.find((option) => option.value === String(value));
    if (match) return match.label;
  }

  return String(value);
}

/**
 * Answers in field order, including fields hidden or removed since, so an old
 * submission still reads correctly. Keys with no matching field are appended.
 */
export function orderedAnswers(
  submission: FormSubmission,
  fields: FormField[],
): { key: string; label: string; value: string }[] {
  const data = submission.data ?? {};
  const seen = new Set<string>();

  const known = fields
    .filter((field) => field.name in data)
    .map((field) => {
      seen.add(field.name);
      return {
        key: field.name,
        label: field.label,
        value: displayValue(field, data[field.name]),
      };
    });

  const orphaned = Object.keys(data)
    .filter((key) => !seen.has(key))
    .map((key) => ({
      key,
      label: key,
      value: displayValue(undefined, data[key]),
    }));

  return [...known, ...orphaned];
}

/** First few answers, for the table's summary column. */
export function summarise(
  submission: FormSubmission,
  fields: FormField[],
  limit = 2,
) {
  return orderedAnswers(submission, fields).slice(0, limit);
}
