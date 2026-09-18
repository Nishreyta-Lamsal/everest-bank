import FaqSection from '@/components/shared/faqs/FaqSection';

import { getSectionContent } from '@/lib/get-section-content';

import { smeFaqs } from '../_data/faqs';

import type { SmePageSection } from '@/api/services/business/sme-page.service';

type SmeFaqsSectionProps = {
  sections?: SmePageSection[];
};

export default function SmeFaqsSection({ sections }: SmeFaqsSectionProps) {
  const content = getSectionContent(sections, 'sme_faqs');

  return (
    <FaqSection
      heading={content?.heading || 'Quick FAQs for SME Banking'}
      items={content?.items?.length ? content.items : smeFaqs}
    />
  );
}
