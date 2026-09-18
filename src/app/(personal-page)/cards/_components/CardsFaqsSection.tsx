import FaqSection from '@/components/shared/faqs/FaqSection';

import { getSectionContent } from '@/lib/get-section-content';

import { cardFaqs } from '../_data';

import type { CardPageSection } from '@/api/services/personal/card/card-page.service';

type CardsFaqsSectionProps = {
  sections?: CardPageSection[];
};

export default function CardsFaqsSection({ sections }: CardsFaqsSectionProps) {
  const content = getSectionContent(sections, 'cards_faqs');

  return (
    <FaqSection
      heading={content?.heading || 'Quick FAQs for Everest cards'}
      items={content?.items?.length ? content.items : cardFaqs}
    />
  );
}
