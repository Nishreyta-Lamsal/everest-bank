'use client';

import { useState } from 'react';

import LayoutWrapper from '@/components/layouts/wrapper/LayoutWrapper';
import ContentSidebar from '@/components/shared/content/ContentSidebar';
import CardOverviewSection from './CardOverviewSection';
import CardFeatureList from './CardFeatureList';
import CardsTable from './CardsTable';
import CardHowToUseSection from './CardHowToUseSection';
import CardSafetyTipsSection from './CardSafetyTipsSection';

import { getSectionContent } from '@/lib/get-section-content';

import { socialLinks } from '@/data';
import { relatedPages } from '../_data';

import type { CardPageSection } from '@/api/services/personal/card-page.service';

type CardDetailSectionProps = {
  sections?: CardPageSection[];
};

export default function CardDetailSection({
  sections,
}: CardDetailSectionProps) {
  const content = getSectionContent(sections, 'card_overview');

  const [selectedKey, setSelectedKey] = useState(content?.variants[0]?.key);

  if (!content?.variants.length) return null;

  const { heading, description, brands_heading, brands, variants } = content;

  const selectedVariant =
    variants.find((variant) => variant.key === selectedKey) ?? variants[0];

  return (
    <section className="w-full py-12 lg:py-[88px]">
      <LayoutWrapper>
        <div className="flex w-full flex-col items-start gap-12 lg:flex-row lg:gap-[108px]">
          <div className="flex w-full flex-col items-start gap-8 lg:max-w-[751px] lg:gap-[54px]">
            <CardOverviewSection
              heading={heading}
              description={description}
              cards={variants.map((variant) => ({
                key: variant.key,
                face: variant.face,
              }))}
              brandsHeading={brands_heading}
              brands={brands}
              selectedKey={selectedVariant.key}
              onSelectKey={setSelectedKey}
            />

            <CardFeatureList
              heading={selectedVariant.features.heading}
              items={selectedVariant.features.items}
            />
            <CardsTable
              heading={selectedVariant.limits_table.heading}
              columnHeaders={selectedVariant.limits_table.column_headers}
              rows={selectedVariant.limits_table.rows}
            />

            {selectedVariant.fee_tables.map((table, index) => (
              <CardsTable
                key={`${selectedVariant.key}-fee-table-${index}`}
                heading={table.heading}
                columnHeaders={table.column_headers}
                rows={table.rows}
              />
            ))}

            <div className="flex w-full flex-col items-start gap-4 lg:gap-6">
              <h3 className="font-heading text-heading-h4-mobile-md lg:text-heading-h4-desktop-md text-grey-500">
                {selectedVariant.eligibility.heading}
              </h3>
              <p className="text-body-2-mobile lg:text-body-2-desktop text-grey-400">
                {selectedVariant.eligibility.description}
              </p>
            </div>

            <CardFeatureList
              heading={selectedVariant.procedure.heading}
              items={selectedVariant.procedure.items}
            />

            <CardHowToUseSection
              heading={selectedVariant.how_to_use.heading}
              blocks={selectedVariant.how_to_use.blocks}
            />

            <CardSafetyTipsSection data={selectedVariant.safety_tips} />
          </div>

          <ContentSidebar links={relatedPages} socialLinks={socialLinks} />
        </div>
      </LayoutWrapper>
    </section>
  );
}
