import { Fragment } from 'react';
import Link from 'next/link';

import type {
  DescriptionSection,
  DescriptionTextPart,
} from '../_data/emi-descriptions';

type EMIDescriptionItemProps = {
  section: DescriptionSection;
};

function renderTextPart(part: DescriptionTextPart, index: number) {
  if (typeof part === 'string') {
    return <Fragment key={index}>{part}</Fragment>;
  }

  return (
    <Link
      key={index}
      href={part.href}
      className="text-orange-500 underline transition-colors hover:text-orange-600"
    >
      {part.label}
    </Link>
  );
}

export default function EMIDescriptionItem({
  section,
}: EMIDescriptionItemProps) {
  return (
    <div className="flex w-full flex-col items-start gap-5 lg:gap-6">
      <h3 className="font-heading text-title-0-mobile-md lg:text-heading-h4-desktop-md text-grey-500">
        {section.title}
      </h3>
      <div className="text-body-3-mobile lg:text-body-2-desktop text-grey-500 flex w-full flex-col items-start gap-4">
        {section.blocks.map((block, index) =>
          block.type === 'paragraph' ? (
            <p key={index} className="whitespace-pre-line">
              {block.content.map(renderTextPart)}
            </p>
          ) : (
            <ul key={index} className="list-outside list-disc pl-5 lg:pl-7">
              {block.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ),
        )}
      </div>
    </div>
  );
}
