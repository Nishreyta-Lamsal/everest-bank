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
import { usePageEditor } from '@/store/PageEditorContext';

import { usePage } from '@/hooks/api/admin/use-pages';
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

  const sections = toPreviewSections(
    page?.sections,
    drafts,
    draftVisibility,
  ) as BusinessPageSection[] | undefined;

  return (
    <main>
      <BusinessHeroSection sections={sections} />
      <BusinessProductsSection sections={sections} />
      <MountainDivider />
      <BusinessFinancingSection sections={sections} />
      <BusinessDigitalBankingSection sections={sections} />
      <BusinessIndustriesSection sections={sections} />
      <BusinessRelationshipManagerSection sections={sections} />
      <BusinessTrustSection sections={sections} />
      <PreviewNewsSection />
      <ContactSection />
    </main>
  );
}
