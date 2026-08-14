import Link from 'next/link';

import LayoutWrapper from '@/components/layouts/wrapper/LayoutWrapper';
import Button from '@/components/ui/buttons/Button';

import { cn } from '@/lib/utils';

import { newsCards } from '../_data';

export default function NewsSection() {
  return (
    <section className="w-full py-16 xl:py-30">
      <LayoutWrapper>
        <div className="flex w-full flex-col gap-10 xl:grid xl:grid-cols-[1fr_auto] xl:items-center xl:gap-x-6 xl:gap-y-12">
          <h2 className="font-heading text-heading-h2-mobile-md text-grey-500 xl:text-heading-h1-desktop-md order-1 xl:order-0">
            Stay updated With Everest Bank
          </h2>
          <Link
            href="#"
            className="order-3 block w-full xl:order-0 xl:inline-block xl:w-auto"
          >
            <Button variant="secondary" size="md" className="w-full xl:w-auto">
              See more
            </Button>
          </Link>
          <div className="order-2 flex w-full flex-col gap-4 xl:order-0 xl:col-span-2 xl:grid xl:grid-cols-2 xl:gap-6">
            {newsCards.map((card, index) => (
              <Link
                key={`${card.headline}-${index}`}
                href={card.href}
                className={cn(
                  'xl:border-grey-25 flex w-full flex-col items-start gap-6 rounded-lg border border-[#f4f4f4] bg-white p-4 xl:h-50 xl:justify-between xl:gap-0',
                  index === 3 && 'hidden xl:flex',
                )}
              >
                <div className="flex w-full flex-col items-start gap-4">
                  <h3 className="font-heading text-heading-h3-mobile text-grey-500 xl:text-heading-h4-desktop">
                    {card.headline.split('\n').map((line, lineIndex) => (
                      <span key={lineIndex} className="block">
                        {line}
                      </span>
                    ))}
                  </h3>
                  <p className="text-body-2-mobile text-grey-400 xl:text-body-2-desktop line-clamp-2 xl:line-clamp-none xl:w-130.25">
                    {card.description}
                  </p>
                </div>
                <span className="text-body-4-desktop-md font-medium text-red-700">
                  Read more
                </span>
              </Link>
            ))}
          </div>
        </div>
      </LayoutWrapper>
    </section>
  );
}
