import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import Breadcrumbs from '@/components/ui/navigation/Breadcrumbs';
import ContentHeroSection from '@/components/shared/content/ContentHeroSection';
import OrganizationStructureContentSection from './_components/OrganizationStructureContentSection';

import NewsSection from '@/components/shared/news/NewsSection';
import ContactSection from '@/components/shared/content/ContactSection';

import { aboutOrganizationStructurePageService } from '@/api/services/about/about-organization-structure-page.service';

import { getQueryClient } from '@/lib/get-query-client';
import { getSectionContent } from '@/lib/get-section-content';

import { ROUTE } from '@/constants';

import type { ContentSidebarLink } from '@/components/shared/content/ContentSidebar';
import type { AboutOrganizationStructurePageSection } from '@/api/services/about/about-organization-structure-page.service';

export const aboutOrganizationStructurePageQueryKey = [
  'about-organization-structure-page',
] as const;

const fallbackBreadcrumbItems = [
  { label: 'About', href: ROUTE.ABOUT },
  { label: 'Organization Structure' },
];

export default async function OrganizationStructurePage() {
  const queryClient = getQueryClient();

  let sections: AboutOrganizationStructurePageSection[] | undefined;
  let relatedPages: ContentSidebarLink[] | undefined;

  try {
    const { data } = await queryClient.fetchQuery({
      queryKey: aboutOrganizationStructurePageQueryKey,
      queryFn:
        aboutOrganizationStructurePageService.getAboutOrganizationStructurePageData,
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

  const heroContent = getSectionContent(sections, 'content_hero');

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="relative">
        <Breadcrumbs items={breadcrumbItems} />
        <ContentHeroSection
          image={heroContent?.image?.src || '/images/about/profile/hero-bg.png'}
          imageAlt={
            heroContent?.image?.alt ||
            'Signage on the exterior of an Everest Bank branch'
          }
          heading={heroContent?.heading || 'Organizational Structure'}
          buttonLabel={heroContent?.button?.label || 'Contact Near Branch'}
          buttonHref={heroContent?.button?.href || ROUTE.BRANCHES}
        />
        <OrganizationStructureContentSection
          sections={sections}
          relatedPages={relatedPages}
        />
        <NewsSection />
        <ContactSection />
      </main>
    </HydrationBoundary>
  );
}
