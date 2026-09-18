import { icon } from '@/components/admin/icons';

import { cn } from '@/lib/utils';

import type { Location } from '@/types/admin';

type LocationRowProps = {
  location: Location;
  onEdit: () => void;
};

export default function LocationRow({ location, onEdit }: LocationRowProps) {
  return (
    <button
      type="button"
      onClick={onEdit}
      className="flex w-full cursor-pointer items-center text-left"
    >
      <div className="flex h-[74px] min-w-0 flex-1 items-center gap-4 px-4">
        <div className="flex shrink-0 items-center rounded-[4px] bg-slate-100 p-3">
          <icon.bank className="size-6 text-slate-950" />
        </div>
        <div className="flex min-w-0 flex-col gap-1.5">
          <p className="truncate text-[16px] leading-[1.3] text-neutral-700">
            {location.name}
          </p>
          <p className="truncate text-[12px] leading-[1.3] text-neutral-700/68">
            {location.display_location}
            {location.phone && ` · ${location.phone}`}
          </p>
        </div>
      </div>
      <div className="flex h-[74px] shrink-0 items-center gap-4 px-4">
        <span
          className={cn(
            'text-paragraph-sm-medium flex items-center justify-center rounded-full px-3 py-2',
            location.is_active
              ? 'bg-[#ebfef6] text-[#059669]'
              : 'bg-[#edf2f7] text-[#65738a]',
          )}
        >
          {location.is_active ? 'Live' : 'Hidden'}
        </span>
        <icon.chevronRight className="size-[16px] shrink-0 text-[#7d7c7d]" />
      </div>
    </button>
  );
}
