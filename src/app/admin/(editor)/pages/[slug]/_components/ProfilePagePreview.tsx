'use client';

import Breadcrumbs from '@/components/ui/navigation/Breadcrumbs';
import ProfileHeroSection from '@/app/about/profile/_components/ProfileHeroSection';
import ProfileStatsSection from '@/app/about/profile/_components/ProfileStatsSection';
import ProfileContentSection from '@/app/about/profile/_components/ProfileContentSection';
import PreviewNewsSection from './PreviewNewsSection';
import ContactSection from '@/components/shared/content/ContactSection';
import { usePageEditor } from '@/store/PageEditorContext';

import { usePage } from '@/hooks/api/admin/use-pages';
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
      <ProfileHeroSection sections={sections} />
      <ProfileStatsSection sections={sections} />
      <ProfileContentSection sections={sections} />
      <PreviewNewsSection />
      <ContactSection />
    </main>
  );
}
