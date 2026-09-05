import Link from 'next/link';

import LayoutWrapper from '@/components/layouts/wrapper/LayoutWrapper';
import { ArrowUpRightIcon, EnvelopeIcon } from '@/components/icons';
import Button from '@/components/ui/buttons/Button';

import { cn } from '@/lib/utils';

import { ROUTE } from '@/constants';
import { contactHelpTopics } from '@/data';

export default function ContactSection() {
  return (
    <section className="w-full py-16 lg:py-15">
      <LayoutWrapper>
        <div className="flex flex-col gap-20 rounded-2xl bg-red-600 px-4 py-10 lg:flex-row lg:items-stretch lg:justify-between lg:gap-8 lg:p-10">
          <div className="flex flex-col gap-8 lg:items-start lg:justify-between lg:gap-0 lg:self-stretch">
            <h2 className="font-heading text-heading-h3-mobile-md lg:text-heading-h2-desktop-md w-[304px] text-white">
              Get in touch with us anytime.
            </h2>
            <div className="flex flex-col gap-4">
              <Link
                href={ROUTE.ABOUT}
                className="block w-full lg:inline-block lg:w-auto"
              >
                <Button
                  variant="tertiary-white"
                  size="lg"
                  className="text-body-4-desktop-md lg:text-body-3-desktop-md h-[42px] w-full lg:h-[46px] lg:w-[350px]"
                >
                  Know More About Us
                </Button>
              </Link>
              <Link
                href="mailto:everestsupport@gmail.com"
                className="block w-full lg:inline-block lg:w-auto"
              >
                <Button
                  leftIcon={<EnvelopeIcon />}
                  variant="secondary-white"
                  size="lg"
                  className="text-body-4-desktop-md lg:text-body-3-desktop-md h-[42px] w-full lg:h-[46px] lg:w-[350px]"
                >
                  <span className="lg:hidden">everestsupport@gmail.com</span>
                  <span className="hidden lg:inline">
                    Write to everestsupport@gmail.com
                  </span>
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex w-full flex-col items-start lg:max-w-[636px]">
            {contactHelpTopics.map((topic, index) => (
              <div
                key={topic.title}
                className={cn(
                  'flex w-full flex-col items-start gap-6',
                  index === 0 ? 'border-b border-red-400 pb-8' : 'pt-8',
                )}
              >
                <div className="flex flex-col items-start gap-2">
                  <h3 className="font-heading text-title-1-mobile-md lg:text-title-2-desktop-md text-white">
                    {topic.title}
                  </h3>
                  <p className="font-heading text-title-3-mobile lg:text-title-4-desktop w-full text-white/90 lg:w-[538px]">
                    {topic.description}
                  </p>
                </div>
                <Link
                  href={topic.href}
                  className="text-body-4-desktop-md inline-flex items-center justify-center gap-1 font-medium text-white lg:underline"
                >
                  {topic.linkLabel}
                  <ArrowUpRightIcon className="size-[16px] shrink-0" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </LayoutWrapper>
    </section>
  );
}
