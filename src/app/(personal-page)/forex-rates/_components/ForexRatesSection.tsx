import LayoutWrapper from '@/components/layouts/wrapper/LayoutWrapper';
import ForexRatesExplorer from './ForexRatesExplorer';

import { forexRates, forexTimeOptions } from '../_data/forex-rates';

export default function ForexRatesSection() {
  return (
    <section className="w-full py-16 lg:py-12">
      <LayoutWrapper>
        <ForexRatesExplorer
          rates={forexRates}
          defaultTime={forexTimeOptions[0].value}
        />
      </LayoutWrapper>
    </section>
  );
}
