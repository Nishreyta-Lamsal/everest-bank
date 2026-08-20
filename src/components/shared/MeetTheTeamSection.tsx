import Image from 'next/image';
import Link from 'next/link';

import LayoutWrapper from '@/components/layouts/wrapper/LayoutWrapper';
import Button from '@/components/ui/buttons/Button';

export type MeetTheTeamPerson = {
  name: string;
  role: string;
  image: string;
  alt: string;
};

type MeetTheTeamSectionProps = {
  heading: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  people: MeetTheTeamPerson[];
};

export default function MeetTheTeamSection({
  heading,
  description,
  ctaLabel,
  ctaHref,
  people,
}: MeetTheTeamSectionProps) {
  return (
    <section className="bg-grey-bluish-grey w-full py-16 lg:py-30">
      <LayoutWrapper>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
          <div className="flex flex-col items-start gap-10 lg:h-[433px] lg:max-w-[380px] lg:justify-between">
            <div className="flex flex-col items-start gap-10 lg:gap-8">
              <h2 className="font-heading text-heading-h3-mobile-md text-grey-500 lg:text-heading-h2-desktop-md w-full lg:w-[380px]">
                {heading}
              </h2>
              <p className="text-body-2-mobile text-grey-400 lg:text-body-2-desktop lg:max-w-[405px]">
                {description}
              </p>
            </div>
            <Link href={ctaHref} className="hidden lg:inline-block">
              <Button variant="secondary" size="lg">
                {ctaLabel}
              </Button>
            </Link>
          </div>
          <div className="flex flex-col gap-10">
            <div className="flex gap-4 lg:gap-8">
              {people.map((person) => (
                <div
                  key={person.name}
                  className="flex w-[171px] flex-col items-start gap-6 lg:w-[200px] xl:w-[322px]"
                >
                  <div className="relative h-[228px] w-full overflow-hidden rounded-lg rounded-tl-[60px] lg:h-[368px] lg:rounded-xl lg:rounded-tl-[100px]">
                    <Image
                      src={person.image}
                      alt={person.alt}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col items-start gap-4">
                    <p className="font-heading text-heading-h4-mobile text-grey-500 lg:text-title-0-desktop">
                      {person.name}
                    </p>
                    <p className="font-heading text-title-3-mobile text-grey-400 lg:text-title-4-desktop">
                      {person.role}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <Link href={ctaHref} className="block w-full lg:hidden">
              <Button variant="secondary" size="sm" className="w-full">
                {ctaLabel}
              </Button>
            </Link>
          </div>
        </div>
      </LayoutWrapper>
    </section>
  );
}
