'use client';

import Breadcrumbs from '@/components/ui/navigation/Breadcrumbs';
import AboutHeroSection from '@/app/about/_components/AboutHeroSection';
import AboutOverviewSection from '@/app/about/_components/AboutOverviewSection';
import MountainDivider from '@/components/shared/MountainDivider';
import AboutLinksSection from '@/app/about/_components/links/AboutLinksSection';
import AboutLeadershipSection from '@/app/about/_components/AboutLeadershipSection';
import AboutHistorySection from '@/app/about/_components/AboutHistorySection';
import TrustSection from '@/components/shared/TrustSection';
import PreviewNewsSection from './PreviewNewsSection';
import ContactSection from '@/components/shared/content/ContactSection';
import PreviewSectionHighlight from '@/components/admin/shared/PreviewSectionHighlight';
import { usePageEditor } from '@/store/PageEditorContext';

import { usePage } from '@/hooks/api/admin/use-pages';
import { useActiveSectionType } from '@/hooks/admin/use-active-section-type';
import { toPreviewSections } from '@/lib/admin/preview-sections';

import type { AboutPageSection } from '@/api/services/about/about-page.service';

type AboutPagePreviewProps = {
  slug: string;
};

const breadcrumbItems = [{ label: 'About' }];

export default function AboutPagePreview({ slug }: AboutPagePreviewProps) {
  const { drafts, draftVisibility } = usePageEditor();
  const { data: page } = usePage(slug);

  const activeSectionType = useActiveSectionType(slug);

  const sections = toPreviewSections(
    page?.sections,
    drafts,
    draftVisibility,
  ) as AboutPageSection[] | undefined;

  return (
    <main className="relative">
      <Breadcrumbs items={breadcrumbItems} />
      <PreviewSectionHighlight
        sectionType="about_hero"
        activeSectionType={activeSectionType}
      >
        <AboutHeroSection sections={sections} />
      </PreviewSectionHighlight>
      <PreviewSectionHighlight
        sectionType="about_overview"
        activeSectionType={activeSectionType}
      >
        <AboutOverviewSection sections={sections} />
      </PreviewSectionHighlight>
      <MountainDivider />
      <PreviewSectionHighlight
        sectionType="about_links"
        activeSectionType={activeSectionType}
      >
        <AboutLinksSection sections={sections} />
      </PreviewSectionHighlight>
      <PreviewSectionHighlight
        sectionType="about_leadership"
        activeSectionType={activeSectionType}
      >
        <AboutLeadershipSection sections={sections} />
      </PreviewSectionHighlight>
      <PreviewSectionHighlight
        sectionType="about_history"
        activeSectionType={activeSectionType}
      >
        <AboutHistorySection sections={sections} />
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
