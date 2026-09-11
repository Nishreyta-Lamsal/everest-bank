import { icon } from '@/components/admin/icons';
import { Card } from '@/components/admin/ui/card';
import { ApprovalList } from './ApprovalList';

import { approvalItems } from '../../../_data/dashboard-approvals';

export default function ApprovalsCard() {
  return (
    <Card className="flex flex-col items-start gap-4">
      <div className="flex w-full items-center justify-between">
        <p className="text-paragraph-lg-medium text-[rgba(15,23,42,0.8)]">
          Waiting on you
        </p>
        <button
          type="button"
          className="flex cursor-pointer items-center gap-2 text-[rgba(15,23,42,0.6)]"
        >
          <p className="text-paragraph-sm-medium">All approvals</p>
          <icon.arrowRight className="size-4 text-slate-950" />
        </button>
      </div>
      <ApprovalList items={approvalItems} />
    </Card>
  );
}
