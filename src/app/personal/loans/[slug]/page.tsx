import LoanStatsSection from './_components/LoanStatsSection';
import LoanFinancingSection from './_components/LoanFinancingSection';
import FaqSection from '@/components/shared/faqs/FaqSection';

import { loanFaqs } from './_data';

export default function LoansPage() {
  return (
    <main>
      <LoanStatsSection />
      <LoanFinancingSection />
      <FaqSection heading="Quick FAQs for Agriculture Loan" items={loanFaqs} />
    </main>
  );
}
