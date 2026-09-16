'use client';

// import { icon } from '@/components/admin/icons';
import { Input } from '@/components/admin/ui/input';
import FieldLabel from '@/components/admin/shared/FieldLabel';
import LinkTargetSelect from '@/components/admin/shared/LinkTargetSelect';

import type { ProductCard } from '@/types/admin';

type ProductCardFieldGroupProps = {
  label: string;
  card: ProductCard;
  onChange: (card: ProductCard) => void;
  onRemove: () => void;
};

export default function ProductCardFieldGroup({
  label,
  card,
  onChange,
}: ProductCardFieldGroupProps) {
  return (
    <div className="flex w-full flex-col gap-2 rounded-[6px] border border-[#e6ecf4] p-3">
      <div className="flex w-full items-center justify-between">
        <p className="min-w-0 truncate text-[13px] font-semibold text-neutral-900">
          {label}
          {card.title ? ` · ${card.title}` : ''}
        </p>
        {/* <button
          type="button"
          onClick={onRemove}
          aria-label={`Remove ${label.toLowerCase()}`}
          className="text-slate-600"
        >
          <icon.trash className="size-4" />
        </button> */}
      </div>

      <div className="flex w-full flex-col gap-3">
        <FieldLabel label="Title">
          <Input
            variant="filled"
            size="medium"
            placeholder="Open Account"
            value={card.title ?? ''}
            onChange={(event) =>
              onChange({ ...card, title: event.target.value })
            }
          />
        </FieldLabel>

        <FieldLabel label="Subtitle">
          <Input
            variant="filled"
            size="medium"
            placeholder="Only in 3 minutes"
            value={card.subtitle ?? ''}
            onChange={(event) =>
              onChange({ ...card, subtitle: event.target.value })
            }
          />
        </FieldLabel>

        <FieldLabel label="Links to">
          <LinkTargetSelect
            value={card.href ?? ''}
            onChange={(href) => onChange({ ...card, href })}
          />
        </FieldLabel>
      </div>
    </div>
  );
}
