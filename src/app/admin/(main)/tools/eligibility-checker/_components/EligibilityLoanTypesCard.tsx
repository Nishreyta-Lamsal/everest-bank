'use client';

import { icon } from '@/components/admin/icons';
import { Button } from '@/components/admin/ui/button';
import { Card } from '@/components/admin/ui/card';
import { Input } from '@/components/admin/ui/input';

import { toLoanTypeSlug } from '../_data/eligibility-settings';

import type { EligibilityCalculatorConfig } from '@/types/admin';

type EligibilityLoanTypesCardProps = {
  config: EligibilityCalculatorConfig;
  onChange: (next: EligibilityCalculatorConfig) => void;
};

export default function EligibilityLoanTypesCard({
  config,
  onChange,
}: EligibilityLoanTypesCardProps) {
  function handleLabelChange(index: number, label: string) {
    const previous = config.loan_types[index];
    const slug = toLoanTypeSlug(label);

    const loanTypes = config.loan_types.map((loanType, position) =>
      position === index ? { slug, label } : loanType,
    );

    // Follow the rename so the default doesn't point at a stale slug.
    const defaultLoanType =
      config.default_loan_type === previous.slug
        ? slug
        : config.default_loan_type;

    onChange({
      ...config,
      loan_types: loanTypes,
      default_loan_type: defaultLoanType,
    });
  }

  function handleRemove(index: number) {
    const removed = config.loan_types[index];
    const loanTypes = config.loan_types.filter(
      (_, position) => position !== index,
    );

    const defaultLoanType =
      config.default_loan_type === removed.slug
        ? (loanTypes[0]?.slug ?? '')
        : config.default_loan_type;

    onChange({
      ...config,
      loan_types: loanTypes,
      default_loan_type: defaultLoanType,
    });
  }

  function handleAdd() {
    onChange({
      ...config,
      loan_types: [...config.loan_types, { slug: '', label: '' }],
    });
  }

  return (
    <Card className="flex w-full flex-col gap-4 p-5">
      <div className="flex flex-col gap-1">
        <p className="text-paragraph-md-medium text-neutral-900">Loan types</p>
        <p className="text-paragraph-sm text-neutral-700">
          The options visitors choose from, and which one is selected first.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {config.loan_types.map((loanType, index) => (
          <div
            key={index}
            className="border-black-alpha-10 flex items-center gap-3 rounded-lg border p-3"
          >
            <label className="flex shrink-0 items-center gap-2">
              <input
                type="radio"
                name="default-loan-type"
                className="size-4 cursor-pointer"
                checked={
                  Boolean(loanType.slug) &&
                  config.default_loan_type === loanType.slug
                }
                onChange={() =>
                  onChange({ ...config, default_loan_type: loanType.slug })
                }
              />
              <span className="text-paragraph-mini text-neutral-700">
                Default
              </span>
            </label>

            <Input
              value={loanType.label}
              placeholder="Loan type name"
              onChange={(event) => handleLabelChange(index, event.target.value)}
            />

            <Button
              variant="destructiveGhost"
              size="small"
              aria-label={`Remove ${loanType.label || 'loan type'}`}
              onClick={() => handleRemove(index)}
            >
              <icon.trash />
            </Button>
          </div>
        ))}
      </div>

      <div>
        <Button variant="outline" size="small" onClick={handleAdd}>
          <icon.plus />
          Add loan type
        </Button>
      </div>
    </Card>
  );
}
