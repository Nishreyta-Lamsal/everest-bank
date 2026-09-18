'use client';

import Breadcrumbs from '@/components/ui/navigation/Breadcrumbs';
import ProfileHeroSection from '@/app/about/profile/_components/ProfileHeroSection';
import ProfileStatsSection from '@/app/about/profile/_components/ProfileStatsSection';
import ProfileContentSection from '@/app/about/profile/_components/ProfileContentSection';
import PreviewSectionHighlight from '@/components/admin/shared/PreviewSectionHighlight';
import { usePageEditor } from '@/store/PageEditorContext';

import { usePage } from '@/hooks/api/admin/use-pages';
import { toPreviewSections } from '@/lib/admin/preview-sections';
import { getSectionContent } from '@/lib/get-section-content';

import type { AboutProfilePageSection } from '@/api/services/about/about-profile-page.service';

type ContentPagePreviewProps = {
  slug: string;
};

export default function ContentPagePreview({ slug }: ContentPagePreviewProps) {
  const { drafts, draftVisibility, focusedSectionType } = usePageEditor();
  const { data: page } = usePage(slug);

  const sections = toPreviewSections(
    page?.sections,
    drafts,
    draftVisibility,
  ) as AboutProfilePageSection[] | undefined;

  const breadcrumbsContent = getSectionContent(sections, 'content_breadcrumbs');
  const breadcrumbItems =
    breadcrumbsContent?.items?.filter((item) => Boolean(item?.label)) ?? [];

  const isBodyFocused =
    focusedSectionType === 'content_body' ||
    focusedSectionType === 'content_sidebar';

  return (
    <main className="relative">
      <Breadcrumbs
        items={
          breadcrumbItems.length
            ? breadcrumbItems
            : [{ label: page?.title ?? '' }]
        }
      />
      <PreviewSectionHighlight
        sectionType="content_hero"
        activeSectionType={focusedSectionType}
      >
        <ProfileHeroSection sections={sections} />
      </PreviewSectionHighlight>
      <PreviewSectionHighlight
        sectionType="content_stats"
        activeSectionType={focusedSectionType}
      >
        <ProfileStatsSection sections={sections} />
      </PreviewSectionHighlight>
      <PreviewSectionHighlight
        sectionType="content_body"
        activeSectionType={isBodyFocused ? 'content_body' : focusedSectionType}
      >
        <ProfileContentSection sections={sections} />
      </PreviewSectionHighlight>
    </main>
  );
}
