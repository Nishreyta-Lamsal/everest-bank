import { icon } from '@/components/admin/icons';
import { Card } from '@/components/admin/ui/card';
import ForexRateTable from './ForexRateTable';

import { forexRates } from '../../../_data/dashboard-forex-rates';

export default function ForexRatesCard() {
  return (
    <Card
      variant="secondary"
      className="flex w-full flex-col items-start gap-4 xl:w-[330px] xl:shrink-0"
    >
      <div className="flex w-full items-center justify-between">
        <div className="flex flex-col items-start">
          <p className="text-paragraph-lg-medium text-[rgba(15,23,42,0.8)]">
            Forex rates
          </p>
          <p className="text-paragraph-mini text-[rgba(15,23,42,0.6)]">
            Updated today
          </p>
        </div>
        <a
          href="/rates"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-[rgba(15,23,42,0.6)]"
        >
          <p className="text-paragraph-sm">Explore rates</p>
          <icon.arrowUpRight className="size-4" />
        </a>
      </div>
      <ForexRateTable items={forexRates} />
    </Card>
  );
}
