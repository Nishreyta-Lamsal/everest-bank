'use client';

import RemittanceHeroSection from '@/app/remittance/_components/RemittanceHeroSection';
import RemittanceServicesSection from '@/app/remittance/_components/RemittanceServicesSection';
import MountainDivider from '@/components/shared/MountainDivider';
import RemittanceWhySection from '@/app/remittance/_components/RemittanceWhySection';
import RemittanceTrustSection from '@/app/remittance/_components/RemittanceTrustSection';
import OpenAccountSection from '@/components/shared/OpenAccountSection';
import FaqSection from '@/components/shared/faqs/FaqSection';
import { usePageEditor } from '@/store/PageEditorContext';

import { usePage } from '@/hooks/api/admin/use-pages';
import { toPreviewSections } from '@/lib/admin/preview-sections';
import { getSectionContent } from '@/lib/get-section-content';

import { remittanceFaqs } from '@/app/remittance/_data/remittance-faqs';

import type { RemittancePageSection } from '@/api/services/remittance/remittance-page.service';

type RemittancePagePreviewProps = {
  slug: string;
};

export default function RemittancePagePreview({
  slug,
}: RemittancePagePreviewProps) {
  const { drafts, draftVisibility } = usePageEditor();
  const { data: page } = usePage(slug);

  const sections = toPreviewSections(
    page?.sections,
    drafts,
    draftVisibility,
  ) as RemittancePageSection[] | undefined;

  const openAccount = getSectionContent(sections, 'remittance_open_account');
  const faqs = getSectionContent(sections, 'remittance_faqs');

  return (
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
  );
}
