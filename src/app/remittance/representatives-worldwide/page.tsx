import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import Breadcrumbs from '@/components/ui/navigation/Breadcrumbs';
import MountainHeroSection from '@/components/shared/MountainHeroSection';
import RepresentativesSection from './_components/RepresentativesSection';
import NewsSection from '@/components/shared/news/NewsSection';
import ContactSection from '@/components/shared/content/ContactSection';

import { remittanceRepresentativesWorldwidePageService } from '@/api/services/remittance/remittance-representatives-worldwide-page.service';

import { getQueryClient } from '@/lib/get-query-client';
import { getSectionContent } from '@/lib/get-section-content';

import { ROUTE } from '@/constants';

import type { RemittanceRepresentativesWorldwidePageSection } from '@/api/services/remittance/remittance-representatives-worldwide-page.service';

export const remittanceRepresentativesWorldwidePageQueryKey = [
  'remittance-representatives-worldwide-page',
] as const;

const fallbackBreadcrumbItems = [
  { label: 'Remittance', href: ROUTE.REMITTANCE },
  { label: 'Representatives Worldwide' },
];

export default async function RepresentativesWorldwidePage() {
  const queryClient = getQueryClient();

  let sections: RemittanceRepresentativesWorldwidePageSection[] | undefined;

  try {
    const { data } = await queryClient.fetchQuery({
      queryKey: remittanceRepresentativesWorldwidePageQueryKey,
      queryFn:
        remittanceRepresentativesWorldwidePageService.getRemittanceRepresentativesWorldwidePageData,
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
          heading={heroContent?.heading || 'Representatives Worldwide'}
          buttonLabel={
            heroContent?.button?.label || 'Contact your nearest branch'
          }
          buttonHref={heroContent?.button?.href || ROUTE.BRANCHES}
        />
        <RepresentativesSection sections={sections} />
        <NewsSection />
        <ContactSection />
      </main>
    </HydrationBoundary>
  );
}
