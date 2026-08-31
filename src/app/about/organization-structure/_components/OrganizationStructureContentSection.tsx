import Image from 'next/image';

import LayoutWrapper from '@/components/layouts/wrapper/LayoutWrapper';
import ContentSidebar from '@/components/shared/content/ContentSidebar';
import ContentQuote from '@/components/shared/content/ContentQuote';
import { CourtIcon, StarBadgeIcon } from '@/components/icons';
import InfoListRow from './InfoListRow';
import LeaderListRow from './LeaderListRow';

import { relatedPages } from '../_data/related-pages';
import { boardCommittees } from '../_data/governance';
import { chiefOfficers, executiveLeadership } from '../_data/leadership';

import { socialLinks } from '@/data';

export default function OrganizationStructureContentSection() {
  return (
    <section className="w-full py-16 lg:py-24">
      <LayoutWrapper>
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between">
          <article className="flex w-full max-w-[750px] flex-col items-start gap-10 lg:gap-13.5">
            <div className="flex w-full flex-col items-start gap-12">
              <div className="flex w-full flex-col items-start gap-6">
                <div className="flex flex-col items-start gap-3 lg:gap-2">
                  <p className="text-body-3-mobile lg:text-body-3-desktop text-grey-500">
                    Governance
                  </p>
                  <h2 className="font-heading text-title-0-mobile-md lg:text-heading-h4-desktop-md text-grey-500">
                    Board & board-level committees
                  </h2>
                </div>

                <div className="bg-cream-25 flex w-full flex-col items-start gap-6 rounded-2xl p-4 lg:p-6">
                  <div className="flex items-center gap-2">
                    <CourtIcon className="size-6 text-orange-500 lg:size-7" />
                    <h3 className="font-heading text-title-0-mobile-md lg:text-heading-h4-desktop-md text-grey-500">
                      Board of Directors
                    </h3>
                  </div>
                  <div className="flex w-full flex-col items-start">
                    {boardCommittees.map((committee, index) => (
                      <InfoListRow
                        key={committee.name}
                        name={committee.name}
                        badge={committee.abbreviation}
                        isLast={index === boardCommittees.length - 1}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex w-full flex-col items-start gap-6">
                <div className="flex flex-col items-start gap-3 lg:gap-2">
                  <p className="text-body-3-mobile lg:text-body-3-desktop text-grey-500">
                    Executive Leadership
                  </p>
                  <h2 className="font-heading text-title-0-mobile-md lg:text-heading-h4-desktop-md text-grey-500">
                    The team running the bank
                  </h2>
                </div>

                <div className="bg-cream-25 flex w-full flex-col items-start gap-6 rounded-2xl p-4 lg:p-6">
                  <div className="flex w-full flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-2">
                      <StarBadgeIcon className="size-6 text-orange-500 lg:size-7" />
                      <h3 className="font-heading text-title-0-mobile-md lg:text-heading-h4-desktop-md text-grey-500">
                        Chief Executive Officer
                      </h3>
                    </div>
                    <p className="text-body-3-mobile lg:text-body-3-desktop text-grey-500 pl-8 sm:pl-0">
                      Leads overall strategy & operations
                    </p>
                  </div>
                  <div className="flex w-full flex-col items-start">
                    {executiveLeadership.map((member, index) => (
                      <LeaderListRow
                        key={member.name}
                        name={member.name}
                        departments={member.departments}
                        role={member.role}
                        isLast={index === executiveLeadership.length - 1}
                      />
                    ))}
                  </div>
                </div>

                <div className="bg-cream-25 flex w-full flex-col items-start gap-6 rounded-2xl p-4 lg:p-6">
                  <h3 className="font-heading text-title-0-mobile-md lg:text-heading-h4-desktop-md text-grey-500">
                    Chief Officers
                  </h3>
                  <div className="flex w-full flex-col items-start">
                    {chiefOfficers.map((officer, index) => (
                      <LeaderListRow
                        key={officer.name}
                        name={officer.name}
                        role={officer.role}
                        isLast={index === chiefOfficers.length - 1}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="relative h-[201px] w-full overflow-hidden rounded-lg lg:h-[340px]">
              <Image
                src="/images/about/organization-structure/team-photo.png"
                alt="Everest Bank staff and partners at a branch opening ceremony"
                fill
                className="object-cover"
              />
            </div>

            <ContentQuote title="“Consistent, strong and dependable: दिगो, दरिलो, विश्वासिलो.”" />
          </article>

          <ContentSidebar links={relatedPages} socialLinks={socialLinks} />
        </div>
      </LayoutWrapper>
    </section>
  );
}
