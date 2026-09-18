'use client';

import Breadcrumbs from '@/components/ui/navigation/Breadcrumbs';
import LoanHeroSection from '@/app/(personal-page)/loans/[slug]/_components/LoanHeroSection';
import LoanStatsSection from '@/app/(personal-page)/loans/[slug]/_components/LoanStatsSection';
import LoanEligibilitySection from '@/app/(personal-page)/loans/[slug]/_components/LoanEligibilitySection';
import ProcessSection from '@/components/shared/process/ProcessSection';
import LoanFinancingSection from '@/app/(personal-page)/loans/[slug]/_components/LoanFinancingSection';
import StepSection from '@/components/shared/step/StepSection';
import LoanImpactSection from '@/app/(personal-page)/loans/[slug]/_components/LoanImpactSection';
import FaqSection from '@/components/shared/faqs/FaqSection';
import LoanGlanceSection from '@/app/(personal-page)/loans/[slug]/_components/LoanGlanceSection';
import PreviewSectionHighlight from '@/components/admin/shared/PreviewSectionHighlight';
import { usePageEditor } from '@/store/PageEditorContext';

import { usePage } from '@/hooks/api/admin/use-pages';
import { toPreviewSections } from '@/lib/admin/preview-sections';
import { getSectionContent } from '@/lib/get-section-content';

import type { LoanPageSection } from '@/api/services/personal/loan-page.service';

type ProductPagePreviewProps = {
  slug: string;
};

export default function ProductPagePreview({ slug }: ProductPagePreviewProps) {
  const { drafts, draftVisibility, focusedSectionType } = usePageEditor();
  const { data: page } = usePage(slug);

  const sections = toPreviewSections(
    page?.sections,
    drafts,
    draftVisibility,
  ) as LoanPageSection[] | undefined;

  const breadcrumbs = getSectionContent(sections, 'content_breadcrumbs');
  const breadcrumbItems = breadcrumbs?.items?.length
    ? breadcrumbs.items
    : [{ label: page?.title ?? '' }];

  const applyChecklist = getSectionContent(sections, 'loan_apply_checklist');
  const process = getSectionContent(sections, 'loan_process');
  const faqs = getSectionContent(sections, 'loan_faqs');

  return (
    <main className="relative">
      <Breadcrumbs items={breadcrumbItems} />
      <PreviewSectionHighlight
        sectionType="loan_hero"
        activeSectionType={focusedSectionType}
      >
        <LoanHeroSection sections={sections} />
      </PreviewSectionHighlight>
      <PreviewSectionHighlight
        sectionType="loan_stats"
        activeSectionType={focusedSectionType}
      >
        <LoanStatsSection sections={sections} />
      </PreviewSectionHighlight>
      <PreviewSectionHighlight
        sectionType="loan_eligibility"
        activeSectionType={focusedSectionType}
      >
        <LoanEligibilitySection sections={sections} />
      </PreviewSectionHighlight>
      {applyChecklist && (
        <PreviewSectionHighlight
          sectionType="loan_apply_checklist"
          activeSectionType={focusedSectionType}
        >
          <ProcessSection
            heading={applyChecklist.heading}
            steps={applyChecklist.items}
            ctaLabel="Apply for the loan"
            ctaHref={applyChecklist.apply_href}
            image={applyChecklist.image?.src}
            imageAlt={applyChecklist.image?.alt}
          />
        </PreviewSectionHighlight>
      )}
      <PreviewSectionHighlight
        sectionType="loan_financing"
        activeSectionType={focusedSectionType}
      >
        <LoanFinancingSection sections={sections} />
      </PreviewSectionHighlight>
      {process && (
        <PreviewSectionHighlight
          sectionType="loan_process"
          activeSectionType={focusedSectionType}
        >
          <StepSection
            heading={process.heading}
            steps={(process.steps ?? []).map((step) => ({
              number: step.number,
              title: step.title,
              image: step.image?.src,
              alt: step.image?.alt,
            }))}
            ctaLabel="Apply for loan"
            ctaHref={process.apply_href}
          />
        </PreviewSectionHighlight>
      )}
      <PreviewSectionHighlight
        sectionType="loan_impact"
        activeSectionType={focusedSectionType}
      >
        <LoanImpactSection sections={sections} />
      </PreviewSectionHighlight>
      {faqs && (
        <PreviewSectionHighlight
          sectionType="loan_faqs"
          activeSectionType={focusedSectionType}
        >
          <FaqSection heading={faqs.heading} items={faqs.items} />
        </PreviewSectionHighlight>
      )}
      <PreviewSectionHighlight
        sectionType="loan_glance"
        activeSectionType={focusedSectionType}
      >
        <LoanGlanceSection sections={sections} />
      </PreviewSectionHighlight>
    </main>
  );
}
