import InfoListRow from './InfoListRow';
import LeaderListRow from './LeaderListRow';

import { iconMap } from '@/constants';

import type { ContentGroupCard } from '@/api/services/about/about-organization-structure-page.service';

type OrganizationStructureGroupBlockProps = {
  label: string;
  heading: string;
  cards: ContentGroupCard[];
};

export default function OrganizationStructureGroupBlock({
  label,
  heading,
  cards,
}: OrganizationStructureGroupBlockProps) {
  return (
    <div className="flex w-full flex-col items-start gap-6">
      <div className="flex flex-col items-start gap-3 lg:gap-2">
        <p className="text-body-3-mobile lg:text-body-3-desktop text-grey-500">
          {label}
        </p>
        <h2 className="font-heading text-title-0-mobile-md lg:text-heading-h4-desktop-md text-grey-500">
          {heading}
        </h2>
      </div>

      {cards.map((card) => {
        const Icon = card.icon ? iconMap[card.icon] : undefined;

        return (
          <div
            key={card.heading}
            className="bg-cream-25 flex w-full flex-col items-start gap-6 rounded-2xl p-4 lg:p-6"
          >
            <div className="flex w-full flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2">
                {Icon && <Icon className="size-6 text-orange-500 lg:size-7" />}
                <h3 className="font-heading text-title-0-mobile-md lg:text-heading-h4-desktop-md text-grey-500">
                  {card.heading}
                </h3>
              </div>
              {card.description && (
                <p className="text-body-3-mobile lg:text-body-3-desktop text-grey-500 pl-8 sm:pl-0">
                  {card.description}
                </p>
              )}
            </div>
            <div className="flex w-full flex-col items-start">
              {card.items.map((item, index) =>
                item.badge ? (
                  <InfoListRow
                    key={item.name}
                    name={item.name}
                    badge={item.badge}
                    isLast={index === card.items.length - 1}
                  />
                ) : (
                  <LeaderListRow
                    key={item.name}
                    name={item.name}
                    role={item.role ?? ''}
                    departments={item.departments}
                    isLast={index === card.items.length - 1}
                  />
                ),
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
