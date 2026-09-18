import { notFound } from 'next/navigation';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import Breadcrumbs from '@/components/ui/navigation/Breadcrumbs';
import LoanHeroSection from './_components/LoanHeroSection';
import LoanStatsSection from './_components/LoanStatsSection';
import LoanEligibilitySection from './_components/LoanEligibilitySection';
import ProcessSection from '@/components/shared/process/ProcessSection';
import LoanFinancingSection from './_components/LoanFinancingSection';
import StepSection from '@/components/shared/step/StepSection';
import LoanImpactSection from './_components/LoanImpactSection';
import FaqSection from '@/components/shared/faqs/FaqSection';
import LoanGlanceSection from './_components/LoanGlanceSection';

import { loanPageService } from '@/api/services/personal/loan-page.service';

import { getQueryClient } from '@/lib/get-query-client';
import { getSectionContent } from '@/lib/get-section-content';

type LoansPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function LoansPage({ params }: LoansPageProps) {
  const { slug } = await params;

  const queryClient = getQueryClient();

  const result = await queryClient
    .fetchQuery({
      queryKey: ['loan-page', slug],
      queryFn: () => loanPageService.getLoanPage(slug),
    })
    .catch(() => null);

  if (!result) {
    notFound();
  }

  const { sections, title } = result.data;

  const breadcrumbsContent = getSectionContent(sections, 'content_breadcrumbs');
  const breadcrumbItems = breadcrumbsContent?.items?.length
    ? breadcrumbsContent.items
    : [{ label: title }];

  const applyChecklist = getSectionContent(sections, 'loan_apply_checklist');
  const process = getSectionContent(sections, 'loan_process');
  const faqs = getSectionContent(sections, 'loan_faqs');

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="relative">
        <Breadcrumbs items={breadcrumbItems} />
        <LoanHeroSection sections={sections} />
        <LoanStatsSection sections={sections} />
        <LoanEligibilitySection sections={sections} />
        {applyChecklist && (
          <ProcessSection
            heading={applyChecklist.heading}
            steps={applyChecklist.items}
            ctaLabel="Apply for the loan"
            ctaHref={applyChecklist.apply_href}
            image={applyChecklist.image.src}
            imageAlt={applyChecklist.image.alt}
          />
        )}
        <LoanFinancingSection sections={sections} />
        {process && (
          <StepSection
            heading={process.heading}
            steps={process.steps.map((step) => ({
              number: step.number,
              title: step.title,
              image: step.image.src,
              alt: step.image.alt,
            }))}
            ctaLabel="Apply for loan"
            ctaHref={process.apply_href}
          />
        )}
        <LoanImpactSection sections={sections} />
        {faqs && <FaqSection heading={faqs.heading} items={faqs.items} />}
        <LoanGlanceSection sections={sections} />
      </main>
    </HydrationBoundary>
  );
}
