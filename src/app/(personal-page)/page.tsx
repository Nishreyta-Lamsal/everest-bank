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
  type PersonalPageSection,
} from '@/api/services/personal/personal-page.service';

import { getQueryClient } from '@/lib/get-query-client';

export const personalPageQueryKey = ['personal-page'] as const;

export default async function PersonalPage() {
  const queryClient = getQueryClient();

  let sections: PersonalPageSection[] | undefined;

  try {
    const { data } = await queryClient.fetchQuery({
      queryKey: personalPageQueryKey,
      queryFn: personalPageService.getPersonalPageData,
    });
    sections = data.sections;
  } catch {
    sections = undefined;
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main>
        <HeroSection sections={sections} />
        <ProductsSection sections={sections} />
        <MountainDivider />
        <LoansSection sections={sections} />
        <CardsSection sections={sections} />
        <AppPromoSection sections={sections} />
        <CsrSection sections={sections} />
        <TrustSection sections={sections} />
        <NewsSection />
        <ContactSection />
      </main>
    </HydrationBoundary>
  );
}
