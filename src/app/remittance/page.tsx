import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import RemittanceHeroSection from './_components/RemittanceHeroSection';
import RemittanceServicesSection from './_components/RemittanceServicesSection';
import MountainDivider from '@/components/shared/MountainDivider';
import RemittanceWhySection from './_components/RemittanceWhySection';
import RemittanceTrustSection from './_components/RemittanceTrustSection';
import OpenAccountSection from '@/components/shared/OpenAccountSection';
import FaqSection from '@/components/shared/faqs/FaqSection';

import { remittancePageService } from '@/api/services/remittance/remittance-page.service';

import { getQueryClient } from '@/lib/get-query-client';
import { getSectionContent } from '@/lib/get-section-content';

import { remittanceFaqs } from './_data/remittance-faqs';

import type { RemittancePageSection } from '@/api/services/remittance/remittance-page.service';

export const remittancePageQueryKey = ['remittance-page'] as const;

export default async function RemittancePage() {
  const queryClient = getQueryClient();

  let sections: RemittancePageSection[] | undefined;

  try {
    const { data } = await queryClient.fetchQuery({
      queryKey: remittancePageQueryKey,
      queryFn: remittancePageService.getRemittancePageData,
    });
    sections = data.sections;
  } catch {
    sections = undefined;
  }

  const openAccount = getSectionContent(sections, 'remittance_open_account');
  const faqs = getSectionContent(sections, 'remittance_faqs');

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main>
        <RemittanceHeroSection sections={sections} />
        <RemittanceServicesSection sections={sections} />
        <MountainDivider />
        <RemittanceWhySection sections={sections} />
        <RemittanceTrustSection sections={sections} />
        <OpenAccountSection
          heading={openAccount?.heading}
          ctaHref={openAccount?.cta?.href}
          ctaLabel={openAccount?.cta?.label}
          videoSrc={openAccount?.video?.src}
          posterSrc={openAccount?.video?.poster?.src}
          posterAlt={openAccount?.video?.poster?.alt}
          features={openAccount?.features}
        />
        <FaqSection
          heading={faqs?.heading || 'Quick FAQs for Remittance'}
          items={faqs?.items || remittanceFaqs}
        />
      </main>
    </HydrationBoundary>
  );
}
