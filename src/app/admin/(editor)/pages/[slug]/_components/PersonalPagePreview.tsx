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
import { usePageEditor } from '@/store/PageEditorContext';

import { usePage } from '@/hooks/api/admin/use-pages';
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

  const sections = toPreviewSections(
    page?.sections,
    drafts,
    draftVisibility,
  ) as PersonalPageSection[] | undefined;

  return (
    <main>
      <HeroSection sections={sections} />
      <ProductsSection sections={sections} />
      <MountainDivider />
      <LoansSection sections={sections} />
      <CardsSection sections={sections} />
      <AppPromoSection sections={sections} />
      <CsrSection sections={sections} />
      <TrustSection sections={sections} />
      <PreviewNewsSection />
      <ContactSection />
    </main>
  );
}
