import LayoutWrapper from '@/components/layouts/wrapper/LayoutWrapper';
import FeatureCard from '@/components/shared/FeatureCard';

import { businessBottomProductCards, businessTopProductCards } from '../_data';

export default function BusinessProductsSection() {
  return (
    <section className="w-full py-16 xl:pt-22">
      <LayoutWrapper>
        <div className="flex w-full flex-col items-start gap-4 xl:gap-6">
          <div className="grid w-full grid-cols-2 gap-4 xl:flex xl:items-center xl:gap-6">
            {businessTopProductCards.map((card, index) => (
              <FeatureCard
                key={card.title}
                {...card}
                decorationSrc="/images/products/open-account-money-bag.png"
                featured={index === 0}
              />
            ))}
          </div>
          <div className="grid w-full grid-cols-2 gap-4 xl:flex xl:items-center xl:gap-6">
            {businessBottomProductCards.map((card) => (
              <FeatureCard key={card.title} {...card} />
            ))}
          </div>
        </div>
      </LayoutWrapper>
    </section>
  );
}
