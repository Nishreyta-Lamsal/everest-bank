import { cn } from '@/lib/utils';

type LeaderListRowProps = {
  name: string;
  departments?: string;
  role: string;
  isLast: boolean;
};

export default function LeaderListRow({
  name,
  departments,
  role,
  isLast,
}: LeaderListRowProps) {
  return (
    <div
      className={cn(
        'flex w-full flex-col items-start justify-between gap-5 py-6 sm:flex-row sm:items-center lg:gap-4 lg:py-4',
        !isLast && 'border-b border-[#f4efde]',
      )}
    >
      <div className="flex flex-col items-start gap-3 lg:gap-4">
        <p className="font-heading text-title-2-desktop lg:text-heading-h4-desktop text-grey-500">
          {name}
        </p>
        {departments && (
          <p className="text-body-3-mobile lg:text-body-3-desktop text-grey-500">
            {departments}
          </p>
        )}
      </div>
      <div className="bg-cream-75 flex w-full items-center justify-center rounded-full px-4 py-2 sm:w-auto sm:shrink-0">
        <p className="text-body-3-mobile lg:text-body-3-desktop text-grey-500 whitespace-nowrap">
          {role}
        </p>
      </div>
    </div>
  );
}
