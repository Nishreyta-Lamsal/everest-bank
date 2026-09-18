'use client';

import BusinessHeroSection from '@/app/business/_components/BusinessHeroSection';
import BusinessProductsSection from '@/app/business/_components/BusinessProductsSection';
import MountainDivider from '@/components/shared/MountainDivider';
import BusinessFinancingSection from '@/app/business/_components/financing/BusinessFinancingSection';
import BusinessDigitalBankingSection from '@/app/business/_components/BusinessDigitalBankingSection';
import BusinessIndustriesSection from '@/app/business/_components/BusinessIndustriesSection';
import BusinessRelationshipManagerSection from '@/app/business/_components/BusinessRelationshipManagerSection';
import BusinessTrustSection from '@/app/business/_components/BusinessTrustSection';
import PreviewNewsSection from './PreviewNewsSection';
import ContactSection from '@/components/shared/content/ContactSection';
import PreviewSectionHighlight from '@/components/admin/shared/PreviewSectionHighlight';
import { usePageEditor } from '@/store/PageEditorContext';

import { usePage } from '@/hooks/api/admin/use-pages';
import { useActiveSectionType } from '@/hooks/admin/use-active-section-type';
import { toPreviewSections } from '@/lib/admin/preview-sections';

import type { BusinessPageSection } from '@/api/services/business/business-page.service';

type BusinessPagePreviewProps = {
  slug: string;
};

export default function BusinessPagePreview({
  slug,
}: BusinessPagePreviewProps) {
  const { drafts, draftVisibility } = usePageEditor();
  const { data: page } = usePage(slug);

  const activeSectionType = useActiveSectionType(slug);

  const sections = toPreviewSections(
    page?.sections,
    drafts,
    draftVisibility,
  ) as BusinessPageSection[] | undefined;

  return (
    <main>
      <PreviewSectionHighlight
        sectionType="business_hero"
        activeSectionType={activeSectionType}
      >
        <BusinessHeroSection sections={sections} />
      </PreviewSectionHighlight>
      <PreviewSectionHighlight
        sectionType="business_products"
        activeSectionType={activeSectionType}
      >
        <BusinessProductsSection sections={sections} />
      </PreviewSectionHighlight>
      <MountainDivider />
      <PreviewSectionHighlight
        sectionType="business_financing"
        activeSectionType={activeSectionType}
      >
        <BusinessFinancingSection sections={sections} />
      </PreviewSectionHighlight>
      <PreviewSectionHighlight
        sectionType="business_digital_banking"
        activeSectionType={activeSectionType}
      >
        <BusinessDigitalBankingSection sections={sections} />
      </PreviewSectionHighlight>
      <PreviewSectionHighlight
        sectionType="business_industries"
        activeSectionType={activeSectionType}
      >
        <BusinessIndustriesSection sections={sections} />
      </PreviewSectionHighlight>
      <PreviewSectionHighlight
        sectionType="business_relationship_managers"
        activeSectionType={activeSectionType}
      >
        <BusinessRelationshipManagerSection sections={sections} />
      </PreviewSectionHighlight>
      <PreviewSectionHighlight
        sectionType="business_trust"
        activeSectionType={activeSectionType}
      >
        <BusinessTrustSection sections={sections} />
      </PreviewSectionHighlight>
      <PreviewNewsSection />
      <ContactSection />
    </main>
  );
}
