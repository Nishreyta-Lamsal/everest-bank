import ContactSection from '@/components/shared/ContactSection';
import CardsSection from './_components/CardsSection';
import HeroSection from './_components/HeroSection';
import TrustSection from './_components/TrustSection';

export default function LandingPage() {
  return (
    <main>
      <HeroSection />
      <CardsSection />
      <ContactSection />
      <TrustSection />
    </main>
  );
}
