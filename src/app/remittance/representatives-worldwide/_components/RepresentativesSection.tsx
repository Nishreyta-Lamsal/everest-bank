import LayoutWrapper from '@/components/layouts/wrapper/LayoutWrapper';
import RepresentativeList from './representatives/RepresentativeList';

import { getSectionContent } from '@/lib/get-section-content';

import type { RemittanceRepresentativesWorldwidePageSection } from '@/api/services/remittance/remittance-representatives-worldwide-page.service';
import type { RepresentativeGroup } from '../_data/representatives';

type RepresentativesSectionProps = {
  sections?: RemittanceRepresentativesWorldwidePageSection[];
};

export default function RepresentativesSection({
  sections,
}: RepresentativesSectionProps) {
  const representativesContent = getSectionContent(
    sections,
    'remittance_representatives',
  );

  const groups: RepresentativeGroup[] =
    representativesContent?.groups
      ?.filter((group) =>
        group.representatives.some((representative) =>
          Boolean(representative.name),
        ),
      )
      .map((group, index) => ({
        id: String(index),
        heading: group.heading,
        representatives: group.representatives
          .filter((representative) => Boolean(representative.name))
          .map((representative) => ({
            id: representative.id,
            bankName: representative.name,
            contactPerson: representative.contact_name,
            address: representative.address,
            email: representative.email,
            phone: representative.phone,
            fax: representative.fax,
          })),
      })) ?? [];

  return (
    <section className="w-full py-16 lg:py-24">
      <LayoutWrapper>
        {groups.length ? (
          <RepresentativeList groups={groups} />
        ) : (
          <p className="text-body-3-desktop text-grey-400 w-full">
            No representatives available
          </p>
        )}
      </LayoutWrapper>
    </section>
  );
}
