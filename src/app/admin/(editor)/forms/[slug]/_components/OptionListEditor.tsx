'use client';

import { icon } from '@/components/admin/icons';
import { Button } from '@/components/admin/ui/button';
import { Input } from '@/components/admin/ui/input';

import type { FormFieldOption } from '@/types/admin';

/** Value the visitor's answer is stored as, derived from the visible label. */
function toValue(label: string) {
  return label
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

type OptionListEditorProps = {
  options: FormFieldOption[];
  onChange: (options: FormFieldOption[]) => void;
};

export default function OptionListEditor({
  options,
  onChange,
}: OptionListEditorProps) {
  function updateLabel(index: number, label: string) {
    const next = [...options];
    const existing = next[index];
    // Keep value in step with the label only while it still matches, so an
    // edited label never silently orphans answers already submitted.
    const keepValue =
      existing.value && existing.value !== toValue(existing.label);
    next[index] = {
      label,
      value: keepValue ? existing.value : toValue(label),
    };
    onChange(next);
  }

  return (
    <div className="flex w-full flex-col gap-2">
      {options.map((option, index) => (
        <div key={index} className="flex w-full items-center gap-2">
          <Input
            variant="filled"
            size="small"
            placeholder="Option label"
            value={option.label}
            onChange={(event) => updateLabel(index, event.target.value)}
          />
          <button
            type="button"
            aria-label={`Remove ${option.label || 'option'}`}
            onClick={() => onChange(options.filter((_, i) => i !== index))}
            className="flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-lg text-red-500 hover:bg-red-50"
          >
            <icon.trash className="size-4" />
          </button>
        </div>
      ))}

      <Button
        type="button"
        variant="outline"
        size="small"
        onClick={() => onChange([...options, { label: '', value: '' }])}
      >
        <icon.plus />
        Add option
      </Button>

      {options.length === 0 && (
        <p className="text-[12px] text-neutral-700/68">
          Add at least one option, or switch to a live source above.
        </p>
      )}
    </div>
  );
}
