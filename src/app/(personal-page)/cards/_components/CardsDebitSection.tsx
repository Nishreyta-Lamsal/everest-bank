import LayoutWrapper from '@/components/layouts/wrapper/LayoutWrapper';
import CardOfferList from './card-offers/CardOfferList';

import { getSectionContent } from '@/lib/get-section-content';

import { debitCardOffers } from '../_data';

import type { CardPageSection } from '@/api/services/personal/card/card-page.service';
import type { CardOffer } from '../_data';

type CardsDebitSectionProps = {
  sections?: CardPageSection[];
};

export default function CardsDebitSection({
  sections,
}: CardsDebitSectionProps) {
  const content = getSectionContent(sections, 'cards_debit_offers');

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
    : debitCardOffers;

  return (
    <section className="w-full bg-white py-16 lg:py-30">
      <LayoutWrapper>
        <div className="flex w-full flex-col items-start gap-10 lg:gap-15">
          <h2 className="font-heading text-heading-h3-mobile-md lg:text-heading-h2-desktop-md text-grey-500 lg:w-[577px]">
            {content?.heading || 'Your account, in your pocket.'}
          </h2>
          <CardOfferList offers={offers} />
        </div>
      </LayoutWrapper>
    </section>
  );
}
