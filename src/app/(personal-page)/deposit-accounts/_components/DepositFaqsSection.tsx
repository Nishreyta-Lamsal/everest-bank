import FaqSection from '@/components/shared/faqs/FaqSection';

import { getSectionContent } from '@/lib/get-section-content';

import { depositFaqs } from '../_data/faqs';

import type { DepositPageSection } from '@/api/services/personal/deposit-accounts/deposit-page.service';

type DepositFaqsSectionProps = {
  sections?: DepositPageSection[];
};

export default function DepositFaqsSection({
  sections,
}: DepositFaqsSectionProps) {
  const content = getSectionContent(sections, 'deposit_faqs');

  return (
    <FaqSection
      heading={content?.heading || 'Quick FAQs for Deposit Accounts'}
      items={content?.items?.length ? content.items : depositFaqs}
    />
  );
}
