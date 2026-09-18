import CardFeatureList from './CardFeatureList';

import type { CardSafetyTips } from '@/api/services/personal/card/card-details-page.service';

type CardSafetyTipsSectionProps = {
  data: CardSafetyTips;
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
        <span className="font-medium">{data.terms_lead} </span>
        {data.terms_body}{' '}
        <span className="text-red-500 underline">{data.terms_link_label}</span>
      </p>

      <p className="text-body-2-mobile lg:text-body-2-desktop text-grey-500">
        <span className="font-medium">{data.contact_lead} </span>
        {data.contact_body}
      </p>

      <p className="text-body-2-mobile lg:text-body-2-desktop text-grey-500">
        <span className="font-medium">{data.hunting_line_label} </span>
        {data.hunting_line_value}
      </p>

      <p className="text-body-2-mobile lg:text-body-2-desktop text-grey-500">
        <span className="font-medium">{data.mail_label} </span>
        {data.mail_value}
      </p>
    </div>
  );
}
