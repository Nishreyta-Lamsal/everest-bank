import LayoutWrapper from '@/components/layouts/wrapper/LayoutWrapper';

import ProductCard from './ProductCard';

import { bottomProductCards, topProductCards } from '../../_data';

export default function ProductsSection() {
  return (
    <section className="w-full pt-22 pb-6">
      <LayoutWrapper>
        <div className="flex w-full flex-col items-start gap-6">
          <div className="flex w-full items-center gap-6">
            {topProductCards.map((card) => (
              <ProductCard key={card.title} {...card} showDecoration />
            ))}
          </div>
          <div className="flex w-full items-center gap-6">
            {bottomProductCards.map((card) => (
              <ProductCard key={card.title} {...card} />
            ))}
          </div>
        </div>
      </LayoutWrapper>
    </section>
  );
}
