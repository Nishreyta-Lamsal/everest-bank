import { Card } from '@/components/admin/ui/card';

import type { QuickAction } from '../../../_data/dashboard-quick-actions';

type QuickActionItemProps = {
  action: QuickAction;
};

export function QuickActionItem({
  action: { label, icon: Icon },
}: QuickActionItemProps) {
  return (
    <Card className="flex flex-1 cursor-pointer items-center justify-between p-4">
      <p className="text-paragraph-medium text-black-alpha-95">{label}</p>
      <div className="flex items-center rounded-md bg-[#edf2f7] p-2">
        <Icon className="size-6 text-slate-950" />
      </div>
    </Card>
  );
}
