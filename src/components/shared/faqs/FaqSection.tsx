import FaqList from './FaqList';

import type { FaqEntry } from '@/types';

type FaqSectionProps = {
  heading: string;
  items: FaqEntry[];
};

export default function FaqSection({ heading, items }: FaqSectionProps) {
  return (
    <section className="bg-cream-25 w-full py-16 lg:py-30">
      <div className="mx-auto w-full max-w-[1175px] px-4 md:px-8">
        <div className="flex flex-col items-start gap-10 lg:items-center lg:gap-12">
          <h2 className="font-heading text-heading-h2-mobile-md text-grey-500 lg:text-heading-h2-desktop-md w-full max-w-[350px] text-left lg:max-w-[650px] lg:text-center">
            {heading}
          </h2>
          <FaqList items={items} />
        </div>
      </div>
    </section>
  );
}
