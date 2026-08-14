import Link from 'next/link';

import LayoutWrapper from '@/components/layouts/wrapper/LayoutWrapper';
import Button from '@/components/ui/buttons/Button';

import { cn } from '@/lib/utils';

import { newsCards } from '../_data';

export default function NewsSection() {
  return (
    <section className="w-full py-16 lg:py-30">
      <LayoutWrapper>
        <div className="flex w-full flex-col gap-10 lg:grid lg:grid-cols-[1fr_auto] lg:items-center lg:gap-x-6 lg:gap-y-12">
          <h2 className="font-heading text-heading-h2-mobile-md text-grey-500 lg:text-heading-h2-desktop-md order-1 lg:order-0">
            Stay updated With Everest Bank
          </h2>
          <Link
            href="#"
            className="order-3 block w-full lg:order-0 lg:inline-block lg:w-auto"
          >
            <Button variant="secondary" size="md" className="w-full lg:w-auto">
              See more
            </Button>
          </Link>
          <div className="order-2 flex w-full flex-col gap-4 lg:order-0 lg:col-span-2 lg:grid lg:grid-cols-2 lg:gap-6">
            {newsCards.map((card, index) => (
              <Link
                key={`${card.headline}-${index}`}
                href={card.href}
                className={cn(
                  'lg:border-grey-25 flex w-full flex-col items-start gap-6 rounded-lg border border-[#f4f4f4] bg-white p-4 lg:h-50 lg:justify-between lg:gap-0',
                  index === 3 && 'hidden lg:flex',
                )}
              >
                <div className="flex w-full flex-col items-start gap-4">
                  <h3 className="font-heading text-heading-h3-mobile text-grey-500 lg:text-heading-h4-desktop">
                    {card.headline.split('\n').map((line, lineIndex) => (
                      <span key={lineIndex} className="block">
                        {line}
                      </span>
                    ))}
                  </h3>
                  <p className="text-body-2-mobile text-grey-400 lg:text-body-2-desktop line-clamp-2 lg:line-clamp-none lg:max-w-130.25">
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
