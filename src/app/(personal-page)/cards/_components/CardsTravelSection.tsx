import LayoutWrapper from '@/components/layouts/wrapper/LayoutWrapper';
import CardOfferList from './card-offers/CardOfferList';

import { getSectionContent } from '@/lib/get-section-content';

import { travelCardOffers } from '../_data';

import type { CardPageSection } from '@/api/services/personal/card/card-page.service';
import type { CardOffer } from '../_data';

type CardsTravelSectionProps = {
  sections?: CardPageSection[];
};

export default function CardsTravelSection({
  sections,
}: CardsTravelSectionProps) {
  const content = getSectionContent(sections, 'cards_travel_offers');

  const offers: CardOffer[] = content?.offers?.length
    ? content.offers.map((offer) => ({
        title: offer.title,
        description: offer.description,
        features: offer.features,
        image: offer.image.src,
        imageAlt: offer.image.alt,
        imageClassName: offer.image_class_name,
        learnMoreHref: offer.learn_more_href,
        applyHref: offer.apply_href,
      }))
    : travelCardOffers;

  return (
    <section className="bg-grey-bluish-grey w-full py-16 lg:py-30">
      <LayoutWrapper>
        <div className="flex w-full flex-col items-start gap-10 lg:gap-15">
          <h2 className="font-heading text-heading-h3-mobile-md lg:text-heading-h2-desktop-md text-grey-500 lg:w-[577px]">
            {content?.heading || 'Load it, lock your rate, travel light.'}
          </h2>
          <CardOfferList offers={offers} />
        </div>
      </LayoutWrapper>
    </section>
  );
}
