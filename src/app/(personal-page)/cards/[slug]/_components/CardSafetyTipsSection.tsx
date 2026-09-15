import CardFeatureList from './CardFeatureList';

import type { CardSafetyTipsSection as CardSafetyTipsSectionData } from '../_data';

type CardSafetyTipsSectionProps = {
  data: CardSafetyTipsSectionData;
};

export default function CardSafetyTipsSection({
  data,
}: CardSafetyTipsSectionProps) {
  return (
    <div className="flex w-full flex-col items-start gap-4 lg:gap-6">
      <h3 className="font-heading text-heading-h4-mobile-md lg:text-heading-h4-desktop-md text-grey-500">
        {data.heading}
      </h3>
      <CardFeatureList items={data.items} />

      <p className="text-body-2-mobile lg:text-body-2-desktop text-grey-500">
        <span className="font-medium">{data.termsLead} </span>
        {data.termsBody}{' '}
        <span className="text-red-500 underline">{data.termsLinkLabel}</span>
      </p>

      <p className="text-body-2-mobile lg:text-body-2-desktop text-grey-500">
        <span className="font-medium">{data.contactLead} </span>
        {data.contactBody}
      </p>

      <p className="text-body-2-mobile lg:text-body-2-desktop text-grey-500">
        <span className="font-medium">{data.huntingLineLabel} </span>
        {data.huntingLineValue}
      </p>

      <p className="text-body-2-mobile lg:text-body-2-desktop text-grey-500">
        <span className="font-medium">{data.mailLabel} </span>
        {data.mailValue}
      </p>
    </div>
  );
}
