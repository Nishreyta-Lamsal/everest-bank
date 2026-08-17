import Image from 'next/image';

import LayoutWrapper from '@/components/layouts/wrapper/LayoutWrapper';
import ContentSidebar from '@/components/shared/content/ContentSidebar';

import { relatedPages } from '../_data/related-pages';
import { profileSocialLinks } from '../_data/social-links';

export default function ProfileContentSection() {
  return (
    <section className="w-full py-16 lg:py-24">
      <LayoutWrapper>
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between">
          <article className="flex w-full max-w-[750px] flex-col items-start gap-10 lg:gap-13.5">
            <div className="flex flex-col items-start gap-4 lg:gap-6">
              <h2 className="font-heading text-title-0-mobile-md lg:text-heading-h2-mobile-md text-grey-500">
                Brief Profile
              </h2>
              <p className="text-body-3-mobile lg:text-body-2-desktop text-grey-500">
                Catering to more than 15 lacs customers, Everest Bank Limited
                (EBL) is a name you can depend on for professionalized &
                efficient banking services. Founded in 1994, the Bank has been
                one of the leading banks of the country and has been catering
                its services to various segments of the society. With clients
                from all walks of life, the Bank has helped the nation to
                develop corporately, agriculturally & industrially.
              </p>
            </div>

            <div className="flex w-full flex-col gap-6 lg:hidden">
              <div className="relative h-[201px] w-full overflow-hidden rounded-lg">
                <Image
                  src="/images/about/profile/brief-profile-1.png"
                  alt="Staff outside an Everest Bank ATM counter during a branch opening"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative h-[201px] w-full overflow-hidden rounded-lg">
                <Image
                  src="/images/about/profile/network.png"
                  alt="Everest Bank staff and partners cutting a ribbon at a branch opening"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div className="hidden w-full gap-6 lg:flex">
              <div className="relative h-[199px] w-1/2 overflow-hidden rounded-lg">
                <Image
                  src="/images/about/profile/brief-profile-1.png"
                  alt="Staff outside an Everest Bank ATM counter during a branch opening"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative h-[199px] w-1/2 overflow-hidden rounded-lg">
                <Image
                  src="/images/about/profile/brief-profile-2.png"
                  alt="Everest Bank staff cutting a ribbon at a branch opening ceremony"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div className="flex flex-col items-start gap-4 lg:gap-6">
              <h2 className="font-heading text-title-0-mobile-md lg:text-heading-h2-mobile-md text-grey-500">
                Network
              </h2>
              <p className="text-body-3-mobile lg:text-body-2-desktop text-grey-500">
                Everest Bank Limited (EBL) provides customer-friendly services
                through its wide Network connected through ABBS system, which
                enables customers for operational transactions from any
                branches. The bank has 133 Branches, 161 ATM Counters, 33
                Revenue Collection Counters and 4 Extension Counters across the
                country making it a very efficient and accessible bank for its
                customers, anytime, anywhere.
              </p>
            </div>

            <div className="flex flex-col items-start gap-4 lg:gap-6">
              <h2 className="font-heading text-title-0-mobile-md lg:text-heading-h2-mobile-md text-grey-500">
                Joint Venture Partner *
              </h2>
              <div className="text-body-3-mobile lg:text-body-2-desktop text-grey-500 flex flex-col gap-4">
                <p>
                  Punjab National Bank (PNB), India&rsquo;s first Swadeshi Bank,
                  commenced its operations on April 12, 1895 from Lahore, with
                  an authorized capital of Rs. 2 lac and working capital of Rs.
                  20,000. The Bank was established by the spirit of nationalism
                  and was the first bank purely managed by Indians with Indian
                  Capital. During the long history of the Bank, 9 banks have
                  been merged/ amalgamated with PNB.
                </p>
                <p>
                  The bank has now total 54,179 domestic delivery channels with
                  a network of 10,261 domestic branches, 2 International
                  branches, 11,109 ATM&rsquo;s and 32,809 Business
                  Correspondents.
                </p>
                <p>
                  The Bank is having 2 International branches in Gift city,
                  Ahmedabad and Dubai. The Bank has two overseas subsidiaries
                  viz. PNB International Ltd. London, UK and Druk PNB Bank Ltd.
                  Bhutan. Bank has its representative offices in Myanmar and
                  Bangladesh.
                </p>
                <p>
                  As a joint-venture partner (holding 20% equity), PNB has been
                  providing top management support to Everest Bank Limited under
                  Technical Service Agreement.
                </p>
                <p>* Data based as of December 2025.</p>
              </div>
            </div>

            <div className="relative hidden h-[340px] w-full overflow-hidden rounded-lg lg:block">
              <Image
                src="/images/about/profile/network.png"
                alt="Everest Bank staff and partners cutting a ribbon at a branch opening"
                fill
                className="object-cover"
              />
            </div>
          </article>

          <ContentSidebar
            links={relatedPages}
            socialLinks={profileSocialLinks}
          />
        </div>
      </LayoutWrapper>
    </section>
  );
}
