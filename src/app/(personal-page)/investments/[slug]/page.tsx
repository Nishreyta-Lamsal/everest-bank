import { notFound } from 'next/navigation';

import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import Breadcrumbs from '@/components/ui/navigation/Breadcrumbs';
import InvestmentHeroSection from './_components/InvestmentHeroSection';
import InvestmentContentSection from './_components/InvestmentContentSection';
import NewsSection from '@/components/shared/news/NewsSection';
import ContactSection from '@/components/shared/content/ContactSection';

import { investmentPageService } from '@/api/services/personal/investment-page.service';

import { getQueryClient } from '@/lib/get-query-client';
import { getSectionContent } from '@/lib/get-section-content';

type InvestmentsDetailsPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function InvestmentsDetailsPage({
  params,
}: InvestmentsDetailsPageProps) {
  const { slug } = await params;

  const queryClient = getQueryClient();

  const result = await queryClient
    .fetchQuery({
      queryKey: ['investment-page', slug],
      queryFn: () => investmentPageService.getInvestmentPage(slug),
    })
    .catch(() => null);

  if (!result) {
    notFound();
  }

  const { sections, title, related_pages } = result.data;

  const breadcrumbsContent = getSectionContent(sections, 'content_breadcrumbs');
  const breadcrumbItems = breadcrumbsContent?.items?.length
    ? breadcrumbsContent.items
    : [{ label: title }];

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="relative">
        <Breadcrumbs items={breadcrumbItems} />
        <InvestmentHeroSection sections={sections} title={title} />
        <InvestmentContentSection
          sections={sections}
          relatedPages={related_pages}
        />
        <NewsSection />
        <ContactSection />
      </main>
    </HydrationBoundary>
  );
}
