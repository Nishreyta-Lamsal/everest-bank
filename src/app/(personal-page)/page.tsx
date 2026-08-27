import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import HeroSection from './_components/HeroSection';
import ProductsSection from './_components/ProductsSection';
import MountainDivider from '@/components/shared/MountainDivider';
import LoansSection from './_components/LoansSection';
import CardsSection from './_components/CardsSection';
import AppPromoSection from './_components/AppPromoSection';
import CsrSection from './_components/CsrSection';
import TrustSection from '@/components/shared/TrustSection';
import NewsSection from '@/components/shared/news/NewsSection';
import ContactSection from '@/components/shared/content/ContactSection';

import {
  personalPageService,
  type PersonalPageResponse,
} from '@/api/services/personal/personal-page.service';

import { getQueryClient } from '@/lib/get-query-client';

export const personalPageQueryKey = ['personal-page'] as const;

export default async function PersonalPage() {
  const queryClient = getQueryClient();

  let data: PersonalPageResponse['data'] | undefined;

  try {
    ({ data } = await queryClient.fetchQuery({
      queryKey: personalPageQueryKey,
      queryFn: personalPageService.getPersonalPageData,
    }));
  } catch {
    data = undefined;
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main>
        <HeroSection sections={data?.sections} />
        <ProductsSection />
        <MountainDivider />
        <LoansSection sections={data?.sections} />
        <CardsSection sections={data?.sections} />
        <AppPromoSection sections={data?.sections} />
        <CsrSection sections={data?.sections} />
        <TrustSection sections={data?.sections} />
        <NewsSection />
        <ContactSection />
      </main>
    </HydrationBoundary>
  );
}
