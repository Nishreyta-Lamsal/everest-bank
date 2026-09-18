'use client';

import Breadcrumbs from '@/components/ui/navigation/Breadcrumbs';
import MountainHeroSection from '@/components/shared/MountainHeroSection';
import AccountFinderSection from '@/app/(personal-page)/deposit-accounts/saving-account/_components/account-finder/AccountFinderSection';
import ProcessSection from '@/components/shared/process/ProcessSection';
import StepSection from '@/components/shared/step/StepSection';
import PreviewSectionHighlight from '@/components/admin/shared/PreviewSectionHighlight';
import { usePageEditor } from '@/store/PageEditorContext';

import { usePage } from '@/hooks/api/admin/use-pages';
import { toPreviewSections } from '@/lib/admin/preview-sections';
import { getSectionContent } from '@/lib/get-section-content';
import { toAccountFinderView } from '@/lib/admin/account-finder-view';

import type {
  ContentBreadcrumbsContent,
  SavingAccountFinderContent,
  SavingDocumentsContent,
  SavingHeroContent,
  SavingStepsContent,
} from '@/types/admin';

type SavingPreviewSection =
  | { section_type: 'content_breadcrumbs'; content: ContentBreadcrumbsContent }
  | { section_type: 'saving_hero'; content: SavingHeroContent }
  | {
      section_type: 'saving_account_finder';
      content: SavingAccountFinderContent;
    }
  | { section_type: 'saving_documents'; content: SavingDocumentsContent }
  | { section_type: 'saving_steps'; content: SavingStepsContent };

type SavingPagePreviewProps = {
  slug: string;
};

export default function SavingPagePreview({ slug }: SavingPagePreviewProps) {
  const { drafts, draftVisibility, focusedSectionType } = usePageEditor();
  const { data: page } = usePage(slug);

  const sections = toPreviewSections(
    page?.sections,
    drafts,
    draftVisibility,
  ) as SavingPreviewSection[] | undefined;

  const breadcrumbs = getSectionContent(sections, 'content_breadcrumbs');
  const breadcrumbItems = breadcrumbs?.items?.length
    ? breadcrumbs.items
    : [{ label: page?.title ?? '' }];

  const hero = getSectionContent(sections, 'saving_hero');
  const finder = getSectionContent(sections, 'saving_account_finder');
  const documents = getSectionContent(sections, 'saving_documents');
  const steps = getSectionContent(sections, 'saving_steps');

  const finderView = toAccountFinderView(finder);

  return (
    <main className="relative">
      <Breadcrumbs items={breadcrumbItems} tone="dark" />
      {hero && (
        <PreviewSectionHighlight
          sectionType="saving_hero"
          activeSectionType={focusedSectionType}
        >
          <MountainHeroSection
            heading={hero.heading ?? ''}
            buttonLabel={hero.button?.label ?? ''}
            buttonHref={hero.button?.href}
          />
        </PreviewSectionHighlight>
      )}
      {finder && (
        <PreviewSectionHighlight
          sectionType="saving_account_finder"
          activeSectionType={focusedSectionType}
        >
          <AccountFinderSection
            heading={finder.heading}
            categories={finderView.categories}
            cards={finderView.cards}
          />
        </PreviewSectionHighlight>
      )}
      {documents && (
        <PreviewSectionHighlight
          sectionType="saving_documents"
          activeSectionType={focusedSectionType}
        >
          <ProcessSection
            heading={documents.heading ?? ''}
            steps={documents.steps ?? []}
            ctaLabel={documents.cta?.label ?? ''}
            ctaHref={documents.cta?.href}
            image={documents.image?.src ?? ''}
            imageAlt={documents.image?.alt ?? ''}
          />
        </PreviewSectionHighlight>
      )}
      {steps && (
        <PreviewSectionHighlight
          sectionType="saving_steps"
          activeSectionType={focusedSectionType}
        >
          <StepSection
            heading={steps.heading ?? ''}
            steps={(steps.steps ?? []).map((step) => ({
              number: step.number,
              title: step.title,
              image: step.image?.src,
              alt: step.image?.alt,
            }))}
            ctaLabel={steps.cta?.label ?? ''}
            ctaHref={steps.cta?.href}
          />
        </PreviewSectionHighlight>
      )}
    </main>
  );
}
