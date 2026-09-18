'use client';

import HeroSection from '@/app/(personal-page)/_components/HeroSection';
import ProductsSection from '@/app/(personal-page)/_components/ProductsSection';
import MountainDivider from '@/components/shared/MountainDivider';
import LoansSection from '@/app/(personal-page)/_components/LoansSection';
import CardsSection from '@/app/(personal-page)/_components/CardsSection';
import AppPromoSection from '@/app/(personal-page)/_components/AppPromoSection';
import CsrSection from '@/app/(personal-page)/_components/CsrSection';
import TrustSection from '@/components/shared/TrustSection';
import PreviewNewsSection from './PreviewNewsSection';
import ContactSection from '@/components/shared/content/ContactSection';
import PreviewSectionHighlight from '@/components/admin/shared/PreviewSectionHighlight';
import { usePageEditor } from '@/store/PageEditorContext';

import { usePage } from '@/hooks/api/admin/use-pages';
import { useActiveSectionType } from '@/hooks/admin/use-active-section-type';
import { toPreviewSections } from '@/lib/admin/preview-sections';

import type { PersonalPageSection } from '@/api/services/personal/personal-page.service';

type PersonalPagePreviewProps = {
  slug: string;
};

/**
 * Client-side mirror of `src/app/(personal-page)/page.tsx`, rendered with the
 * editor's unsaved drafts instead of published data so edits show instantly.
 * Keep the section tree below in sync with that page.
 */
export default function PersonalPagePreview({
  slug,
}: PersonalPagePreviewProps) {
  const { drafts, draftVisibility } = usePageEditor();
  const { data: page } = usePage(slug);

  const activeSectionType = useActiveSectionType(slug);

  const sections = toPreviewSections(
    page?.sections,
    drafts,
    draftVisibility,
  ) as PersonalPageSection[] | undefined;

  return (
    <main>
      <PreviewSectionHighlight
        sectionType="hero"
        activeSectionType={activeSectionType}
      >
        <HeroSection sections={sections} />
      </PreviewSectionHighlight>
      <PreviewSectionHighlight
        sectionType="products"
        activeSectionType={activeSectionType}
      >
        <ProductsSection sections={sections} />
      </PreviewSectionHighlight>
      <MountainDivider />
      <PreviewSectionHighlight
        sectionType="loans_preview"
        activeSectionType={activeSectionType}
      >
        <LoansSection sections={sections} />
      </PreviewSectionHighlight>
      <PreviewSectionHighlight
        sectionType="cards_preview"
        activeSectionType={activeSectionType}
      >
        <CardsSection sections={sections} />
      </PreviewSectionHighlight>
      <PreviewSectionHighlight
        sectionType="app_promo"
        activeSectionType={activeSectionType}
      >
        <AppPromoSection sections={sections} />
      </PreviewSectionHighlight>
      <PreviewSectionHighlight
        sectionType="csr"
        activeSectionType={activeSectionType}
      >
        <CsrSection sections={sections} />
      </PreviewSectionHighlight>
      <PreviewSectionHighlight
        sectionType="trust"
        activeSectionType={activeSectionType}
      >
        <TrustSection sections={sections} />
      </PreviewSectionHighlight>
      <PreviewNewsSection />
      <ContactSection />
    </main>
  );
}
