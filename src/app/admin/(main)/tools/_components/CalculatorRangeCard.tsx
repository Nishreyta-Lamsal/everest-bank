'use client';

import { Card } from '@/components/admin/ui/card';
import { Input } from '@/components/admin/ui/input';

import { cn } from '@/lib/utils';

import type { CalculatorRange } from '@/types/admin';

type RangeKey = keyof CalculatorRange;

type CalculatorRangeCardProps = {
  title: string;
  description: string;
  unit: string;
  step: number;
  value: CalculatorRange;
  error?: string;
  onChange: (key: RangeKey, value: number) => void;
};

const fields: { key: RangeKey; label: string; hint: string }[] = [
  { key: 'min', label: 'Minimum', hint: 'Lowest value a visitor can pick.' },
  { key: 'max', label: 'Maximum', hint: 'Highest value a visitor can pick.' },
  {
    key: 'default',
    label: 'Default',
    hint: 'Where the slider starts on page load.',
  },
];

export default function CalculatorRangeCard({
  title,
  description,
  unit,
  step,
  value,
  error,
  onChange,
}: CalculatorRangeCardProps) {
  return (
    <Card className="flex w-full flex-col gap-4 p-5">
      <div className="flex flex-col gap-1">
        <p className="text-paragraph-md-medium text-neutral-900">{title}</p>
        <p className="text-paragraph-sm text-neutral-700">{description}</p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {fields.map((field) => (
          <label key={field.key} className="flex flex-col gap-1.5">
            <span className="text-paragraph-sm-medium text-neutral-900">
              {field.label}
            </span>
            <Input
              type="number"
              inputMode="decimal"
              step={step}
              value={String(value[field.key])}
              aria-invalid={Boolean(error)}
              onChange={(event) =>
                onChange(field.key, Number(event.target.value))
              }
              rightIcon={
                <span className="text-paragraph-sm text-neutral-700 shrink-0">
                  {unit}
                </span>
              }
            />
            <span className="text-paragraph-mini text-neutral-700">
              {field.hint}
            </span>
          </label>
        ))}
      </div>

      {error && (
        <p className={cn('text-paragraph-sm text-red-600')} role="alert">
          {error}
        </p>
      )}
    </Card>
  );
}
