'use client';

import { Card } from '@/components/admin/ui/card';
import OptionBarChart from './OptionBarChart';
import ResponsesTimeline from './ResponsesTimeline';
import StatTile from './StatTile';

import type { SubmissionSummary, SummaryField } from '@/types/admin';

function FieldCard({ field }: { field: SummaryField }) {
  const answeredLabel =
    field.skipped > 0
      ? `${field.answered} answered · ${field.skipped} skipped`
      : `${field.answered} answered`;

  return (
    <Card className="flex w-full flex-col gap-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 flex-col gap-0.5">
          <p className="truncate text-[15px] font-semibold text-neutral-900">
            {field.label}
          </p>
          <p className="text-[12px] text-neutral-700/68">{answeredLabel}</p>
        </div>
        {!field.is_active && (
          <span className="shrink-0 rounded-full bg-slate-100 px-2 py-1 text-[11px] text-neutral-600">
            Hidden field
          </span>
        )}
      </div>

      {field.options.length > 0 && (
        <OptionBarChart options={field.options} answered={field.answered} />
      )}

      {field.stats && (
        <div className="flex gap-3">
          <StatTile label="Lowest" value={field.stats.min.toLocaleString()} />
          <StatTile
            label="Average"
            value={Math.round(field.stats.average).toLocaleString()}
          />
          <StatTile label="Highest" value={field.stats.max.toLocaleString()} />
        </div>
      )}

      {!field.chartable && !field.stats && (
        <p className="rounded-lg bg-slate-50 px-3 py-2.5 text-[12px] text-neutral-700/68">
          Written answers are not charted. Open the Responses tab to read them
          one at a time, or export the CSV.
        </p>
      )}
    </Card>
  );
}

type SummaryPanelProps = {
  summary: SubmissionSummary;
};

export default function SummaryPanel({ summary }: SummaryPanelProps) {
  if (summary.total === 0) {
    return (
      <Card className="flex h-[148px] items-center justify-center">
        <p className="text-paragraph-sm text-neutral-700/68">
          No responses yet.
        </p>
      </Card>
    );
  }

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex flex-wrap gap-3">
        <StatTile label="Total responses" value={summary.total} />
        {summary.by_status.map((status) => (
          <StatTile
            key={status.status}
            label={status.label}
            value={status.count}
          />
        ))}
      </div>

      {summary.undecryptable > 0 && (
        <p
          role="alert"
          className="rounded-lg bg-red-50 px-3 py-2.5 text-[12px] text-red-700"
        >
          {summary.undecryptable} response
          {summary.undecryptable === 1 ? '' : 's'} could not be decrypted and
          are counted in the total but not in any chart below.
        </p>
      )}

      {summary.by_day.length > 1 && (
        <Card className="flex w-full flex-col gap-3">
          <p className="text-[15px] font-semibold text-neutral-900">
            Responses over time
          </p>
          <ResponsesTimeline points={summary.by_day} />
        </Card>
      )}

      {summary.fields.map((field) => (
        <FieldCard key={field.name} field={field} />
      ))}
    </div>
  );
}
