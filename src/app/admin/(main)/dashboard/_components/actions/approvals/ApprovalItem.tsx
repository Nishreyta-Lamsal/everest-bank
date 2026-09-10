import { icon } from '@/components/admin/icons';
import { Badge } from '@/components/admin/ui/badge';
import { Button } from '@/components/admin/ui/button';

import type { ApprovalItem as ApprovalItemData } from '../../../_data/dashboard-approvals';

const statusConfig = {
  inReview: { label: 'In Review', variant: 'warning' as const },
  readyToPublish: { label: 'Ready to publish', variant: 'success' as const },
};

type ApprovalItemProps = {
  approval: ApprovalItemData;
};

export function ApprovalItem({ approval }: ApprovalItemProps) {
  const status = statusConfig[approval.status];

  return (
    <div className="border-black-alpha-5 flex w-full flex-col items-start justify-center gap-4 border-b p-4">
      <div className="flex w-full flex-col items-start gap-3 lg:flex-row lg:justify-between lg:gap-4">
        <div className="flex min-w-0 flex-1 flex-col items-start justify-center gap-2">
          <p className="text-paragraph-medium text-black-alpha-95 truncate">
            {approval.title}
          </p>
          <p className="text-paragraph-sm text-neutral-700">
            {approval.description}
          </p>
        </div>
        <div className="flex w-full shrink-0 flex-row items-center justify-between gap-4 lg:w-auto lg:flex-col lg:items-end lg:justify-center lg:gap-6">
          <p className="text-paragraph-sm whitespace-nowrap text-neutral-700">
            {approval.timeAgo} · {approval.urgency}
          </p>
          <Badge variant={status.variant}>{status.label}</Badge>
        </div>
      </div>
      <div className="flex w-full flex-col items-stretch gap-3.5 md:w-auto md:flex-row md:items-center">
        <Button size="small">
          <icon.checkmark />
          Approve & Publish
        </Button>
        <Button variant="outline" size="small">
          See the change
        </Button>
      </div>
    </div>
  );
}
