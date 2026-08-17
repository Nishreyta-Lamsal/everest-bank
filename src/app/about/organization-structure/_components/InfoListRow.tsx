import { cn } from '@/lib/utils';

type InfoListRowProps = {
  name: string;
  badge: string;
  isLast: boolean;
};

export default function InfoListRow({ name, badge, isLast }: InfoListRowProps) {
  return (
    <div
      className={cn(
        'flex w-full items-center justify-between gap-4 py-5 lg:py-4',
        !isLast && 'border-b border-[#f4efde]',
      )}
    >
      <p className="font-heading text-title-2-desktop lg:text-heading-h4-desktop text-grey-500">
        {name}
      </p>
      <div className="bg-cream-75 flex shrink-0 items-center justify-center rounded-full px-4 py-2">
        <p className="text-body-3-mobile lg:text-body-3-desktop text-grey-500 whitespace-nowrap">
          {badge}
        </p>
      </div>
    </div>
  );
}
