import CardOfferItem from './CardOfferItem';

import type { CardOffer } from '../../_data';

type CardOfferListProps = {
  offers: CardOffer[];
};

export default function CardOfferList({ offers }: CardOfferListProps) {
  return (
    <div className="flex w-full flex-col items-start gap-10 lg:gap-28">
      {offers.map((offer, index) => (
        <CardOfferItem
          key={offer.title}
          offer={offer}
          reversed={index % 2 === 0}
        />
      ))}
    </div>
  );
}
