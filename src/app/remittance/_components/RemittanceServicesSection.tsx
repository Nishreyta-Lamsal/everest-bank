import LayoutWrapper from '@/components/layouts/wrapper/LayoutWrapper';
import FeatureCard from '@/components/shared/FeatureCard';
import { icon } from '@/components/icons';

import { getSectionContent } from '@/lib/get-section-content';

import { iconMap } from '@/constants';
import { remittanceServiceCards } from '../_data/remittance-services';

import type { RemittancePageSection } from '@/api/services/remittance/remittance-page.service';

type RemittanceServicesSectionProps = {
  sections?: RemittancePageSection[];
};

export default function RemittanceServicesSection({
  sections,
}: RemittanceServicesSectionProps) {
  const content = getSectionContent(sections, 'remittance_services');

  const cards =
    content?.cards.map((card) => ({
      title: card.title,
      subtitle: card.subtitle,
      href: card.href,
      icon: iconMap[card.icon] ?? icon.bank,
    })) || remittanceServiceCards;

  return (
    <section className="w-full pt-16 pb-6 lg:pt-22">
      <LayoutWrapper>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {cards.map((card) => (
            <FeatureCard key={card.title} {...card} />
          ))}
        </div>
      </LayoutWrapper>
    </section>
  );
}
