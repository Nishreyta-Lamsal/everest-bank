import LayoutWrapper from '@/components/layouts/wrapper/LayoutWrapper';
import JobOpeningList from './jobs/JobOpeningList';

import { jobCategories } from '../_data/job-categories';

export default function CareersJobsSection() {
  return (
    <section className="w-full py-16 lg:py-24">
      <LayoutWrapper>
        <JobOpeningList categories={jobCategories} />
      </LayoutWrapper>
    </section>
  );
}
