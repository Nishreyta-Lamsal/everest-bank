'use client';

import { Input } from '@/components/admin/ui/input';
import { icon } from '@/components/admin/icons';

export type StatFieldValue = {
  value: string;
  title: string;
};

type StatFieldRowProps = {
  stat: StatFieldValue;
  onChange: (next: StatFieldValue) => void;
  onRemove: () => void;
  valuePlaceholder?: string;
  titlePlaceholder?: string;
};

export default function StatFieldRow({
  stat,
  onChange,
  onRemove,
  valuePlaceholder = 'NPR 50 Lakh+',
  titlePlaceholder = 'Title for the stat',
}: StatFieldRowProps) {
  return (
    <div className="flex w-full items-center gap-6">
      <div className="flex flex-1 items-center gap-2">
        <Input
          variant="default"
          size="medium"
          placeholder={valuePlaceholder}
          value={stat.value}
          onChange={(event) =>
            onChange({ ...stat, value: event.target.value })
          }
        />
        <Input
          variant="default"
          size="medium"
          placeholder={titlePlaceholder}
          value={stat.title}
          onChange={(event) =>
            onChange({ ...stat, title: event.target.value })
          }
        />
      </div>
      <button
        type="button"
        onClick={onRemove}
        aria-label="Remove stat"
        className="shrink-0 cursor-pointer text-slate-600"
      >
        <icon.trash className="size-4" />
      </button>
    </div>
  );
}
