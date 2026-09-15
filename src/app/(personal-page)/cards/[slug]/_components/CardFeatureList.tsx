import { icon } from '@/components/icons';

type CardFeatureListProps = {
  heading?: string;
  items: string[];
};

export default function CardFeatureList({
  heading,
  items,
}: CardFeatureListProps) {
  return (
    <div className="flex w-full flex-col items-start gap-4 lg:gap-6">
      {heading && (
        <h3 className="font-heading text-heading-h4-mobile-md lg:text-heading-h4-desktop-md text-grey-500">
          {heading}
        </h3>
      )}
      <ul className="flex w-full flex-col items-start gap-4 lg:gap-6">
        {items.map((item) => (
          <li key={item} className="flex w-full items-start gap-3">
            <icon.circleCheck className="mt-0.5 size-5 shrink-0 text-red-500" />
            <span className="text-body-2-mobile lg:text-body-2-desktop text-grey-500">
              {item}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
