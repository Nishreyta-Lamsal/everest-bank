'use client';

import RemittanceHeroSection from '@/app/remittance/_components/RemittanceHeroSection';
import RemittanceServicesSection from '@/app/remittance/_components/RemittanceServicesSection';
import MountainDivider from '@/components/shared/MountainDivider';
import RemittanceWhySection from '@/app/remittance/_components/RemittanceWhySection';
import RemittanceTrustSection from '@/app/remittance/_components/RemittanceTrustSection';
import OpenAccountSection from '@/components/shared/OpenAccountSection';
import FaqSection from '@/components/shared/faqs/FaqSection';
import PreviewSectionHighlight from '@/components/admin/shared/PreviewSectionHighlight';
import { usePageEditor } from '@/store/PageEditorContext';

import { usePage } from '@/hooks/api/admin/use-pages';
import { useActiveSectionType } from '@/hooks/admin/use-active-section-type';
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

  const activeSectionType = useActiveSectionType(slug);

  const sections = toPreviewSections(
    page?.sections,
    drafts,
    draftVisibility,
  ) as RemittancePageSection[] | undefined;

  const openAccount = getSectionContent(sections, 'remittance_open_account');
  const faqs = getSectionContent(sections, 'remittance_faqs');

  return (
    <main>
      <PreviewSectionHighlight
        sectionType="remittance_hero"
        activeSectionType={activeSectionType}
      >
        <RemittanceHeroSection sections={sections} />
      </PreviewSectionHighlight>
      <PreviewSectionHighlight
        sectionType="remittance_services"
        activeSectionType={activeSectionType}
      >
        <RemittanceServicesSection sections={sections} />
      </PreviewSectionHighlight>
      <MountainDivider />
      <PreviewSectionHighlight
        sectionType="remittance_why"
        activeSectionType={activeSectionType}
      >
        <RemittanceWhySection sections={sections} />
      </PreviewSectionHighlight>
      <PreviewSectionHighlight
        sectionType="remittance_trust"
        activeSectionType={activeSectionType}
      >
        <RemittanceTrustSection sections={sections} />
      </PreviewSectionHighlight>
      <PreviewSectionHighlight
        sectionType="remittance_open_account"
        activeSectionType={activeSectionType}
      >
        <OpenAccountSection
          heading={openAccount?.heading}
          ctaHref={openAccount?.cta?.href}
          ctaLabel={openAccount?.cta?.label}
          videoSrc={openAccount?.video?.src}
          posterSrc={openAccount?.video?.poster?.src}
          posterAlt={openAccount?.video?.poster?.alt}
          features={openAccount?.features}
        />
      </PreviewSectionHighlight>
      <PreviewSectionHighlight
        sectionType="remittance_faqs"
        activeSectionType={activeSectionType}
      >
        <FaqSection
          heading={faqs?.heading || 'Quick FAQs for Remittance'}
          items={faqs?.items || remittanceFaqs}
        />
      </PreviewSectionHighlight>
    </main>
  );
}
