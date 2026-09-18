import LayoutWrapper from '@/components/layouts/wrapper/LayoutWrapper';
import ForexRatesExplorer from './ForexRatesExplorer';

import { forexPublicService } from '@/api/services/forex.service';
import { toForexRates } from '@/lib/forex-rates';

import { forexRates } from '../_data/forex-rates';

export default async function ForexRatesSection() {
  const day = await forexPublicService.retrieve().catch(() => null);

  const rates = day?.rows?.length ? toForexRates(day.rows) : forexRates;

  return (
    <section className="w-full py-16 lg:py-12">
      <LayoutWrapper>
        <ForexRatesExplorer
          rates={rates}
          publishedDate={day?.date}
          publishedTime={day?.time}
          updatedAt={day?.updated_at}
        />
      </LayoutWrapper>
    </section>
  );
}
