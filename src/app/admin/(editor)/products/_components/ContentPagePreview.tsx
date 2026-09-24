'use client';

import Breadcrumbs from '@/components/ui/navigation/Breadcrumbs';
import ProfileHeroSection from '@/app/about/profile/_components/ProfileHeroSection';
import ProfileStatsSection from '@/app/about/profile/_components/ProfileStatsSection';
import ProfileContentSection from '@/app/about/profile/_components/ProfileContentSection';
import BoardOfDirectorsHeroSection from '@/app/about/board-of-directors/_components/BoardOfDirectorsHeroSection';
import BoardOfDirectorsContentSection from '@/app/about/board-of-directors/_components/BoardOfDirectorsContentSection';
import OrganizationStructureContentSection from '@/app/about/organization-structure/_components/OrganizationStructureContentSection';
import InvestmentContentSection from '@/app/(personal-page)/investments/[slug]/_components/InvestmentContentSection';
import ContentHeroSection from '@/components/shared/content/ContentHeroSection';
import MountainHeroSection from '@/components/shared/MountainHeroSection';
import CareersJobsSection from '@/app/about/careers/_components/CareersJobsSection';
import RepresentativesSection from '@/app/remittance/representatives-worldwide/_components/RepresentativesSection';
import PreviewNewsSection from '../../pages/[slug]/_components/PreviewNewsSection';
import ContactSection from '@/components/shared/content/ContactSection';
import PreviewSectionHighlight from '@/components/admin/shared/PreviewSectionHighlight';
import { usePageEditor } from '@/store/PageEditorContext';

import { usePage } from '@/hooks/api/admin/use-pages';
import { toPreviewSections } from '@/lib/admin/preview-sections';
import { getSectionContent } from '@/lib/get-section-content';

import { ROUTE } from '@/constants';

import type { AboutProfilePageSection } from '@/api/services/about/about-profile-page.service';
import type { AboutBoardOfDirectorsPageSection } from '@/api/services/about/about-board-of-directors-page.service';
import type { AboutOrganizationStructurePageSection } from '@/api/services/about/about-organization-structure-page.service';
import type { AboutCareersPageSection } from '@/api/services/about/about-careers-page.service';
import type { RemittanceRepresentativesWorldwidePageSection } from '@/api/services/remittance/remittance-representatives-worldwide-page.service';
import type { InvestmentPageSection } from '@/api/services/personal/investment-page.service';

type ContentPagePreviewProps = {
  slug: string;
};

export default function ContentPagePreview({ slug }: ContentPagePreviewProps) {
  const { drafts, draftVisibility, focusedSectionType, focusedItemId } =
    usePageEditor();
  const { data: page } = usePage(slug);

  const isCareers = slug.includes('careers');
  const isRepresentatives = slug.includes('representatives');
  const isBoardOfDirectors = slug.includes('board-of-directors');
  const isOrganizationStructure = slug.includes('organization-structure');
  const isInvestments = page?.parent_slug === 'personal-investments';

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
    focusedSectionType === 'content_editor' ||
    focusedSectionType === 'content_sidebar';

  const breadcrumbsNode = (
    <Breadcrumbs
      items={
        breadcrumbItems.length
          ? breadcrumbItems
          : [{ label: page?.title ?? '' }]
      }
      // The mountain hero sits on a light background, so the trail flips to dark.
      tone={isCareers || isRepresentatives ? 'dark' : 'light'}
    />
  );

  if (isCareers) {
    const careersSections = rawSections as
      AboutCareersPageSection[] | undefined;

    const heroContent = getSectionContent(careersSections, 'content_hero');

    return (
      <main className="relative">
        {breadcrumbsNode}
        <PreviewSectionHighlight
          sectionType="content_hero"
          activeSectionType={focusedSectionType}
        >
          <MountainHeroSection
            heading={heroContent?.heading || 'Careers'}
            buttonLabel={
              heroContent?.button?.label || 'Contact your nearest branch'
            }
            buttonHref={heroContent?.button?.href || ROUTE.BRANCHES}
          />
        </PreviewSectionHighlight>
        <PreviewSectionHighlight
          sectionType="content_jobs"
          activeSectionType={focusedSectionType}
        >
          <CareersJobsSection sections={careersSections} />
        </PreviewSectionHighlight>
        <ContactSection />
      </main>
    );
  }

  if (isRepresentatives) {
    const representativesSections = rawSections as
      RemittanceRepresentativesWorldwidePageSection[] | undefined;

    const heroContent = getSectionContent(
      representativesSections,
      'content_hero',
    );

    return (
      <main className="relative">
        {breadcrumbsNode}
        <PreviewSectionHighlight
          sectionType="content_hero"
          activeSectionType={focusedSectionType}
        >
          <MountainHeroSection
            heading={heroContent?.heading || 'Representatives Worldwide'}
            buttonLabel={
              heroContent?.button?.label || 'Contact your nearest branch'
            }
            buttonHref={heroContent?.button?.href || ROUTE.BRANCHES}
          />
        </PreviewSectionHighlight>
        <PreviewSectionHighlight
          sectionType="remittance_representatives"
          activeSectionType={focusedSectionType}
        >
          <RepresentativesSection sections={representativesSections} />
        </PreviewSectionHighlight>
        {/* The page's own NewsSection is an async server component, so the
            preview uses the client-side equivalent. */}
        <PreviewNewsSection />
        <ContactSection />
      </main>
    );
  }

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
          activeDirectorId={focusedItemId}
        />
      </main>
    );
  }

  if (isOrganizationStructure) {
    const organizationStructureSections = rawSections as
      AboutOrganizationStructurePageSection[] | undefined;

    const heroContent = getSectionContent(
      organizationStructureSections,
      'content_hero',
    );

    return (
      <main className="relative">
        {breadcrumbsNode}
        <PreviewSectionHighlight
          sectionType="content_hero"
          activeSectionType={focusedSectionType}
        >
          <ContentHeroSection
            image={
              heroContent?.image?.src || '/images/about/profile/hero-bg.png'
            }
            imageAlt={
              heroContent?.image?.alt ||
              'Signage on the exterior of an Everest Bank branch'
            }
            heading={heroContent?.heading || 'Organizational Structure'}
            buttonLabel={heroContent?.button?.label || 'Contact Near Branch'}
            buttonHref={heroContent?.button?.href || ROUTE.BRANCHES}
          />
        </PreviewSectionHighlight>
        <OrganizationStructureContentSection
          sections={organizationStructureSections}
          relatedPages={page?.related_pages}
          activeBlockId={focusedItemId}
        />
      </main>
    );
  }

  if (isInvestments) {
    const investmentSections = rawSections as
      InvestmentPageSection[] | undefined;

    const heroContent = getSectionContent(investmentSections, 'content_hero');

    return (
      <main className="relative">
        {breadcrumbsNode}
        <PreviewSectionHighlight
          sectionType="content_hero"
          activeSectionType={focusedSectionType}
        >
          <ContentHeroSection
            image={heroContent?.image?.src || '/placeholder.png'}
            imageAlt={heroContent?.image?.alt || ''}
            heading={heroContent?.heading || page?.title || ''}
            buttonLabel={
              heroContent?.button?.label || 'Contact your nearest branch'
            }
            buttonHref={heroContent?.button?.href || ROUTE.BRANCHES}
          />
        </PreviewSectionHighlight>
        <PreviewSectionHighlight
          sectionType="content_editor"
          activeSectionType={
            isBodyFocused ? 'content_editor' : focusedSectionType
          }
        >
          <InvestmentContentSection
            sections={investmentSections}
            relatedPages={page?.related_pages}
          />
        </PreviewSectionHighlight>
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
        sectionType="content_editor"
        activeSectionType={
          isBodyFocused ? 'content_editor' : focusedSectionType
        }
      >
        <ProfileContentSection
          sections={sections}
          relatedPages={page?.related_pages}
        />
      </PreviewSectionHighlight>
    </main>
  );
}
