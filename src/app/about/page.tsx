import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import Breadcrumbs from '@/components/ui/navigation/Breadcrumbs';
import AboutHeroSection from './_components/AboutHeroSection';
import AboutOverviewSection from './_components/AboutOverviewSection';
import MountainDivider from '@/components/shared/MountainDivider';
import AboutLinksSection from './_components/links/AboutLinksSection';
import AboutLeadershipSection from './_components/AboutLeadershipSection';
import AboutHistorySection from './_components/AboutHistorySection';
import TrustSection from '@/components/shared/TrustSection';
import NewsSection from '@/components/shared/news/NewsSection';
import ContactSection from '@/components/shared/content/ContactSection';

import { aboutPageService } from '@/api/services/about/about-page.service';

import { getQueryClient } from '@/lib/get-query-client';

import type { AboutPageSection } from '@/api/services/about/about-page.service';

export const aboutPageQueryKey = ['about-page'] as const;

const breadcrumbItems = [{ label: 'About' }];

export default async function AboutPage() {
  const queryClient = getQueryClient();

  let sections: AboutPageSection[] | undefined;

  try {
    const { data } = await queryClient.fetchQuery({
      queryKey: aboutPageQueryKey,
      queryFn: aboutPageService.getAboutPageData,
    });
    sections = data.sections;
  } catch {
    sections = undefined;
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="relative">
        <Breadcrumbs items={breadcrumbItems} />
        <AboutHeroSection sections={sections} />
        <AboutOverviewSection sections={sections} />
        <MountainDivider />
        <AboutLinksSection sections={sections} />
        <AboutLeadershipSection sections={sections} />
        <AboutHistorySection sections={sections} />
        <TrustSection sections={sections} />
        <NewsSection />
        <ContactSection />
      </main>
    </HydrationBoundary>
  );
}
