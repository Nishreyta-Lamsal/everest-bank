import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import Breadcrumbs from '@/components/ui/navigation/Breadcrumbs';
import DepositHeroSection from './_components/DepositHeroSection';
import DepositProductsSection from './_components/DepositProductsSection';
import MountainDivider from '@/components/shared/MountainDivider';
import DepositStatsSection from './_components/DepositStatsSection';
import DepositRecommendationSection from './_components/DepositRecommendationSection';
import DepositOpenAccountSection from './_components/DepositOpenAccountSection';
import DepositFaqsSection from './_components/DepositFaqsSection';
import ExploreServicesSection from '@/components/shared/ExploreServicesSection';

import { depositPageService } from '@/api/services/personal/deposit-accounts/deposit-page.service';

import { getQueryClient } from '@/lib/get-query-client';
import { getSectionContent } from '@/lib/get-section-content';

import type { DepositPageSection } from '@/api/services/personal/deposit-accounts/deposit-page.service';

export const depositPageQueryKey = ['deposit-page'] as const;

const fallbackBreadcrumbItems = [
  { label: 'Accounts' },
  { label: 'Deposit Accounts' },
];

export default async function DepositAccountsPage() {
  const queryClient = getQueryClient();

  let sections: DepositPageSection[] | undefined;

  try {
    const { data } = await queryClient.fetchQuery({
      queryKey: depositPageQueryKey,
      queryFn: depositPageService.getDepositPage,
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
        <DepositHeroSection sections={sections} />
        <DepositProductsSection sections={sections} />
        <MountainDivider />
        <DepositStatsSection sections={sections} />
        <DepositRecommendationSection sections={sections} />
        <DepositOpenAccountSection sections={sections} />
        <DepositFaqsSection sections={sections} />
        <ExploreServicesSection />
      </main>
    </HydrationBoundary>
  );
}
