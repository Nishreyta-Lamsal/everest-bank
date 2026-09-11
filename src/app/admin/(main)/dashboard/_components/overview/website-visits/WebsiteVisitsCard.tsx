import { Card } from '@/components/admin/ui/card';
import WebsiteVisitsChart from './WebsiteVisitsChart';

import { websiteVisitsStats } from '../../../_data/dashboard-website-visits';

export default function WebsiteVisitsCard() {
  return (
    <Card
      variant="secondary"
      className="flex flex-1 flex-col items-start gap-5"
    >
      <div className="flex w-full max-w-[712px] flex-col gap-5">
        <div className="flex w-full items-center justify-between">
          <p className="text-paragraph-lg-medium text-[rgba(15,23,42,0.8)]">
            {websiteVisitsStats.title}
          </p>
          <p className="text-paragraph-sm text-[rgba(15,23,42,0.6)]">
            {websiteVisitsStats.period}
          </p>
        </div>
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-end gap-2">
            <p className="text-heading-2-medium text-slate-900">
              {websiteVisitsStats.total}
            </p>
            <p className="text-paragraph-sm-medium text-[#219150]">
              {websiteVisitsStats.changeLabel}
            </p>
          </div>
          <p className="text-paragraph text-right text-[rgba(15,23,42,0.8)]">
            144k
          </p>
        </div>
      </div>
      <WebsiteVisitsChart />
    </Card>
  );
}
