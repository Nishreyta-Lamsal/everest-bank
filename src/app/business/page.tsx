import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import BusinessHeroSection from './_components/BusinessHeroSection';
import BusinessProductsSection from './_components/BusinessProductsSection';
import MountainDivider from '@/components/shared/MountainDivider';
import BusinessFinancingSection from './_components/financing/BusinessFinancingSection';
import BusinessDigitalBankingSection from './_components/BusinessDigitalBankingSection';
import BusinessIndustriesSection from './_components/BusinessIndustriesSection';
import BusinessTrustSection from './_components/BusinessTrustSection';
import BusinessRelationshipManagerSection from './_components/BusinessRelationshipManagerSection';
import NewsSection from '@/components/shared/news/NewsSection';
import ContactSection from '@/components/shared/content/ContactSection';

import { getQueryClient } from '@/lib/get-query-client';

import { businessPageService } from '@/api/services/business/business-page.service';

import type { BusinessPageSection } from '@/api/services/business/business-page.service';

export const businessPageQueryKey = ['business-page'] as const;

export default async function BusinessPage() {
  const queryClient = getQueryClient();

  let sections: BusinessPageSection[] | undefined;

  try {
    const { data } = await queryClient.fetchQuery({
      queryKey: businessPageQueryKey,
      queryFn: businessPageService.getBusinessPageData,
    });
    sections = data.sections;
  } catch {
    sections = undefined;
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main>
        <BusinessHeroSection sections={sections} />
        <BusinessProductsSection sections={sections} />
        <MountainDivider />
        <BusinessFinancingSection sections={sections} />
        <BusinessDigitalBankingSection sections={sections} />
        <BusinessIndustriesSection sections={sections} />
        <BusinessRelationshipManagerSection sections={sections} />
        <BusinessTrustSection sections={sections} />
        <NewsSection />
        <ContactSection />
      </main>
    </HydrationBoundary>
  );
}
