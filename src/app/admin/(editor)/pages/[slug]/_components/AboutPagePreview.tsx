'use client';

import Breadcrumbs from '@/components/ui/navigation/Breadcrumbs';
import AboutHeroSection from '@/app/about/_components/AboutHeroSection';
import AboutOverviewSection from '@/app/about/_components/AboutOverviewSection';
import MountainDivider from '@/components/shared/MountainDivider';
import AboutLinksSection from '@/app/about/_components/links/AboutLinksSection';
import AboutLeadershipSection from '@/app/about/_components/AboutLeadershipSection';
import AboutHistorySection from '@/app/about/_components/AboutHistorySection';
import TrustSection from '@/components/shared/TrustSection';
import NewsSection from '@/components/shared/news/NewsSection';
import ContactSection from '@/components/shared/content/ContactSection';
import { usePageEditor } from '@/store/PageEditorContext';

import { usePage } from '@/hooks/api/admin/use-pages';
import { toPreviewSections } from '@/lib/admin/preview-sections';

import type { AboutPageSection } from '@/api/services/about/about-page.service';

type AboutPagePreviewProps = {
  slug: string;
};

const breadcrumbItems = [{ label: 'About' }];

export default function AboutPagePreview({ slug }: AboutPagePreviewProps) {
  const { drafts, draftVisibility } = usePageEditor();
  const { data: page } = usePage(slug);

  const sections = toPreviewSections(
    page?.sections,
    drafts,
    draftVisibility,
  ) as AboutPageSection[] | undefined;

  return (
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
  );
}
