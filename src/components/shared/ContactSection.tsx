import Link from 'next/link';

import LayoutWrapper from '@/components/layouts/wrapper/LayoutWrapper';
import { ArrowUpRightIcon, EnvelopeIcon } from '@/components/icons';
import Button from '@/components/ui/buttons/Button';

import { cn } from '@/lib/utils';

import { contactHelpTopics } from '@/data';

export default function ContactSection() {
  return (
    <section className="w-full py-15">
      <LayoutWrapper>
        <div className="bg-red-600 flex justify-between rounded-2xl p-10">
          <div className="flex flex-col items-start justify-between self-stretch">
            <p className="font-heading text-heading-h1-desktop-md text-white w-76">
              Get in touch with us anytime.
            </p>
            <div className="flex flex-col gap-4">
              <Link href="#">
                <Button variant="tertiary-white" className="w-87.5" size="lg">
                  Know More About Us
                </Button>
              </Link>
              <Link href="mailto:everestsupport@gmail.com">
                <Button
                  leftIcon={<EnvelopeIcon />}
                  variant="secondary-white"
                  className="w-87.5"
                  size="lg"
                >
                  Write to everestsupport@gmail.com
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex w-159 shrink-0 flex-col items-start">
            {contactHelpTopics.map((topic, index) => (
              <div
                key={topic.title}
                className={cn(
                  'flex w-full flex-col items-start gap-6',
                  index === 0 ? 'border-red-400 border-b pb-8' : 'pt-8',
                )}
              >
                <div className="flex flex-col items-start gap-2">
                  <p className="font-heading text-title-1-desktop-md text-white">
                    {topic.title}
                  </p>
                  <p className="font-heading text-title-3-desktop text-white/90 w-134.5">
                    {topic.description}
                  </p>
                </div>
                <Link
                  href={topic.href}
                  className="text-white inline-flex items-center justify-center gap-1 text-body-4-desktop-md font-medium underline"
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
