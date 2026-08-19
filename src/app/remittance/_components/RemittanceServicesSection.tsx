import LayoutWrapper from '@/components/layouts/wrapper/LayoutWrapper';
import FeatureCard from '@/components/shared/FeatureCard';

import { remittanceServiceCards } from '../_data/remittance-services';

export default function RemittanceServicesSection() {
  return (
    <section className="w-full pt-16 pb-6 lg:pt-22">
      <LayoutWrapper>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {remittanceServiceCards.map((card) => (
            <FeatureCard key={card.title} {...card} />
          ))}
        </div>
      </LayoutWrapper>
    </section>
  );
}
