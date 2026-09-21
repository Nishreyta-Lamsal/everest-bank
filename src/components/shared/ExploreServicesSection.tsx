import LayoutWrapper from '@/components/layouts/wrapper/LayoutWrapper';
import ProductCard from '@/components/ui/cards/ProductCard';

import { getMoreService } from '@/api/services/more-service.service';

import { exploreServicesFallback } from '@/data';

const PLACEHOLDER_IMAGE = '/images/cards/explore-digital-banking.jpg';

type ExploreServicesSectionProps = {
  /** Which card group to render. Lets one component serve several sections. */
  slug?: string;
  /**
   * Which page this is, so editors can limit a card to certain pages.
   * Omitted means every card in the group renders.
   */
  screen?: string;
};

export default async function ExploreServicesSection({
  slug = 'explore-services',
  screen,
}: ExploreServicesSectionProps) {
  const group = await getMoreService(slug, exploreServicesFallback, screen);

  // A group with no cards renders nothing rather than an empty heading.
  if (group.cards.length === 0) return null;

  return (
    <section className="w-full bg-white py-16 lg:py-20">
      <LayoutWrapper>
        <div className="flex w-full flex-col items-start gap-8 lg:gap-12">
          <h2 className="font-heading text-heading-h2-mobile-md lg:text-heading-h2-desktop-md text-grey-500">
            {group.title}
          </h2>
          <div className="flex w-full flex-col gap-8 lg:flex-row lg:items-start lg:gap-10">
            {group.cards.map((card) => (
              <ProductCard
                key={card.slug}
                href={card.href}
                // An editor can add a card before choosing its image; the
                // placeholder keeps the row from collapsing.
                image={card.image_url ?? PLACEHOLDER_IMAGE}
                title={card.title}
                ctaLabel={card.cta_label || 'Explore more'}
                className="lg:flex-1"
              />
            ))}
          </div>
        </div>
      </LayoutWrapper>
    </section>
  );
}
