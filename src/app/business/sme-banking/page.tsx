import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import Breadcrumbs from '@/components/ui/navigation/Breadcrumbs';
import SmeHeroSection from './_components/SmeHeroSection';
import SmeProductsSection from './_components/SmeProductsSection';
import MountainDivider from '@/components/shared/MountainDivider';
import SmeStatsSection from './_components/SmeStatsSection';
import SmeFinancingSection from './_components/SmeFinancingSection';
import SmeOpenAccountSection from './_components/SmeOpenAccountSection';
import SmeFaqsSection from './_components/SmeFaqsSection';
import ExploreServicesSection from '@/components/shared/ExploreServicesSection';

import { smePageService } from '@/api/services/business/sme-page.service';

import { getQueryClient } from '@/lib/get-query-client';
import { getSectionContent } from '@/lib/get-section-content';

import { ROUTE } from '@/constants';

import type { SmePageSection } from '@/api/services/business/sme-page.service';

export const smePageQueryKey = ['sme-page'] as const;

const fallbackBreadcrumbItems = [
  { label: 'Business', href: ROUTE.BUSINESS },
  { label: 'SME Banking' },
];

export default async function SMEBankingPage() {
  const queryClient = getQueryClient();

  let sections: SmePageSection[] | undefined;

  try {
    const { data } = await queryClient.fetchQuery({
      queryKey: smePageQueryKey,
      queryFn: smePageService.getSmePage,
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
        <SmeHeroSection sections={sections} />
        <SmeProductsSection sections={sections} />
        <MountainDivider />
        <SmeStatsSection sections={sections} />
        <SmeFinancingSection sections={sections} />
        <SmeOpenAccountSection sections={sections} />
        <SmeFaqsSection sections={sections} />
        <ExploreServicesSection />
      </main>
    </HydrationBoundary>
  );
}
