import LayoutWrapper from '@/components/layouts/wrapper/LayoutWrapper';

import { getSectionContent } from '@/lib/get-section-content';

import { iconMap } from '@/constants';
import { icon } from '@/components/icons';
import { cardTrustBadges } from '../_data';

import type { CardDetailsPageSection } from '@/api/services/personal/card/card-details-page.service';
import type { CardPageSection } from '@/api/services/personal/card/card-page.service';

type CardsTrustBarSectionProps = {
  sections?: (CardPageSection | CardDetailsPageSection)[];
};

export default function CardsTrustBarSection({
  sections,
}: CardsTrustBarSectionProps) {
  const content = getSectionContent(sections, 'cards_trust_bar');

  const label = content?.label ?? 'Accepted everywhere you are';
  const badges = content?.badges.length
    ? content.badges.map((badge) => ({
        label: badge.label,
        icon: iconMap[badge.icon] ?? icon.bank,
      }))
    : cardTrustBadges;

  return (
    <section className="w-full py-8">
      <LayoutWrapper>
        <div className="flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between">
          <p className="text-body-2-mobile lg:text-body-2-desktop text-grey-400 lg:w-[260px]">
            {label}
          </p>
          <div className="flex flex-col items-start gap-4.5 lg:flex-row lg:flex-wrap lg:items-center lg:gap-6">
            {badges.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2">
                <Icon className="size-[18px] shrink-0 text-orange-500 lg:size-[20px]" />
                <p className="text-body-2-mobile lg:text-body-2-desktop text-grey-400 whitespace-nowrap">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </LayoutWrapper>
    </section>
  );
}
