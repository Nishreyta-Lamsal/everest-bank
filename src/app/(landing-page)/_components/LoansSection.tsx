import Image from 'next/image';
import Link from 'next/link';

import LayoutWrapper from '@/components/layouts/wrapper/LayoutWrapper';
import { ArrowUpRightIcon } from '@/components/icons';
import Button from '@/components/ui/buttons/Button';

import { loanCards } from '../_data';

export default function LoansSection() {
  return (
    <section className="w-full py-15 bg-grey-bluish-grey">
      <LayoutWrapper>
        <div className="flex w-full flex-col items-start gap-12">
          <div className="flex w-full items-end justify-between">
            <p className="font-heading text-heading-h1-desktop-md text-grey-500 w-145.25">
              Financial support designed around life&rsquo;s biggest milestones.
            </p>
            <Link href="#">
              <Button variant="secondary" size="md">
                See more about loans
              </Button>
            </Link>
          </div>
          <div className="flex w-full items-start gap-10">
            {loanCards.map((card) => (
              <Link
                key={card.title}
                href={card.href}
                className="flex flex-1 flex-col items-start overflow-hidden rounded-lg"
              >
                <div className="relative h-65.75 w-full overflow-hidden">
                  {card.zoomed ? (
                    <Image
                      src={card.image}
                      alt={card.alt}
                      width={card.imageWidth}
                      height={card.imageHeight}
                      className="absolute top-[-34.5%] left-0 h-[225.1%] w-full max-w-none"
                    />
                  ) : (
                    <Image
                      src={card.image}
                      alt={card.alt}
                      fill
                      className="object-cover"
                    />
                  )}
                </div>
                <div className="bg-white flex h-40 w-full flex-col justify-between p-6">
                  <p className="font-heading text-heading-h4-desktop text-grey-500">
                    {card.title}
                  </p>
                  <span className="text-red-700 inline-flex items-center gap-1 text-body-4-desktop-md font-medium underline">
                    Apply now
                    <ArrowUpRightIcon className="size-4 shrink-0" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </LayoutWrapper>
    </section>
  );
}
