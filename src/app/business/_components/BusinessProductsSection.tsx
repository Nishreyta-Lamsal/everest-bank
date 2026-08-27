import LayoutWrapper from '@/components/layouts/wrapper/LayoutWrapper';
import FeatureCard from '@/components/shared/FeatureCard';
import { BankIcon } from '@/components/icons';

import { getSectionContent } from '@/lib/get-section-content';

import { iconMap } from '@/constants';
import { businessBottomProductCards, businessTopProductCards } from '../_data';

import type { BusinessPageSection } from '@/api/services/business/business-page.service';

type BusinessProductsSectionProps = {
  sections?: BusinessPageSection[];
};

export default function BusinessProductsSection({
  sections,
}: BusinessProductsSectionProps) {
  const content = getSectionContent(sections, 'business_products');

  const topCards =
    content?.top_cards.map((card) => ({
      title: card.title,
      subtitle: card.subtitle,
      href: card.href,
      icon: iconMap[card.icon] ?? BankIcon,
    })) || businessTopProductCards;
  const bottomCards =
    content?.bottom_cards.map((card) => ({
      title: card.title,
      subtitle: card.subtitle,
      href: card.href,
      icon: iconMap[card.icon] ?? BankIcon,
    })) || businessBottomProductCards;

  return (
    <section className="w-full py-16 xl:pt-22">
      <LayoutWrapper>
        <div className="flex w-full flex-col items-start gap-4 xl:gap-6">
          <div className="grid w-full grid-cols-2 gap-4 xl:flex xl:items-center xl:gap-6">
            {topCards.map((card, index) => (
              <FeatureCard
                key={card.title}
                {...card}
                decorationSrc="/images/products/open-account-money-bag.png"
                featured={index === 0}
              />
            ))}
          </div>
          <div className="grid w-full grid-cols-2 gap-4 xl:flex xl:items-center xl:gap-6">
            {bottomCards.map((card) => (
              <FeatureCard key={card.title} {...card} />
            ))}
          </div>
        </div>
      </LayoutWrapper>
    </section>
  );
}
