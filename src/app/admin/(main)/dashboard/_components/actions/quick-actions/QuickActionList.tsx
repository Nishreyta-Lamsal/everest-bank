import { QuickActionItem } from './QuickActionItem';

import type { QuickAction } from '../../../_data/dashboard-quick-actions';

type QuickActionListProps = {
  items: QuickAction[];
};

export function QuickActionList({ items }: QuickActionListProps) {
  return (
    <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {items.map((action) => (
        <QuickActionItem key={action.id} action={action} />
      ))}
    </div>
  );
}
