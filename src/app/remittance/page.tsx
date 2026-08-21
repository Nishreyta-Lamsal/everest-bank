import RemittanceHeroSection from './_components/RemittanceHeroSection';
import RemittanceServicesSection from './_components/RemittanceServicesSection';
import MountainDivider from '@/components/shared/MountainDivider';
import RemittanceWhySection from './_components/RemittanceWhySection';
import RemittanceTrustSection from './_components/RemittanceTrustSection';
import OpenAccountSection from '@/components/shared/OpenAccountSection';
import FaqSection from '@/components/shared/faqs/FaqSection';

import { remittanceFaqs } from './_data/remittance-faqs';

export default function RemittancePage() {
  return (
    <main>
      <RemittanceHeroSection />
      <RemittanceServicesSection />
      <MountainDivider />
      <RemittanceWhySection />
      <RemittanceTrustSection />
      <OpenAccountSection />
      <FaqSection heading="Quick FAQs for Remittance" items={remittanceFaqs} />
    </main>
  );
}
