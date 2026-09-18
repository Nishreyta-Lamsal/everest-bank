import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import Breadcrumbs from '@/components/ui/navigation/Breadcrumbs';
import CorporateMissionAndVisionHeroSection from './_components/CorporateMissionAndVisionHeroSection';
import CorporateMissionAndVisionStatsSection from './_components/CorporateMissionAndVisionStatsSection';
import CorporateMissionAndVisionContentSection from './_components/CorporateMissionAndVisionContentSection';
import NewsSection from '@/components/shared/news/NewsSection';
import ContactSection from '@/components/shared/content/ContactSection';

import { aboutCorporateMissionAndVisionPageService } from '@/api/services/about/about-corporate-mission-and-vision-page.service';

import { getQueryClient } from '@/lib/get-query-client';
import { getSectionContent } from '@/lib/get-section-content';

import { ROUTE } from '@/constants';

import type { AboutCorporateMissionAndVisionPageSection } from '@/api/services/about/about-corporate-mission-and-vision-page.service';

export const aboutCorporateMissionAndVisionPageQueryKey = [
  'about-corporate-mission-and-vision-page',
] as const;

const fallbackBreadcrumbItems = [
  { label: 'About', href: ROUTE.ABOUT },
  { label: 'Corporate Mission & Vision' },
];

export default async function CorporateMissionAndVisionPage() {
  const queryClient = getQueryClient();

  let sections: AboutCorporateMissionAndVisionPageSection[] | undefined;

  try {
    const { data } = await queryClient.fetchQuery({
      queryKey: aboutCorporateMissionAndVisionPageQueryKey,
      queryFn:
        aboutCorporateMissionAndVisionPageService.getAboutCorporateMissionAndVisionPageData,
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

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="relative">
        <Breadcrumbs items={breadcrumbItems} />
        <CorporateMissionAndVisionHeroSection sections={sections} />
        <CorporateMissionAndVisionStatsSection sections={sections} />
        <CorporateMissionAndVisionContentSection sections={sections} />
        <NewsSection />
        <ContactSection />
      </main>
    </HydrationBoundary>
  );
}
