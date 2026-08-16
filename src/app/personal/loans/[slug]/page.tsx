import Breadcrumbs from '@/components/ui/navigation/Breadcrumbs';
import LoanHeroSection from './_components/LoanHeroSection';
import LoanStatsSection from './_components/LoanStatsSection';
import LoanEligibilitySection from './_components/LoanEligibilitySection';
import LoanFinancingSection from './_components/LoanFinancingSection';
import LoanApplyChecklistSection from './_components/apply-checklist/LoanApplyChecklistSection';
import FaqSection from '@/components/shared/faqs/FaqSection';
import LoanGlanceSection from './_components/LoanGlanceSection';

import { loanFaqs } from './_data';

const breadcrumbItems = [
  { label: 'Loans', href: '/personal/loans' },
  { label: 'Agriculture Loan' },
];

export default function LoansPage() {
  return (
    <main className="relative">
      <Breadcrumbs items={breadcrumbItems} />
      <LoanHeroSection />
      <LoanStatsSection />
      <LoanEligibilitySection />
      <LoanFinancingSection />
      <LoanApplyChecklistSection />
      <FaqSection heading="Quick FAQs for Agriculture Loan" items={loanFaqs} />
      <LoanGlanceSection />
    </main>
  );
}
