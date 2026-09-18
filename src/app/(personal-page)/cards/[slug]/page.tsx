import { notFound } from 'next/navigation';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import Breadcrumbs from '@/components/ui/navigation/Breadcrumbs';
import ContentHeroSection from '@/components/shared/content/ContentHeroSection';
import CardsTrustBarSection from '../_components/CardsTrustBarSection';
import CardDetailSection from './_components/CardDetailSection';

import { cardPageService } from '@/api/services/personal/card-page.service';

import { getQueryClient } from '@/lib/get-query-client';
import { getSectionContent } from '@/lib/get-section-content';

type CardsDetailsPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function CardsDetailsPage({
  params,
}: CardsDetailsPageProps) {
  const { slug } = await params;

  const queryClient = getQueryClient();

  const result = await queryClient
    .fetchQuery({
      queryKey: ['card-page', slug],
      queryFn: () => cardPageService.getCardPage(slug),
    })
    .catch(() => null);

  if (!result) {
    notFound();
  }

  const { sections, title } = result.data;

  const breadcrumbsContent = getSectionContent(sections, 'content_breadcrumbs');
  const breadcrumbItems = breadcrumbsContent?.items?.length
    ? breadcrumbsContent.items
    : [{ label: title }];

  const hero = getSectionContent(sections, 'card_product_hero');

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="relative">
        <Breadcrumbs items={breadcrumbItems} />
        {hero && (
          <ContentHeroSection
            image={hero.image?.src || '/images/cards/card-showcase-bg.png'}
            imageAlt={
              hero.image?.alt ||
              'A hand holding an Everest Bank Visa card in front of Kathmandu Durbar Square at sunset'
            }
            heading={hero.heading}
            buttonLabel={hero.button.label}
            buttonHref={hero.button.href}
          />
        )}
        <CardsTrustBarSection sections={sections} />
        <CardDetailSection sections={sections} />
      </main>
    </HydrationBoundary>
  );
}
