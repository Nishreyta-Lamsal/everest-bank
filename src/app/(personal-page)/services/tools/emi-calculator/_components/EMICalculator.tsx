'use client';

import { useState } from 'react';

import { CalendarIcon, ChevronDownIcon } from '@/components/icons';
import CalculatorSliderField from './CalculatorSliderField';
import EMIResultSummary from './EMIResultSummary';

import {
  emiCalculatorDefaults,
  interestRateRange,
  loanAmountRange,
  tenureRanges,
  tenureUnitOptions,
} from '../_data/emi-calculator';

import type { TenureUnit } from '../_data/emi-calculator';

function calculateMonthlyEmi(
  principal: number,
  annualRate: number,
  months: number,
) {
  if (principal <= 0 || months <= 0) {
    return 0;
  }

  const monthlyRate = annualRate / 12 / 100;

  if (monthlyRate === 0) {
    return principal / months;
  }

  const growth = (1 + monthlyRate) ** months;

  return (principal * monthlyRate * growth) / (growth - 1);
}

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
        <CalculatorSliderField
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

        <CalculatorSliderField
          label="Interest Rate (%)"
          value={interestRate}
          min={interestRateRange.min}
          max={interestRateRange.max}
          step={interestRateRange.step}
          onValueChange={setInterestRate}
          prefix="%"
        />

        <div className="border-cream-75 w-full border-t" />

        <CalculatorSliderField
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
