import { notFound } from 'next/navigation';

import Breadcrumbs from '@/components/ui/navigation/Breadcrumbs';
import LoanHeroSection from './_components/LoanHeroSection';
import LoanStatsSection from './_components/LoanStatsSection';
import LoanEligibilitySection from './_components/LoanEligibilitySection';
import LoanApplyChecklistSection from './_components/apply-checklist/LoanApplyChecklistSection';
import LoanFinancingSection from './_components/LoanFinancingSection';
import LoanProcessSection from './_components/process/LoanProcessSection';
import LoanImpactSection from './_components/LoanImpactSection';
import FaqSection from '@/components/shared/faqs/FaqSection';
import LoanGlanceSection from './_components/LoanGlanceSection';

import { ROUTE } from '@/constants';

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

  const breadcrumbItems = [
    { label: 'Loans', href: ROUTE.LOANS },
    { label: loan.name },
  ];

  return (
    <main className="relative">
      <Breadcrumbs items={breadcrumbItems} />
      <LoanHeroSection data={loan.hero} />
      <LoanStatsSection stats={loan.stats} />
      <LoanEligibilitySection data={loan.eligibility} />
      <LoanApplyChecklistSection data={loan.applyChecklist} />
      <LoanFinancingSection data={loan.financing} />
      <LoanProcessSection data={loan.process} />
      <LoanImpactSection data={loan.impact} />
      <FaqSection heading={loan.faqs.heading} items={loan.faqs.items} />
      <LoanGlanceSection data={loan.glance} />
    </main>
  );
}
