import Link from 'next/link';

import LayoutWrapper from '@/components/layouts/wrapper/LayoutWrapper';
import Button from '@/components/ui/buttons/Button';
import NewsList from './NewsList';

import { newsCards } from '@/data';

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
          <NewsList items={newsCards} />
        </div>
      </LayoutWrapper>
    </section>
  );
}
