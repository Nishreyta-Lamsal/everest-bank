import { icon } from '@/components/admin/icons';
import { Card } from '@/components/admin/ui/card';
import { ActivityList } from './ActivityList';

import { activityItems } from '../../_data/dashboard-activities';

export default function ActivitiesCard() {
  return (
    <Card className="flex flex-col items-start gap-4">
      <div className="flex w-full items-center justify-between">
        <p className="text-paragraph-lg-bold text-[rgba(15,23,42,0.8)]">
          Team activity
        </p>
        <a
          href="/activity"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-[rgba(15,23,42,0.6)]"
        >
          <p className="text-paragraph-sm-medium underline decoration-solid [text-underline-position:from-font]">
            Full audit log
          </p>
          <icon.arrowRight className="size-4 text-slate-950" />
        </a>
      </div>
      <ActivityList items={activityItems} />
    </Card>
  );
}
