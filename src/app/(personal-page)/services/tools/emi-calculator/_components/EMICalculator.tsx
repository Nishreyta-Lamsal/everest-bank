'use client';

import { useState } from 'react';

import { icon } from '@/components/icons';
import SliderField from '../../_components/SliderField';
import EMIResultSummary from './EMIResultSummary';

import { calculateMonthlyEmi } from '@/utils/calculator';

import {
  emiCalculatorDefaults,
  interestRateRange,
  loanAmountRange,
  tenureRanges,
  tenureUnitOptions,
} from '../_data/emi-calculator';

import type { TenureUnit } from '../_data/emi-calculator';

export default function EMICalculator() {
  const [loanAmount, setLoanAmount] = useState(
    emiCalculatorDefaults.loanAmount,
  );
  const [interestRate, setInterestRate] = useState(
    emiCalculatorDefaults.interestRate,
  );
  const [tenure, setTenure] = useState(emiCalculatorDefaults.tenure);
  const [tenureUnit, setTenureUnit] = useState<TenureUnit>(
    emiCalculatorDefaults.tenureUnit,
  );

  const tenureRange = tenureRanges[tenureUnit];

  const months = tenureUnit === 'years' ? tenure * 12 : tenure;
  const monthlyEmi = calculateMonthlyEmi(loanAmount, interestRate, months);
  const totalPayable = monthlyEmi * months;
  const totalInterest = Math.max(totalPayable - loanAmount, 0);
  const principalShare =
    totalPayable > 0 ? (loanAmount / totalPayable) * 100 : 0;
  const interestShare =
    totalPayable > 0 ? (totalInterest / totalPayable) * 100 : 0;

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
          label="Loan Amount"
          value={loanAmount}
          min={loanAmountRange.min}
          max={loanAmountRange.max}
          step={loanAmountRange.step}
          onValueChange={setLoanAmount}
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

      <EMIResultSummary
        monthlyEmi={monthlyEmi}
        months={months}
        principal={loanAmount}
        totalInterest={totalInterest}
        totalPayable={totalPayable}
        principalShare={principalShare}
        interestShare={interestShare}
      />
    </div>
  );
}
