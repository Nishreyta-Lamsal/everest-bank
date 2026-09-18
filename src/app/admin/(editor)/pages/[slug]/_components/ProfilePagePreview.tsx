'use client';

import Breadcrumbs from '@/components/ui/navigation/Breadcrumbs';
import ProfileHeroSection from '@/app/about/profile/_components/ProfileHeroSection';
import ProfileStatsSection from '@/app/about/profile/_components/ProfileStatsSection';
import ProfileContentSection from '@/app/about/profile/_components/ProfileContentSection';
import PreviewNewsSection from './PreviewNewsSection';
import ContactSection from '@/components/shared/content/ContactSection';
import PreviewSectionHighlight from '@/components/admin/shared/PreviewSectionHighlight';
import { usePageEditor } from '@/store/PageEditorContext';

import { usePage } from '@/hooks/api/admin/use-pages';
import { useActiveSectionType } from '@/hooks/admin/use-active-section-type';
import { toPreviewSections } from '@/lib/admin/preview-sections';
import { getSectionContent } from '@/lib/get-section-content';

import { ROUTE } from '@/constants';

import type { AboutProfilePageSection } from '@/api/services/about/about-profile-page.service';

type ProfilePagePreviewProps = {
  slug: string;
};

const fallbackBreadcrumbItems = [
  { label: 'About', href: ROUTE.ABOUT },
  { label: 'Profile' },
];

export default function ProfilePagePreview({ slug }: ProfilePagePreviewProps) {
  const { drafts, draftVisibility } = usePageEditor();
  const { data: page } = usePage(slug);

  const activeSectionType = useActiveSectionType(slug);

  const sections = toPreviewSections(
    page?.sections,
    drafts,
    draftVisibility,
  ) as AboutProfilePageSection[] | undefined;

  const breadcrumbsContent = getSectionContent(sections, 'content_breadcrumbs');
  const apiBreadcrumbItems =
    breadcrumbsContent?.items?.filter((item) => Boolean(item?.label)) ?? [];
  const breadcrumbItems = apiBreadcrumbItems.length
    ? apiBreadcrumbItems
    : fallbackBreadcrumbItems;

  return (
    <main className="relative">
      <Breadcrumbs items={breadcrumbItems} />
      <PreviewSectionHighlight
        sectionType="content_hero"
        activeSectionType={activeSectionType}
      >
        <ProfileHeroSection sections={sections} />
      </PreviewSectionHighlight>
      <PreviewSectionHighlight
        sectionType="content_stats"
        activeSectionType={activeSectionType}
      >
        <ProfileStatsSection sections={sections} />
      </PreviewSectionHighlight>
      <PreviewSectionHighlight
        sectionType="content_body"
        activeSectionType={activeSectionType}
      >
        <ProfileContentSection sections={sections} />
      </PreviewSectionHighlight>
      <PreviewNewsSection />
      <ContactSection />
    </main>
  );
}
