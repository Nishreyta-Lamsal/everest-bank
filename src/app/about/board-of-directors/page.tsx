import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import Breadcrumbs from '@/components/ui/navigation/Breadcrumbs';
import BoardOfDirectorsHeroSection from './_components/BoardOfDirectorsHeroSection';
import BoardOfDirectorsContentSection from './_components/BoardOfDirectorsContentSection';
import NewsSection from '@/components/shared/news/NewsSection';
import ContactSection from '@/components/shared/content/ContactSection';

import { aboutBoardOfDirectorsPageService } from '@/api/services/about/about-board-of-directors-page.service';

import { getQueryClient } from '@/lib/get-query-client';
import { getSectionContent } from '@/lib/get-section-content';

import { ROUTE } from '@/constants';

import type { ContentSidebarLink } from '@/components/shared/content/ContentSidebar';
import type { AboutBoardOfDirectorsPageSection } from '@/api/services/about/about-board-of-directors-page.service';

export const aboutBoardOfDirectorsPageQueryKey = [
  'about-board-of-directors-page',
] as const;

const fallbackBreadcrumbItems = [
  { label: 'About', href: ROUTE.ABOUT },
  { label: 'Board of Directors' },
];

export default async function BoardOfDirectorsPage() {
  const queryClient = getQueryClient();

  let sections: AboutBoardOfDirectorsPageSection[] | undefined;
  let relatedPages: ContentSidebarLink[] | undefined;

  try {
    const { data } = await queryClient.fetchQuery({
      queryKey: aboutBoardOfDirectorsPageQueryKey,
      queryFn:
        aboutBoardOfDirectorsPageService.getAboutBoardOfDirectorsPageData,
    });
    sections = data.sections;
    relatedPages = data.related_pages;
  } catch {
    sections = undefined;
    relatedPages = undefined;
  }

  const breadcrumbsContent = getSectionContent(sections, 'content_breadcrumbs');
  const apiBreadcrumbItems =
    breadcrumbsContent?.items?.filter((item) => Boolean(item?.label)) ?? [];
  const breadcrumbItems = apiBreadcrumbItems.length
    ? apiBreadcrumbItems
    : fallbackBreadcrumbItems;

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="relative">
        <Breadcrumbs items={breadcrumbItems} />
        <BoardOfDirectorsHeroSection sections={sections} />
        <BoardOfDirectorsContentSection
          sections={sections}
          relatedPages={relatedPages}
        />
        <NewsSection />
        <ContactSection />
      </main>
    </HydrationBoundary>
  );
}
