import Breadcrumbs from '@/components/ui/navigation/Breadcrumbs';
import ContentHeroSection from '@/components/shared/content/ContentHeroSection';
import ProductListSection from '@/components/shared/product-list/ProductListSection';
import MountainDivider from '@/components/shared/MountainDivider';
import StatsHighlightSection from '@/components/shared/stats/StatsHighlightSection';
import RecommendationSection from '@/components/shared/recommendation/RecommendationSection';
import OpenAccountSection from '@/components/shared/OpenAccountSection';
import FaqSection from '@/components/shared/faqs/FaqSection';
import ExploreServicesSection from '@/components/shared/ExploreServicesSection';

import { loanProducts, loanProductsImage } from './_data/products';
import { loanStats, loanStatsImage } from './_data/stats';
import { idealLoanImage, idealLoanRows } from './_data/ideal-loan';
import { loanFaqs } from './_data/faqs';

/**
 * Sections on this page are CMS-managed, so it is rebuilt at most once a
 * minute instead of being prerendered once at build time.
 */
export const revalidate = 60;

const breadcrumbItems = [{ label: 'Loan Services' }];

export default function LoanServicesPage() {
  return (
    <main className="relative">
      <Breadcrumbs items={breadcrumbItems} />
      <ContentHeroSection
        image="/images/loans/loan-services-hero.png"
        imageAlt="A family playing with their child on the floor of their living room"
        heading="Loan Services"
        buttonLabel="Talk to loan officer"
        buttonHref="#"
        secondaryButtonHref="#"
        secondaryButtonAriaLabel="Explore all loan services"
      />
      <ProductListSection
        products={loanProducts}
        image={loanProductsImage.src}
        imageAlt={loanProductsImage.alt}
      />
      <MountainDivider />
      <StatsHighlightSection
        heading="Supporting Financial Growth Across Every Stage of Life"
        description="For decades, Everest Bank has helped individuals and businesses turn plans into reality through reliable financing solutions, expert guidance, and customer-focused service."
        stats={loanStats}
        image={loanStatsImage.src}
        imageAlt={loanStatsImage.alt}
      />
      <RecommendationSection
        heading="Find Your Ideal Loan"
        labelHeading="Your Goal"
        valueHeading="Recommended Loan"
        rows={idealLoanRows}
        primaryCtaLabel="Apply for a Loan"
        secondaryCtaLabel="Locate Nearest Branch"
        showPrimaryCtaIcon={false}
        image={idealLoanImage.src}
        imageAlt={idealLoanImage.alt}
      />
      <OpenAccountSection />
      <FaqSection heading="Quick FAQs for Loan Services" items={loanFaqs} />
      <ExploreServicesSection />
    </main>
  );
}
