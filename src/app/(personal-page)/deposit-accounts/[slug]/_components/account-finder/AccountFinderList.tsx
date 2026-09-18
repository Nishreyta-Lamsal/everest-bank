import AccountFinderCard from './AccountFinderCard';

import type { AccountFinderAccount } from '../../_types';

type AccountFinderListProps = {
  accounts: AccountFinderAccount[];
};

export default function AccountFinderList({
  accounts,
}: AccountFinderListProps) {
  if (accounts.length === 0) {
    return (
      <p className="text-body-3-desktop text-grey-400 w-full py-10 text-center">
        No savings accounts found. Try a different filter or search term.
      </p>
    );
  }

  return (
    <div className="flex w-full flex-wrap items-center gap-6">
      {accounts.map((account, index) => (
        <AccountFinderCard key={index} account={account} />
      ))}
    </div>
  );
}
