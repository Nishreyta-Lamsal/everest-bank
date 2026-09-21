import Link from 'next/link';

import { icon } from '@/components/icons';

import type { JobOpening } from '../../_data/job-categories';

type JobOpeningCardProps = {
  job: JobOpening;
};

export default function JobOpeningCard({ job }: JobOpeningCardProps) {
  return (
    <div className="border-grey-25 flex w-full items-start justify-between gap-6 rounded-lg border border-solid bg-white p-6">
      <div className="flex flex-col items-start gap-6">
        <div className="flex flex-col items-start gap-3">
          <p className="font-heading text-heading-h4-desktop-md text-neutral-800">
            {job.title}
          </p>
          <p className="text-body-3-desktop text-grey-400">{job.description}</p>
        </div>
        <div className="flex flex-wrap items-start gap-2">
          <span className="border-grey-50 flex items-center justify-center gap-1.5 rounded-full border border-solid px-2.5 py-1.5">
            <icon.mapPin className="text-grey-400 size-4" />
            <span className="text-body-4-desktop text-grey-400">
              {job.location}
            </span>
          </span>
          <span className="border-grey-50 flex items-center justify-center gap-1.5 rounded-full border border-solid px-2.5 py-1.5">
            <icon.clock className="text-grey-400 size-4" />
            <span className="text-body-4-desktop text-grey-400">
              {job.employmentType}
            </span>
          </span>
        </div>
      </div>
      <Link
        href={job.applyHref}
        className="text-body-4-desktop-md flex shrink-0 items-center gap-1 whitespace-nowrap text-red-700"
      >
        Apply now
        <icon.arrowUpRight className="size-4" />
      </Link>
    </div>
  );
}
