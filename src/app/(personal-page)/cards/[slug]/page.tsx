import { notFound } from 'next/navigation';

import Breadcrumbs from '@/components/ui/navigation/Breadcrumbs';
import ContentHeroSection from '@/components/shared/content/ContentHeroSection';
import CardsTrustBarSection from '../_components/CardsTrustBarSection';
import CardDetailSection from './_components/CardDetailSection';

import { ROUTE } from '@/constants';
import { cardDetails } from './_data';

type CardsDetailsPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function CardsDetailsPage({
  params,
}: CardsDetailsPageProps) {
  const { slug } = await params;

  const cardDetail = cardDetails.find((item) => item.slug === slug);

  if (!cardDetail) {
    notFound();
  }

  const breadcrumbItems = [
    { label: 'Cards', href: ROUTE.CARDS },
    { label: cardDetail.breadcrumbLabel },
  ];

  return (
    <main className="relative">
      <Breadcrumbs items={breadcrumbItems} />
      <ContentHeroSection
        image={cardDetail.hero.image}
        imageAlt={cardDetail.hero.imageAlt}
        heading={cardDetail.hero.heading}
        buttonLabel={cardDetail.hero.buttonLabel}
        buttonHref={cardDetail.hero.buttonHref}
      />
      <CardsTrustBarSection />
      <CardDetailSection detail={cardDetail} />
    </main>
  );
}
