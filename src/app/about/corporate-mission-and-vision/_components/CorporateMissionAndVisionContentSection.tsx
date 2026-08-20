import Image from 'next/image';

import LayoutWrapper from '@/components/layouts/wrapper/LayoutWrapper';
import ContentSidebar from '@/components/shared/content/ContentSidebar';
import ContentQuote from '@/components/shared/content/ContentQuote';
import { EyeIcon, TargetArrowIcon } from '@/components/icons';

import { relatedPages } from '../_data/related-pages';
import { corporateMissionAndVisionSocialLinks } from '../_data/social-links';

export default function CorporateMissionAndVisionContentSection() {
  return (
    <section className="w-full py-16 lg:py-24">
      <LayoutWrapper>
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between">
          <article className="flex w-full max-w-[750px] flex-col items-start gap-10 lg:gap-13.5">
            <div className="flex flex-col items-start gap-6">
              <h2 className="font-heading text-title-0-mobile-md lg:text-heading-h4-desktop-md text-grey-500">
                A bank built on trust, growing with Nepal.
              </h2>
              <p className="text-body-3-mobile lg:text-body-2-desktop text-grey-500">
                Everest Bank Limited (EBL) began operations in 1994 with a
                simple commitment to provide reliable, accessible, and
                customer-friendly banking to people and businesses across Nepal.
              </p>
              <p className="text-body-3-mobile lg:text-body-2-desktop text-grey-500">
                In 1997, EBL entered a joint venture with Punjab National Bank,
                India one of the largest banks in South Asia bringing global
                expertise and stronger governance to our service.
              </p>
              <p className="text-body-3-mobile lg:text-body-2-desktop text-grey-500">
                Today, with a nationwide network of branches and ATMs and a
                growing suite of digital services, Everest Bank stands as one of
                Nepal&rsquo;s most trusted financial institutions.
              </p>
            </div>

            <div className="relative h-[220px] w-full overflow-hidden rounded-lg lg:h-[340px]">
              <Image
                src="/images/about/corporate-mission-and-vision/hero-history.png"
                alt="Everest Bank staff and partners cutting a ribbon at a branch opening"
                fill
                className="object-cover"
              />
            </div>

            <div className="bg-cream-25 flex w-full flex-col items-start gap-6 rounded-lg p-6">
              <div className="flex items-center gap-2">
                <EyeIcon className="text-orange-500" />
                <h3 className="font-heading text-title-1-mobile-md lg:text-heading-h4-desktop-md text-grey-500">
                  Our Vision
                </h3>
              </div>
              <p className="text-body-3-mobile lg:text-body-2-desktop text-grey-500">
                To evolve and position the bank as a progressive,
                cost-effective, and customer-friendly institution providing
                comprehensive financial and related services to people across
                Nepal.
              </p>
            </div>

            <div className="bg-cream-25 flex w-full flex-col items-start gap-6 rounded-lg p-6">
              <div className="flex items-center gap-2">
                <TargetArrowIcon className="text-orange-500" />
                <h3 className="font-heading text-title-1-mobile-md lg:text-heading-h4-desktop-md text-grey-500">
                  Our Mission
                </h3>
              </div>
              <p className="text-body-3-mobile lg:text-body-2-desktop text-grey-500">
                To deliver excellent professional service, build lasting
                relationships, and empower a motivated team strengthening our
                position as a leader in financial services.
              </p>
            </div>

            <ContentQuote title="“Consistent, strong and dependable: दिगो, दरिलो, विश्वासिलो.”" />

            <div className="flex w-full flex-col gap-6 sm:flex-row">
              <div className="relative h-[199px] w-full overflow-hidden rounded-lg sm:w-1/2">
                <Image
                  src="/images/about/corporate-mission-and-vision/gallery-1.png"
                  alt="Staff outside an Everest Bank ATM counter during a branch opening"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative h-[200px] w-full overflow-hidden rounded-lg sm:w-1/2">
                <Image
                  src="/images/about/corporate-mission-and-vision/gallery-2.png"
                  alt="Everest Bank staff cutting a ribbon at a branch opening ceremony"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </article>

          <ContentSidebar
            links={relatedPages}
            socialLinks={corporateMissionAndVisionSocialLinks}
          />
        </div>
      </LayoutWrapper>
    </section>
  );
}
