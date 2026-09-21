import type { RangeFieldSpec } from '../../_lib/calculator-settings';
import type { EligibilityCalculatorConfig } from '@/types/admin';

/** Gross monthly income is left as the backend sends it, not edited here. */
export const eligibilityRangeFields: RangeFieldSpec<EligibilityCalculatorConfig>[] =
  [
    {
      name: 'interest_rate',
      title: 'Interest rate',
      description: 'The annual rate range offered on the checker.',
      unit: '%',
      step: 0.1,
    },
  ];

/** Slugs identify a loan type to the backend, so they must be unique. */
export function toLoanTypeSlug(label: string) {
  return label
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function validateEligibilityExtraFields(
  config: EligibilityCalculatorConfig,
) {
  const errors: string[] = [];

  if (config.loan_types.length === 0) {
    errors.push('Add at least one loan type.');
  }

  if (config.loan_types.some((loanType) => !loanType.label.trim())) {
    errors.push('Every loan type needs a name.');
  }

  const slugs = config.loan_types.map((loanType) => loanType.slug);

  if (new Set(slugs).size !== slugs.length) {
    errors.push('Two loan types have the same name. Make each one distinct.');
  }

  if (
    config.loan_types.length > 0 &&
    !slugs.includes(config.default_loan_type)
  ) {
    errors.push('Pick which loan type is selected by default.');
  }

  return errors;
}
