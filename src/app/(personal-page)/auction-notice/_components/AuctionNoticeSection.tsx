import LayoutWrapper from '@/components/layouts/wrapper/LayoutWrapper';
import AuctionNoticeExplorer from './AuctionNoticeExplorer';

import { auctionNoticeCards } from '../_data/auction-notices';

export default function AuctionNoticeSection() {
  return (
    <section className="w-full py-16 lg:py-12">
      <LayoutWrapper>
        <AuctionNoticeExplorer notices={auctionNoticeCards} />
      </LayoutWrapper>
    </section>
  );
}
