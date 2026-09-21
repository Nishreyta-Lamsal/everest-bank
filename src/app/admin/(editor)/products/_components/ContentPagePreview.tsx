'use client';

import { useQuery } from '@tanstack/react-query';

import Breadcrumbs from '@/components/ui/navigation/Breadcrumbs';
import ProfileHeroSection from '@/app/about/profile/_components/ProfileHeroSection';
import ProfileStatsSection from '@/app/about/profile/_components/ProfileStatsSection';
import ProfileContentSection from '@/app/about/profile/_components/ProfileContentSection';
import BoardOfDirectorsHeroSection from '@/app/about/board-of-directors/_components/BoardOfDirectorsHeroSection';
import BoardOfDirectorsContentSection from '@/app/about/board-of-directors/_components/BoardOfDirectorsContentSection';
import PreviewSectionHighlight from '@/components/admin/shared/PreviewSectionHighlight';
import { icon } from '@/components/icons';
import { usePageEditor } from '@/store/PageEditorContext';

import { usePage } from '@/hooks/api/admin/use-pages';
import { socialLinksService } from '@/api/services/social-links.service';
import { toPreviewSections } from '@/lib/admin/preview-sections';
import { getSectionContent } from '@/lib/get-section-content';

import { socialIconMap } from '@/constants/social-icon-map';

import type { AboutProfilePageSection } from '@/api/services/about/about-profile-page.service';
import type { AboutBoardOfDirectorsPageSection } from '@/api/services/about/about-board-of-directors-page.service';

type ContentPagePreviewProps = {
  slug: string;
};

export default function ContentPagePreview({ slug }: ContentPagePreviewProps) {
  const { drafts, draftVisibility, focusedSectionType, focusedItemId } =
    usePageEditor();
  const { data: page } = usePage(slug);

  const isBoardOfDirectors = slug.includes('board-of-directors');

  const { data: socialLinksData } = useQuery({
    queryKey: ['footer-social-links'],
    queryFn: () => socialLinksService.getSocialLinks(),
    enabled: isBoardOfDirectors,
  });

  const socialLinks = socialLinksData?.data.map((link) => ({
    label: link.label,
    href: link.href,
    icon: socialIconMap[link.slug] ?? icon.x,
  }));

  const rawSections = toPreviewSections(
    page?.sections,
    drafts,
    draftVisibility,
  );

  const sections = rawSections as AboutProfilePageSection[] | undefined;
  const boardSections = rawSections as
    AboutBoardOfDirectorsPageSection[] | undefined;

  const breadcrumbsContent = getSectionContent(sections, 'content_breadcrumbs');
  const breadcrumbItems =
    breadcrumbsContent?.items?.filter((item) => Boolean(item?.label)) ?? [];

  const isBodyFocused =
    focusedSectionType === 'content_body' ||
    focusedSectionType === 'content_sidebar';

  const breadcrumbsNode = (
    <Breadcrumbs
      items={
        breadcrumbItems.length
          ? breadcrumbItems
          : [{ label: page?.title ?? '' }]
      }
    />
  );

  if (isBoardOfDirectors) {
    return (
      <main className="relative">
        {breadcrumbsNode}
        <PreviewSectionHighlight
          sectionType="content_hero"
          activeSectionType={focusedSectionType}
        >
          <BoardOfDirectorsHeroSection sections={boardSections} />
        </PreviewSectionHighlight>
        <BoardOfDirectorsContentSection
          sections={boardSections}
          relatedPages={page?.related_pages}
          socialLinks={socialLinks}
          activeDirectorId={focusedItemId}
        />
      </main>
    );
  }

  return (
    <main className="relative">
      {breadcrumbsNode}
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
