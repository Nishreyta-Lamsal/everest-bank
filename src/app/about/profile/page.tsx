import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import Breadcrumbs from '@/components/ui/navigation/Breadcrumbs';
import ProfileHeroSection from './_components/ProfileHeroSection';
import ProfileStatsSection from './_components/ProfileStatsSection';
import ProfileContentSection from './_components/ProfileContentSection';
import NewsSection from '@/components/shared/news/NewsSection';
import ContactSection from '@/components/shared/content/ContactSection';

import { aboutProfilePageService } from '@/api/services/about/about-profile-page.service';

import { getQueryClient } from '@/lib/get-query-client';
import { getSectionContent } from '@/lib/get-section-content';

import { ROUTE } from '@/constants';

import type { ContentSidebarLink } from '@/components/shared/content/ContentSidebar';
import type { AboutProfilePageSection } from '@/api/services/about/about-profile-page.service';

export const aboutProfilePageQueryKey = ['about-profile-page'] as const;

const fallbackBreadcrumbItems = [
  { label: 'About', href: ROUTE.ABOUT },
  { label: 'Profile' },
];

export default async function ProfilePage() {
  const queryClient = getQueryClient();

  let sections: AboutProfilePageSection[] | undefined;
  let relatedPages: ContentSidebarLink[] | undefined;

  try {
    const { data } = await queryClient.fetchQuery({
      queryKey: aboutProfilePageQueryKey,
      queryFn: aboutProfilePageService.getAboutProfilePageData,
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
        <ProfileHeroSection sections={sections} />
        <ProfileStatsSection sections={sections} />
        <ProfileContentSection
          sections={sections}
          relatedPages={relatedPages}
        />
        <NewsSection />
        <ContactSection />
      </main>
    </HydrationBoundary>
  );
}
