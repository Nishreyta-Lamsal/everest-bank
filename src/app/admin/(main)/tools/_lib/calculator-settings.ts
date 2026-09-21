import type { AnyCalculatorConfig, CalculatorRange } from '@/types/admin';

export type RangeFieldSpec<TConfig> = {
  name: keyof TConfig & string;
  title: string;
  description: string;
  unit: string;
  step: number;
};

export type RangeFieldErrors<TConfig> = Partial<
  Record<keyof TConfig & string, string>
>;

export function validateRangeFields<TConfig extends AnyCalculatorConfig>(
  config: TConfig,
  fields: RangeFieldSpec<TConfig>[],
): RangeFieldErrors<TConfig> {
  const errors: RangeFieldErrors<TConfig> = {};

  for (const field of fields) {
    const range = config[field.name] as CalculatorRange;

    if (
      [range.min, range.max, range.default].some(
        (value) => !Number.isFinite(value),
      )
    ) {
      errors[field.name] = 'Every value must be a number.';
      continue;
    }

    if (range.min < 0) {
      errors[field.name] = 'Minimum cannot be negative.';
      continue;
    }

    if (range.min >= range.max) {
      errors[field.name] = 'Minimum must be less than maximum.';
      continue;
    }

    if (range.default < range.min || range.default > range.max) {
      errors[field.name] = 'Default must sit between minimum and maximum.';
    }
  }

  return errors;
}
