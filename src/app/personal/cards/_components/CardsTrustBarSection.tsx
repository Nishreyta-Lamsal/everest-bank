import LayoutWrapper from '@/components/layouts/wrapper/LayoutWrapper';

import { cardTrustBadges } from '../_data';

export default function CardsTrustBarSection() {
  return (
    <section className="w-full py-8">
      <LayoutWrapper>
        <div className="flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between">
          <p className="text-body-2-mobile lg:text-body-2-desktop text-grey-400 lg:w-[260px]">
            Accepted everywhere you are
          </p>
          <div className="flex flex-col items-start gap-4.5 lg:flex-row lg:flex-wrap lg:items-center lg:gap-6">
            {cardTrustBadges.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2">
                <Icon className="size-[18px] shrink-0 text-orange-500 lg:size-[20px]" />
                <p className="text-body-2-mobile lg:text-body-2-desktop text-grey-400 whitespace-nowrap">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </LayoutWrapper>
    </section>
  );
}
