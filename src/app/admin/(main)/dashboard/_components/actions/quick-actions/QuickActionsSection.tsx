import { QuickActionList } from './QuickActionList';

import { quickActions } from '../../../_data/dashboard-quick-actions';

export default function QuickActionsSection() {
  return (
    <div className="flex w-full flex-col items-start gap-4">
      <p className="text-heading-4 text-black-alpha-90 md:text-heading-3 w-full">
        What would you like to do?
      </p>
      <QuickActionList items={quickActions} />
    </div>
  );
}
