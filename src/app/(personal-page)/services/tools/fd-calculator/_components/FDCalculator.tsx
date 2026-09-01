'use client';

import { useState } from 'react';

import { CalendarIcon, ChevronDownIcon } from '@/components/icons';
import SliderField from '../../_components/SliderField';
import CompoundingSelector from './CompoundingSelector';
import FDResultSummary from './FDResultSummary';

import { calculateMaturityValue } from '@/utils/calculator';

import {
  compoundingOptions,
  depositAmountRange,
  fdCalculatorDefaults,
  interestRateRange,
  tenureRanges,
  tenureUnitOptions,
} from '../_data/fd-calculator';

import type { CompoundingFrequency, TenureUnit } from '../_data/fd-calculator';

export default function FDCalculator() {
  const [depositAmount, setDepositAmount] = useState(
    fdCalculatorDefaults.depositAmount,
  );
  const [interestRate, setInterestRate] = useState(
    fdCalculatorDefaults.interestRate,
  );
  const [tenure, setTenure] = useState(fdCalculatorDefaults.tenure);
  const [tenureUnit, setTenureUnit] = useState<TenureUnit>(
    fdCalculatorDefaults.tenureUnit,
  );
  const [compounding, setCompounding] = useState<CompoundingFrequency>(
    fdCalculatorDefaults.compounding,
  );

  const tenureRange = tenureRanges[tenureUnit];

  const compoundingOption =
    compoundingOptions.find((option) => option.value === compounding) ??
    compoundingOptions[0];

  const years = tenureUnit === 'years' ? tenure : tenure / 12;
  const maturityValue = calculateMaturityValue(
    depositAmount,
    interestRate,
    years,
    compoundingOption.periodsPerYear,
  );
  const interestEarned = Math.max(maturityValue - depositAmount, 0);

  const tenureLabel = `${tenure} ${tenureUnit === 'years' ? 'years' : 'months'}`;

  const handleTenureUnitChange = (nextUnit: TenureUnit) => {
    const nextRange = tenureRanges[nextUnit];
    const convertedTenure =
      nextUnit === 'months' ? tenure * 12 : Math.round(tenure / 12);

    setTenure(
      Math.min(Math.max(convertedTenure, nextRange.min), nextRange.max),
    );
    setTenureUnit(nextUnit);
  };

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
          prefix={<CalendarIcon className="size-[20px] shrink-0" />}
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
              <ChevronDownIcon className="text-grey-300 pointer-events-none absolute right-0 size-[16px]" />
            </div>
          }
        />

        <div className="border-cream-75 w-full border-t" />

        <CompoundingSelector
          value={compounding}
          onValueChange={setCompounding}
        />
      </div>

      <FDResultSummary
        maturityValue={maturityValue}
        principal={depositAmount}
        interestEarned={interestEarned}
        tenureLabel={tenureLabel}
        compoundingLabel={compoundingOption.label.toLowerCase()}
      />
    </div>
  );
}
