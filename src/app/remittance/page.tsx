import RemittanceHeroSection from './_components/RemittanceHeroSection';
import RemittanceServicesSection from './_components/RemittanceServicesSection';
import MountainDivider from '@/components/shared/MountainDivider';
import RemittanceWhySection from './_components/RemittanceWhySection';
import RemittanceTrustSection from './_components/RemittanceTrustSection';
import RemittanceOpenAccountSection from './_components/RemittanceOpenAccountSection';

export default function RemittancePage() {
  return (
    <main>
      <RemittanceHeroSection />
      <RemittanceServicesSection />
      <MountainDivider />
      <RemittanceWhySection />
      <RemittanceTrustSection />
      <RemittanceOpenAccountSection />
    </main>
  );
}
