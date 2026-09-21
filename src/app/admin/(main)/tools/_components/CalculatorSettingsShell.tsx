'use client';

import { useState } from 'react';

import { Button } from '@/components/admin/ui/button';
import CalculatorRangeCard from './CalculatorRangeCard';

import {
  useCalculator,
  useUpdateCalculator,
} from '@/hooks/api/admin/use-calculators';
import { validateRangeFields } from '../_lib/calculator-settings';

import type { ReactNode } from 'react';

import type { RangeFieldSpec } from '../_lib/calculator-settings';
import type {
  CalculatorConfig,
  CalculatorConfigMap,
  CalculatorRange,
  CalculatorSlug,
} from '@/types/admin';

type CalculatorSettingsShellProps<S extends CalculatorSlug> = {
  slug: S;
  rangeFields: RangeFieldSpec<CalculatorConfigMap[S]>[];
  renderExtraFields?: (
    config: CalculatorConfigMap[S],
    setConfig: (next: CalculatorConfigMap[S]) => void,
  ) => ReactNode;
  validateExtraFields?: (config: CalculatorConfigMap[S]) => string[];
};

export default function CalculatorSettingsShell<S extends CalculatorSlug>({
  slug,
  rangeFields,
  renderExtraFields,
  validateExtraFields,
}: CalculatorSettingsShellProps<S>) {
  const { data, isPending, isError } = useCalculator(slug);

  if (isPending) {
    return (
      <p className="text-paragraph-sm text-neutral-700">
        Loading calculator settings…
      </p>
    );
  }

  if (isError || !data) {
    return (
      <p className="text-paragraph-sm text-red-600">
        Could not load these calculator settings. Please try again.
      </p>
    );
  }

  return (
    <CalculatorSettingsForm
      key={data.updated_at}
      slug={slug}
      calculator={data}
      rangeFields={rangeFields}
      renderExtraFields={renderExtraFields}
      validateExtraFields={validateExtraFields}
    />
  );
}

type CalculatorSettingsFormProps<S extends CalculatorSlug> =
  CalculatorSettingsShellProps<S> & {
    calculator: CalculatorConfig<S>;
  };

function CalculatorSettingsForm<S extends CalculatorSlug>({
  slug,
  calculator,
  rangeFields,
  renderExtraFields,
  validateExtraFields,
}: CalculatorSettingsFormProps<S>) {
  const updateCalculator = useUpdateCalculator(slug);

  const [config, setConfig] = useState<CalculatorConfigMap[S]>(
    calculator.config,
  );
  const [savedAt, setSavedAt] = useState<string | null>(null);

  const rangeErrors = validateRangeFields(config, rangeFields);
  const extraErrors = validateExtraFields?.(config) ?? [];
  const hasErrors =
    Object.keys(rangeErrors).length > 0 || extraErrors.length > 0;

  function handleRangeChange(
    name: keyof CalculatorConfigMap[S] & string,
    key: keyof CalculatorRange,
    value: number,
  ) {
    setSavedAt(null);
    setConfig((current) => ({
      ...current,
      [name]: { ...(current[name] as CalculatorRange), [key]: value },
    }));
  }

  function handleExtraChange(next: CalculatorConfigMap[S]) {
    setSavedAt(null);
    setConfig(next);
  }

  function handleSave() {
    if (hasErrors) return;

    updateCalculator.mutate(
      { is_enabled: calculator.is_enabled, config },
      { onSuccess: () => setSavedAt(new Date().toLocaleTimeString()) },
    );
  }

  return (
    <div className="flex w-full flex-col gap-6">
      {rangeFields.map((field) => (
        <CalculatorRangeCard
          key={field.name}
          title={field.title}
          description={field.description}
          unit={field.unit}
          step={field.step}
          value={config[field.name] as CalculatorRange}
          error={rangeErrors[field.name]}
          onChange={(key, value) => handleRangeChange(field.name, key, value)}
        />
      ))}

      {renderExtraFields?.(config, handleExtraChange)}

      <div className="flex flex-col items-end gap-2">
        {extraErrors.map((error) => (
          <p
            key={error}
            className="text-paragraph-sm text-red-600"
            role="alert"
          >
            {error}
          </p>
        ))}

        <div className="flex items-center justify-end gap-3">
          {savedAt && (
            <p className="text-paragraph-sm text-neutral-700">
              Saved at {savedAt}
            </p>
          )}
          {updateCalculator.isError && (
            <p className="text-paragraph-sm text-red-600">
              Could not save. Please try again.
            </p>
          )}
          <Button
            onClick={handleSave}
            disabled={hasErrors || updateCalculator.isPending}
          >
            {updateCalculator.isPending ? 'Saving…' : 'Save changes'}
          </Button>
        </div>
      </div>
    </div>
  );
}
