import { Card } from '@/components/admin/ui/card';
import ProductInterestDonut from './ProductInterestDonut';
import ProductInterestLegend from './ProductInterestLegend';
import TrafficSourceList from './TrafficSourceList';

import {
  productInterestSegments,
  productInterestTotal,
  trafficSources,
} from '../../../_data/dashboard-product-interest';

export default function ProductInterestCard() {
  return (
    <Card
      variant="secondary"
      className="flex w-full flex-col items-start gap-4 xl:w-[330px] xl:shrink-0"
    >
      <div className="flex flex-col items-start">
        <p className="text-paragraph-lg-medium text-[rgba(15,23,42,0.8)]">
          Product interest
        </p>
        <p className="text-paragraph-mini text-[rgba(15,23,42,0.6)]">
          Product-page traffic
        </p>
      </div>
      <div className="flex w-full flex-col items-start gap-4 px-3">
        <div className="flex w-full items-center justify-between">
          <ProductInterestDonut
            segments={productInterestSegments}
            centerValue={productInterestTotal.value}
            centerLabel={productInterestTotal.label}
          />
          <ProductInterestLegend segments={productInterestSegments} />
        </div>
        <div className="w-full border-t border-[#dfdfdf]" />
        <div className="flex w-full flex-col items-start gap-2">
          <p className="text-paragraph-sm text-[rgba(15,23,42,0.6)]">
            Traffic sources
          </p>
          <TrafficSourceList items={trafficSources} />
        </div>
      </div>
    </Card>
  );
}
