import ContactSection from '@/components/shared/ContactSection';
import MountainDivider from '@/components/shared/MountainDivider';
import AppPromoSection from './_components/AppPromoSection';
import CardsSection from './_components/CardsSection';
import CsrSection from './_components/CsrSection';
import HeroSection from './_components/HeroSection';
import LoansSection from './_components/LoansSection';
import NewsSection from './_components/NewsSection';
import ProductsSection from './_components/products/ProductsSection';
import TrustSection from './_components/TrustSection';

export default function LandingPage() {
  return (
    <main>
      <HeroSection />
      <ProductsSection />
      <MountainDivider />
      <LoansSection />
      <CardsSection />
      <AppPromoSection />
      <CsrSection />
      <TrustSection />
      <NewsSection />
      <ContactSection />
    </main>
  );
}
