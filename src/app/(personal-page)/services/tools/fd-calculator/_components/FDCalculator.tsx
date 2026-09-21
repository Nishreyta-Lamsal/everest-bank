'use client';

import { useState } from 'react';

import { icon } from '@/components/icons';
import SliderField from '../../_components/SliderField';
import CalculatorUnavailable from '../../_components/CalculatorUnavailable';
import FDResultSummary from './FDResultSummary';

import { calculateMaturityValue } from '@/utils/calculator';
import { usePublicCalculator } from '@/hooks/api/use-calculators';

import {
  fdCalculatorFallback,
  periodsPerYear,
  toSliderRange,
  toTenureRanges,
  tenureUnitOptions,
} from '../_data/fd-calculator';

import type { TenureUnit } from '../_data/fd-calculator';

export default function FDCalculator() {
  const { data: calculator, isPending } = usePublicCalculator('fd');
  const config = calculator?.config ?? fdCalculatorFallback;

  const depositAmountRange = toSliderRange(config.deposit_amount, 10000);
  const interestRateRange = toSliderRange(config.interest_rate, 0.1);
  const tenureRanges = toTenureRanges(config.tenure_years);

  const [depositAmount, setDepositAmount] = useState(
    config.deposit_amount.default,
  );
  const [interestRate, setInterestRate] = useState(
    config.interest_rate.default,
  );
  const [tenure, setTenure] = useState(config.tenure_years.default);
  const [tenureUnit, setTenureUnit] = useState<TenureUnit>('years');

  const tenureRange = tenureRanges[tenureUnit];

  if (!isPending && !calculator) {
    return <CalculatorUnavailable />;
  }

  const years = tenureUnit === 'years' ? tenure : tenure / 12;
  const maturityValue = calculateMaturityValue(
    depositAmount,
    interestRate,
    years,
    periodsPerYear,
  );
  const interestEarned = Math.max(maturityValue - depositAmount, 0);

  const tenureLabel = `${tenure} ${tenureUnit === 'years' ? 'years' : 'months'}`;

  function handleTenureUnitChange(nextUnit: TenureUnit) {
    const nextRange = tenureRanges[nextUnit];
    const convertedTenure =
      nextUnit === 'months' ? tenure * 12 : Math.round(tenure / 12);

    setTenure(
      Math.min(Math.max(convertedTenure, nextRange.min), nextRange.max),
    );
    setTenureUnit(nextUnit);
  }

  return (
    <div className="flex w-full flex-col gap-10 lg:gap-8">
      <div className="flex flex-col gap-6">
        <SliderField
          label="Deposit Amount"
          value={depositAmount}
          min={depositAmountRange.min}
          max={depositAmountRange.max}
          step={depositAmountRange.step}
          onValueChange={setDepositAmount}
          prefix="Rs."
          formatValue={(value) => value.toLocaleString('en-IN')}
        />

        <div className="border-cream-75 w-full border-t" />

        <SliderField
          label="Interest Rate (%)"
          value={interestRate}
          min={interestRateRange.min}
          max={interestRateRange.max}
          step={interestRateRange.step}
          onValueChange={setInterestRate}
          prefix="%"
        />

        <div className="border-cream-75 w-full border-t" />

        <SliderField
          label="Tenure (Annual)"
          value={tenure}
          min={tenureRange.min}
          max={tenureRange.max}
          step={tenureRange.step}
          onValueChange={setTenure}
          prefix={<icon.calendar className="size-[20px] shrink-0" />}
          trailing={
            <div className="relative flex shrink-0 items-center">
              <select
                aria-label="Tenure unit"
                value={tenureUnit}
                onChange={(event) =>
                  handleTenureUnitChange(event.target.value as TenureUnit)
                }
                className="text-body-2-mobile-md lg:text-body-3-desktop-md text-grey-300 cursor-pointer appearance-none bg-transparent pr-5 outline-none"
              >
                {tenureUnitOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <icon.chevronDown className="text-grey-300 pointer-events-none absolute right-0 size-[16px]" />
            </div>
          }
        />
      </div>

      <FDResultSummary
        maturityValue={maturityValue}
        principal={depositAmount}
        interestEarned={interestEarned}
        tenureLabel={tenureLabel}
      />
    </div>
  );
}
