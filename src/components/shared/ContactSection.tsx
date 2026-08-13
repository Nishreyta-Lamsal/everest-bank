import Link from 'next/link';

import LayoutWrapper from '@/components/layouts/wrapper/LayoutWrapper';
import { ArrowUpRightIcon, EnvelopeIcon } from '@/components/icons';
import Button from '@/components/ui/buttons/Button';

import { cn } from '@/lib/utils';

import { contactHelpTopics } from '@/data';

export default function ContactSection() {
  return (
    <section className="w-full py-16 xl:py-15">
      <LayoutWrapper>
        <div className="flex flex-col gap-20 rounded-2xl bg-red-600 px-4 py-10 xl:flex-row xl:items-stretch xl:justify-between xl:gap-0 xl:p-10">
          <div className="flex flex-col gap-8 xl:items-start xl:justify-between xl:gap-0 xl:self-stretch">
            <p className="font-heading text-heading-h1-desktop-md w-76 text-white">
              Get in touch with us anytime.
            </p>
            <div className="flex flex-col gap-4">
              <Link href="#" className="block w-full xl:inline-block xl:w-auto">
                <Button
                  variant="tertiary-white"
                  size="lg"
                  className="h-[42px] w-full xl:h-[46px] xl:w-87.5"
                >
                  Know More About Us
                </Button>
              </Link>
              <Link
                href="mailto:everestsupport@gmail.com"
                className="block w-full xl:inline-block xl:w-auto"
              >
                <Button
                  leftIcon={<EnvelopeIcon />}
                  variant="secondary-white"
                  size="lg"
                  className="h-[42px] w-full xl:h-[46px] xl:w-87.5"
                >
                  <span className="xl:hidden">everestsupport@gmail.com</span>
                  <span className="hidden xl:inline">
                    Write to everestsupport@gmail.com
                  </span>
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex w-full flex-col items-start xl:w-159 xl:shrink-0">
            {contactHelpTopics.map((topic, index) => (
              <div
                key={topic.title}
                className={cn(
                  'flex w-full flex-col items-start gap-6',
                  index === 0 ? 'border-b border-red-400 pb-8' : 'pt-8',
                )}
              >
                <div className="flex flex-col items-start gap-2">
                  <p className="font-heading text-title-1-desktop-md text-white">
                    {topic.title}
                  </p>
                  <p className="font-heading text-title-3-desktop w-full text-white/90 xl:w-134.5">
                    {topic.description}
                  </p>
                </div>
                <Link
                  href={topic.href}
                  className="text-body-4-desktop-md inline-flex items-center justify-center gap-1 font-medium text-white xl:underline"
                >
                  {topic.linkLabel}
                  <ArrowUpRightIcon className="size-4 shrink-0" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </LayoutWrapper>
    </section>
  );
}
