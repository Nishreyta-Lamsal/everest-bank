import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import HeroSection from './_components/HeroSection';
import ProductsSection from './_components/ProductsSection';
import MountainDivider from '@/components/shared/MountainDivider';
import LoansSection from './_components/LoansSection';
import CardsSection from './_components/CardsSection';
import AppPromoSection from './_components/AppPromoSection';
import CsrSection from './_components/CsrSection';
import TrustSection from './_components/TrustSection';
import NewsSection from '@/components/shared/news/NewsSection';
import ContactSection from '@/components/shared/content/ContactSection';

import { getQueryClient } from '@/lib/get-query-client';

import { personalPageService } from '@/api/services/personal/personal-page.service';

export const personalPageQueryKey = ['personal-page'] as const;

export default async function PersonalPage() {
  const queryClient = getQueryClient();

  const { data } = await queryClient.fetchQuery({
    queryKey: personalPageQueryKey,
    queryFn: personalPageService.getPersonalPageData,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main>
        <HeroSection sections={data.sections} />
        <ProductsSection />
        <MountainDivider />
        <LoansSection />
        <CardsSection />
        <AppPromoSection />
        <CsrSection />
        <TrustSection />
        <NewsSection />
        <ContactSection />
      </main>
    </HydrationBoundary>
  );
}
