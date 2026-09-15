import AccountFinderCard from './AccountFinderCard';

import type { AccountFinderCard as AccountFinderCardType } from '../../_types';

type AccountFinderListProps = {
  cards: AccountFinderCardType[];
};

export default function AccountFinderList({ cards }: AccountFinderListProps) {
  if (cards.length === 0) {
    return (
      <p className="text-body-3-desktop text-grey-400 w-full py-10 text-center">
        No savings accounts found. Try a different filter or search term.
      </p>
    );
  }

  return (
    <div className="flex w-full flex-wrap items-center gap-6">
      {cards.map((card) => (
        <AccountFinderCard key={card.title} card={card} />
      ))}
    </div>
  );
}
