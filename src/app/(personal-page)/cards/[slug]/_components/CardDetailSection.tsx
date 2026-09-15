import LayoutWrapper from '@/components/layouts/wrapper/LayoutWrapper';
import ContentSidebar from '@/components/shared/content/ContentSidebar';
import CardOverviewSection from './CardOverviewSection';
import CardFeatureList from './CardFeatureList';
import CardsTable from './CardsTable';
import CardHowToUseSection from './CardHowToUseSection';
import CardSafetyTipsSection from './CardSafetyTipsSection';

import { socialLinks } from '@/data';
import { relatedPages } from '../_data';

import type { CardDetail } from '../_data';

type CardDetailSectionProps = {
  detail: CardDetail;
};

export default function CardDetailSection({ detail }: CardDetailSectionProps) {
  const {
    overview,
    features,
    limitsTables,
    eligibility,
    procedure,
    howToUse,
    safetyTips,
  } = detail;

  return (
    <section className="w-full py-12 lg:py-[88px]">
      <LayoutWrapper>
        <div className="flex w-full flex-col items-start gap-12 lg:flex-row lg:gap-[108px]">
          <div className="flex w-full flex-col items-start gap-8 lg:max-w-[751px] lg:gap-[54px]">
            <CardOverviewSection
              heading={overview.heading}
              description={overview.description}
              cardFaces={overview.cardFaces}
              brandsHeading={overview.brandsHeading}
              brands={overview.brands}
            />

            <CardFeatureList
              heading={features[0].heading}
              items={features[0].items}
            />
            <CardsTable
              heading={limitsTables[0].heading}
              columnHeaders={limitsTables[0].columnHeaders}
              rows={limitsTables[0].rows}
            />

            <CardFeatureList
              heading={features[1].heading}
              items={features[1].items}
            />
            <CardsTable
              heading={limitsTables[1].heading}
              columnHeaders={limitsTables[1].columnHeaders}
              rows={limitsTables[1].rows}
            />

            <CardsTable
              heading={limitsTables[2].heading}
              columnHeaders={limitsTables[2].columnHeaders}
              rows={limitsTables[2].rows}
            />
            <CardsTable
              heading={limitsTables[3].heading}
              columnHeaders={limitsTables[3].columnHeaders}
              rows={limitsTables[3].rows}
            />

            <div className="flex w-full flex-col items-start gap-4 lg:gap-6">
              <h3 className="font-heading text-heading-h4-mobile-md lg:text-heading-h4-desktop-md text-grey-500">
                {eligibility.heading}
              </h3>
              <p className="text-body-2-mobile lg:text-body-2-desktop text-grey-400">
                {eligibility.description}
              </p>
            </div>

            <CardFeatureList
              heading={procedure.heading}
              items={procedure.items}
            />

            <CardHowToUseSection
              heading={howToUse.heading}
              blocks={howToUse.blocks}
            />

            <CardSafetyTipsSection data={safetyTips} />
          </div>

          <ContentSidebar links={relatedPages} socialLinks={socialLinks} />
        </div>
      </LayoutWrapper>
    </section>
  );
}
