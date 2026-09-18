import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import Breadcrumbs from '@/components/ui/navigation/Breadcrumbs';
import CardsHeroSection from './_components/CardsHeroSection';
import CardsTrustBarSection from './_components/CardsTrustBarSection';
import CardsNetworkSection from './_components/CardsNetworkSection';
import MountainDivider from '@/components/shared/MountainDivider';
import CardsCreditSection from './_components/CardsCreditSection';
import CardsDebitSection from './_components/CardsDebitSection';
import CardsTravelSection from './_components/CardsTravelSection';
import CardsProcessSection from './_components/process/CardsProcessSection';
import CardsFaqsSection from './_components/CardsFaqsSection';
import ExploreServicesSection from '@/components/shared/ExploreServicesSection';

import { cardPageService } from '@/api/services/personal/card/card-page.service';

import { getQueryClient } from '@/lib/get-query-client';
import { getSectionContent } from '@/lib/get-section-content';

import type { CardPageSection } from '@/api/services/personal/card/card-page.service';

export const cardPageQueryKey = ['card-page'] as const;

const fallbackBreadcrumbItems = [{ label: 'Cards' }];

export default async function CardsPage() {
  const queryClient = getQueryClient();

  let sections: CardPageSection[] | undefined;

  try {
    const { data } = await queryClient.fetchQuery({
      queryKey: cardPageQueryKey,
      queryFn: cardPageService.getCardPage,
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
        <CardsHeroSection sections={sections} />
        <CardsTrustBarSection sections={sections} />
        <CardsNetworkSection sections={sections} />
        <MountainDivider />
        <CardsCreditSection sections={sections} />
        <CardsDebitSection sections={sections} />
        <CardsTravelSection sections={sections} />
        <CardsProcessSection sections={sections} />
        <CardsFaqsSection sections={sections} />
        <ExploreServicesSection />
      </main>
    </HydrationBoundary>
  );
}
