import { notFound } from 'next/navigation';

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

import { loans } from './_data';

type LoansPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function LoansPage({ params }: LoansPageProps) {
  const { slug } = await params;

  const loan = loans.find((item) => item.slug === slug);

  if (!loan) {
    notFound();
  }

  const breadcrumbItems = [{ label: loan.name }];

  return (
    <main className="relative">
      <Breadcrumbs items={breadcrumbItems} />
      <LoanHeroSection data={loan.hero} />
      <LoanStatsSection stats={loan.stats} />
      <LoanEligibilitySection data={loan.eligibility} />
      <ProcessSection
        heading={loan.applyChecklist.heading}
        steps={loan.applyChecklist.items}
        ctaLabel="Apply for the loan"
        ctaHref={loan.applyChecklist.applyHref}
        image={loan.applyChecklist.image}
        imageAlt={loan.applyChecklist.imageAlt}
      />
      <LoanFinancingSection data={loan.financing} />
      <StepSection
        heading={loan.process.heading}
        steps={loan.process.steps}
        ctaLabel="Apply for loan"
        ctaHref={loan.process.applyHref}
      />
      <LoanImpactSection data={loan.impact} />
      <FaqSection heading={loan.faqs.heading} items={loan.faqs.items} />
      <LoanGlanceSection data={loan.glance} />
    </main>
  );
}
