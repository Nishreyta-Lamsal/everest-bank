import Link from 'next/link';

import LayoutWrapper from '@/components/layouts/wrapper/LayoutWrapper';
import Button from '@/components/ui/buttons/Button';

import { newsCards } from '../_data';

export default function NewsSection() {
  return (
    <section className="w-full py-30">
      <LayoutWrapper>
        <div className="flex w-full flex-col items-start gap-12">
          <div className="flex w-full items-center justify-between">
            <p className="font-heading text-heading-h1-desktop-md text-grey-500">
              Stay updated With Everest Bank
            </p>
            <Link href="#">
              <Button variant="secondary" size="md">
                See more
              </Button>
            </Link>
          </div>
          <div className="grid w-full grid-cols-2 gap-6">
            {newsCards.map((card, index) => (
              <Link
                key={`${card.headline}-${index}`}
                href={card.href}
                className="border-grey-25 bg-white flex h-50 w-full flex-col justify-between rounded-lg border p-4"
              >
                <div className="flex w-full flex-col items-start gap-4">
                  <p className="font-heading text-heading-h4-desktop text-grey-500">
                    {card.headline.split('\n').map((line, lineIndex) => (
                      <span key={lineIndex} className="block">
                        {line}
                      </span>
                    ))}
                  </p>
                  <p className="text-body-2-desktop text-grey-400 w-130.25">
                    {card.description}
                  </p>
                </div>
                <span className="text-red-700 text-body-4-desktop-md font-medium">
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
