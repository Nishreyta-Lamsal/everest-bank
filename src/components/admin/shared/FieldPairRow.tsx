'use client';

import FieldLabel from './FieldLabel';
import { Input } from '@/components/admin/ui/input';
import { Textarea } from '@/components/admin/ui/textarea';
import { icon } from '@/components/admin/icons';

type FieldPairRowProps = {
  label: string;
  primaryValue: string;
  onPrimaryChange: (value: string) => void;
  primaryPlaceholder?: string;
  secondaryValue: string;
  onSecondaryChange: (value: string) => void;
  secondaryPlaceholder?: string;
  onRemove: () => void;
  removeLabel?: string;
};

export default function FieldPairRow({
  label,
  primaryValue,
  onPrimaryChange,
  primaryPlaceholder,
  secondaryValue,
  onSecondaryChange,
  secondaryPlaceholder,
  onRemove,
  removeLabel,
}: FieldPairRowProps) {
  return (
    <div className="flex w-full items-center gap-6">
      <div className="flex flex-1 flex-col gap-2">
        <FieldLabel label={label}>
          <Input
            variant="filled"
            size="medium"
            placeholder={primaryPlaceholder}
            value={primaryValue}
            onChange={(event) => onPrimaryChange(event.target.value)}
          />
        </FieldLabel>
        <Textarea
          variant="filled"
          size="medium"
          placeholder={secondaryPlaceholder}
          value={secondaryValue}
          onChange={(event) => onSecondaryChange(event.target.value)}
        />
      </div>
      <button
        type="button"
        onClick={onRemove}
        aria-label={removeLabel ?? 'Remove'}
        className="shrink-0 cursor-pointer text-slate-600"
      >
        <icon.trash className="size-4" />
      </button>
    </div>
  );
}
