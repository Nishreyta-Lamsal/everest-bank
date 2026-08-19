import LayoutWrapper from '@/components/layouts/wrapper/LayoutWrapper';

export type ContentStat = {
  value: string;
  label: string;
};

type ContentStatsSectionProps = {
  stats: ContentStat[];
};

export default function ContentStatsSection({
  stats,
}: ContentStatsSectionProps) {
  return (
    <section className="w-full py-8 lg:py-22">
      <LayoutWrapper>
        <div className="grid grid-cols-2 gap-x-6.5 gap-y-6 lg:flex lg:flex-nowrap lg:justify-between">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col gap-4">
              <p className="font-heading text-heading-h3-mobile-md lg:text-heading-h2-desktop-md text-red-500">
                {stat.value}
              </p>
              <p className="font-heading text-title-3-mobile text-grey-300 lg:font-body lg:text-body-2-desktop lg:text-grey-500">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </LayoutWrapper>
    </section>
  );
}
