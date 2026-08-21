import Breadcrumbs from '@/components/ui/navigation/Breadcrumbs';
import AboutHeroSection from './_components/AboutHeroSection';
import AboutOverviewSection from './_components/AboutOverviewSection';
import MountainDivider from '@/components/shared/MountainDivider';
import AboutLinksSection from './_components/links/AboutLinksSection';
import AboutLeadershipSection from './_components/AboutLeadershipSection';
import AboutHistorySection from './_components/AboutHistorySection';
import TrustSection from '@/components/shared/TrustSection';
import NewsSection from '@/components/shared/news/NewsSection';
import ContactSection from '@/components/shared/content/ContactSection';

const breadcrumbItems = [{ label: 'About' }];

export default function AboutPage() {
  return (
    <main className="relative">
      <Breadcrumbs items={breadcrumbItems} />
      <AboutHeroSection />
      <AboutOverviewSection />
      <MountainDivider />
      <AboutLinksSection />
      <AboutLeadershipSection />
      <AboutHistorySection />
      <TrustSection />
      <NewsSection />
      <ContactSection />
    </main>
  );
}
