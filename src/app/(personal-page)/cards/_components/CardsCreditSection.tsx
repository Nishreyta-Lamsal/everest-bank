import LayoutWrapper from '@/components/layouts/wrapper/LayoutWrapper';
import CardOfferList from './card-offers/CardOfferList';

import { getSectionContent } from '@/lib/get-section-content';

import { creditCardOffers } from '../_data';

import type { CardPageSection } from '@/api/services/personal/card/card-page.service';
import type { CardOffer } from '../_data';

type CardsCreditSectionProps = {
  sections?: CardPageSection[];
};

export default function CardsCreditSection({
  sections,
}: CardsCreditSectionProps) {
  const content = getSectionContent(sections, 'cards_credit_offers');

  const offers: CardOffer[] = content?.offers?.length
    ? content.offers.map((offer) => ({
        title: offer.title,
        description: offer.description,
        features: offer.features,
        image: offer.image?.src || '/placeholder.png',
        imageAlt: offer.image?.alt || offer.title,
        imageClassName: offer.image_class_name,
        learnMoreHref: offer.learn_more_href,
        applyHref: offer.apply_href,
      }))
    : creditCardOffers;

  return (
    <section className="bg-grey-bluish-grey w-full py-16 lg:py-30">
      <LayoutWrapper>
        <div className="flex w-full flex-col items-start gap-10 lg:gap-15">
          <h2 className="font-heading text-heading-h3-mobile-md lg:text-heading-h2-desktop-md text-grey-500 lg:w-[577px]">
            {content?.heading ||
              'Spend now, pay later with rewards along the way.'}
          </h2>
          <CardOfferList offers={offers} />
        </div>
      </LayoutWrapper>
    </section>
  );
}
