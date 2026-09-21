import LayoutWrapper from '@/components/layouts/wrapper/LayoutWrapper';
import JobOpeningList from './jobs/JobOpeningList';

import { getSectionContent } from '@/lib/get-section-content';

import type { AboutCareersPageSection } from '@/api/services/about/about-careers-page.service';
import type { JobCategory } from '../_data/job-categories';

type CareersJobsSectionProps = {
  sections?: AboutCareersPageSection[];
};

export default function CareersJobsSection({
  sections,
}: CareersJobsSectionProps) {
  const jobsContent = getSectionContent(sections, 'content_jobs');

  const categories: JobCategory[] =
    jobsContent?.groups
      ?.filter((group) => group.jobs.some((job) => Boolean(job.title)))
      .map((group, index) => ({
        id: String(index),
        name: group.heading,
        jobs: group.jobs
          .filter((job) => Boolean(job.title))
          .map((job) => ({
            id: job.id,
            title: job.title,
            description: job.description,
            location: job.location,
            employmentType: job.employment_type,
            applyHref: job.apply_href || '#',
          })),
      })) ?? [];

  return (
    <section className="w-full py-16 lg:py-24">
      <LayoutWrapper>
        {categories.length ? (
          <JobOpeningList categories={categories} />
        ) : (
          <p className="text-body-3-desktop text-grey-400 w-full">
            There are no open positions at the moment.
          </p>
        )}
      </LayoutWrapper>
    </section>
  );
}
