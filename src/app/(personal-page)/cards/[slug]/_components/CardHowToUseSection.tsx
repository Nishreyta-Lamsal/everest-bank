import { icon } from '@/components/icons';

import type { CardHowToUseBlock } from '@/api/services/personal/card-page.service';

type CardHowToUseSectionProps = {
  heading: string;
  blocks: CardHowToUseBlock[];
};

export default function CardHowToUseSection({
  heading,
  blocks,
}: CardHowToUseSectionProps) {
  return (
    <div className="flex w-full flex-col items-start gap-4 lg:gap-6">
      <h3 className="font-heading text-heading-h4-mobile-md lg:text-heading-h4-desktop-md text-grey-500">
        {heading}
      </h3>
      <div className="flex w-full flex-col items-start gap-4 lg:gap-6">
        {blocks.map((block, index) => {
          if (block.type === 'list') {
            return (
              <ul
                key={index}
                className="flex w-full flex-col items-start gap-3"
              >
                {block.items.map((item, itemIndex) => (
                  <li
                    key={`${index}-${itemIndex}`}
                    className="flex w-full items-start gap-3"
                  >
                    <icon.circleCheck className="mt-0.5 size-5 shrink-0 text-red-500" />
                    <span className="text-body-2-mobile lg:text-body-2-desktop text-grey-500">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            );
          }

          return (
            <p
              key={index}
              className="text-body-2-mobile lg:text-body-2-desktop text-grey-500"
            >
              {block.lead && <span className="font-medium">{block.lead} </span>}
              {block.body}
            </p>
          );
        })}
      </div>
    </div>
  );
}
