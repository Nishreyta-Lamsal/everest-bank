import JobOpeningCard from './JobOpeningCard';

import type { JobCategory } from '../../_data/job-categories';

type JobCategoryGroupProps = {
  category: JobCategory;
};

export default function JobCategoryGroup({ category }: JobCategoryGroupProps) {
  return (
    <div className="flex w-full flex-col items-start gap-6">
      <p className="font-heading text-title-2-desktop text-grey-500 w-full">
        {category.name}
      </p>
      <div className="flex w-full flex-col items-start gap-6 lg:flex-row">
        {category.jobs.map((job) => (
          <div key={job.id} className="w-full min-w-0 lg:flex-1">
            <JobOpeningCard job={job} />
          </div>
        ))}
      </div>
    </div>
  );
}
