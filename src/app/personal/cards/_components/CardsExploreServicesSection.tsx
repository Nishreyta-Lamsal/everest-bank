import LayoutWrapper from '@/components/layouts/wrapper/LayoutWrapper';
import ProductCard from '@/components/ui/cards/ProductCard';

import { exploreServiceCards } from '../_data';

export default function CardsExploreServicesSection() {
  return (
    <section className="w-full bg-white py-16 lg:py-20">
      <LayoutWrapper>
        <div className="flex w-full flex-col items-start gap-8 lg:gap-12">
          <h2 className="font-heading text-heading-h2-mobile-md lg:text-heading-h2-desktop-md text-grey-500">
            Explore more of our services
          </h2>
          <div className="flex w-full flex-col gap-8 lg:flex-row lg:items-start lg:gap-10">
            {exploreServiceCards.map((card) => (
              <ProductCard
                key={card.title}
                href={card.href}
                image={card.image}
                title={card.title}
                ctaLabel="Explore more"
                className="lg:flex-1"
              />
            ))}
          </div>
        </div>
      </LayoutWrapper>
    </section>
  );
}
