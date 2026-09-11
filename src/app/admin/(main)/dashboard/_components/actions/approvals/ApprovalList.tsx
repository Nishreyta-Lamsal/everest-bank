import { ApprovalItem } from './ApprovalItem';

import type { ApprovalItem as ApprovalItemData } from '../../../_data/dashboard-approvals';

type ApprovalListProps = {
  items: ApprovalItemData[];
};

export function ApprovalList({ items }: ApprovalListProps) {
  return (
    <div className="border-black-alpha-5 flex w-full flex-col items-start overflow-hidden rounded-lg border bg-white">
      {items.map((item) => (
        <ApprovalItem key={item.id} approval={item} />
      ))}
    </div>
  );
}
