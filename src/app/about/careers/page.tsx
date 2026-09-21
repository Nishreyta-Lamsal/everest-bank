import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import Breadcrumbs from '@/components/ui/navigation/Breadcrumbs';
import MountainHeroSection from '@/components/shared/MountainHeroSection';
import CareersJobsSection from './_components/CareersJobsSection';
import ContactSection from '@/components/shared/content/ContactSection';

import { aboutCareersPageService } from '@/api/services/about/about-careers-page.service';

import { getQueryClient } from '@/lib/get-query-client';
import { getSectionContent } from '@/lib/get-section-content';

import { ROUTE } from '@/constants';

import type { AboutCareersPageSection } from '@/api/services/about/about-careers-page.service';

export const aboutCareersPageQueryKey = ['about-careers-page'] as const;

const fallbackBreadcrumbItems = [
  { label: 'About', href: ROUTE.ABOUT },
  { label: 'Careers' },
];

export default async function CareersPage() {
  const queryClient = getQueryClient();

  let sections: AboutCareersPageSection[] | undefined;

  try {
    const { data } = await queryClient.fetchQuery({
      queryKey: aboutCareersPageQueryKey,
      queryFn: aboutCareersPageService.getAboutCareersPageData,
    });
    sections = data.sections;
  } catch {
    sections = undefined;
  }

  const breadcrumbsContent = getSectionContent(sections, 'content_breadcrumbs');
  const apiBreadcrumbItems =
    breadcrumbsContent?.items?.filter((item) => Boolean(item?.label)) ?? [];
  const breadcrumbItems = apiBreadcrumbItems.length
    ? apiBreadcrumbItems
    : fallbackBreadcrumbItems;

  const heroContent = getSectionContent(sections, 'content_hero');

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="relative">
        <Breadcrumbs items={breadcrumbItems} tone="dark" />
        <MountainHeroSection
          heading={heroContent?.heading || 'Careers'}
          buttonLabel={
            heroContent?.button?.label || 'Contact your nearest branch'
          }
          buttonHref={heroContent?.button?.href || ROUTE.BRANCHES}
        />
        <CareersJobsSection sections={sections} />
        <ContactSection />
      </main>
    </HydrationBoundary>
  );
}
