import WebsiteVisitsCard from './website-visits/WebsiteVisitsCard';
import StatHighlightList from './stat-highlights/StatHighlightList';
import TopProductsCard from './top-products/TopProductsCard';
import ForexRatesCard from './forex-rates/ForexRatesCard';
import TopPagesCard from './top-pages/TopPagesCard';
import ProductInterestCard from './product-interest/ProductInterestCard';

import { statHighlights } from '../../_data/dashboard-stat-highlights';

export default function OverviewSection() {
  return (
    <section className="flex w-full flex-col gap-4">
      <div className="flex w-full flex-col items-stretch gap-4 xl:flex-row">
        <WebsiteVisitsCard />
        <StatHighlightList items={statHighlights} />
      </div>
      <div className="flex w-full flex-col items-stretch gap-4 xl:flex-row">
        <TopProductsCard />
        <ForexRatesCard />
      </div>
      <div className="flex w-full flex-col items-stretch gap-4 xl:flex-row">
        <TopPagesCard />
        <ProductInterestCard />
      </div>
    </section>
  );
}
