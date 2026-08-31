import LayoutWrapper from '@/components/layouts/wrapper/LayoutWrapper';
import PayoutLocationList from './PayoutLocationList';

import { payoutLocations } from '../_data/payout-locations';

const MAP_EMBED_URL =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.2699748838004!2d85.314145!3d27.7089495!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19634690a959%3A0x36d6b02643754e8f!2sEverest%20Bank%20Limited%2C%20Jamal%20Branch!5e0!3m2!1sen!2snp!4v1788149090135!5m2!1sen!2snp';

export default function PayoutLocationsMapSection() {
  return (
    <section className="w-full pt-6 pb-8 lg:py-8">
      <LayoutWrapper>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-12">
          <iframe
            src={MAP_EMBED_URL}
            title="Map of Everest Bank payout locations"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            className="bg-grey-25 h-[335px] w-full shrink-0 rounded-2xl border-0 lg:h-[750px] lg:w-[800px]"
          />
          <PayoutLocationList locations={payoutLocations} />
        </div>
      </LayoutWrapper>
    </section>
  );
}
