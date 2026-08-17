import AboutLinkItem from './AboutLinkItem';

import type { AboutLinkCard } from '../../_data';

type AboutLinkListProps = {
  cards: AboutLinkCard[];
};

export default function AboutLinkList({ cards }: AboutLinkListProps) {
  return (
    <div className="scrollbar-hidden flex gap-6 overflow-x-auto pl-4 md:pl-8 lg:grid lg:w-full lg:max-w-[1400px] lg:grid-cols-3 lg:overflow-visible lg:px-8 xl:mx-auto">
      {cards.map((card) => (
        <AboutLinkItem key={card.title} card={card} />
      ))}
    </div>
  );
}
