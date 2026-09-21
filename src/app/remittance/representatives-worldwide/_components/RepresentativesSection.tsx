import LayoutWrapper from '@/components/layouts/wrapper/LayoutWrapper';
import RepresentativeList from './representatives/RepresentativeList';

import { representatives } from '../_data/representatives';

export default function RepresentativesSection() {
  return (
    <section className="w-full py-16 lg:py-24">
      <LayoutWrapper>
        <RepresentativeList representatives={representatives} />
      </LayoutWrapper>
    </section>
  );
}
