import JobCategoryGroup from './JobCategoryGroup';

import type { JobCategory } from '../../_data/job-categories';

type JobOpeningListProps = {
  categories: JobCategory[];
};

export default function JobOpeningList({ categories }: JobOpeningListProps) {
  return (
    <div className="flex w-full flex-col items-start gap-16">
      {categories.map((category) => (
        <JobCategoryGroup key={category.id} category={category} />
      ))}
    </div>
  );
}
