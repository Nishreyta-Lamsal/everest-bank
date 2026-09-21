'use client';

import { useState } from 'react';

import CalculatorUnavailable from '../../_components/CalculatorUnavailable';
import LoanTypeField from './LoanTypeField';
import AmountField from './AmountField';
import MeasureField from './MeasureField';
import EligibilityResultSummary from './EligibilityResultSummary';

import {
  calculateEligibleAmount,
  calculateMonthlyEmi,
} from '@/utils/calculator';
import { usePublicCalculator } from '@/hooks/api/use-calculators';

import {
  eligibilityCheckerDefaults,
  eligibilityCheckerFallback,
  maxEmiShareOfDisposableIncome,
  tenureRange,
  toLoanTypeOptions,
  toSliderRange,
} from '../_data/eligibility-checker';

export default function EligibilityChecker() {
  const { data: calculator, isPending } = usePublicCalculator('eligibility');
  const config = calculator?.config ?? eligibilityCheckerFallback;

  const interestRateRange = toSliderRange(config.interest_rate, 0.1);
  const loanTypeOptions = toLoanTypeOptions(config);

  const [loanType, setLoanType] = useState(config.default_loan_type);
  const [monthlyIncome, setMonthlyIncome] = useState(
    config.gross_monthly_income.default,
  );
  const [monthlyExpenses, setMonthlyExpenses] = useState(
    eligibilityCheckerDefaults.monthlyExpenses,
  );
  const [tenure, setTenure] = useState(eligibilityCheckerDefaults.tenure);
  const [interestRate, setInterestRate] = useState(
    config.interest_rate.default,
  );

  if (!isPending && !calculator) {
    return <CalculatorUnavailable />;
  }

  const months = tenure * 12;
  const disposableIncome = Math.max(monthlyIncome - monthlyExpenses, 0);
  const maxEmi = disposableIncome * maxEmiShareOfDisposableIncome;
  const eligibleAmount = Math.floor(
    calculateEligibleAmount(maxEmi, interestRate, months),
  );
  const affordableEmi = calculateMonthlyEmi(
    eligibleAmount,
    interestRate,
    months,
  );

  return (
    <div className="flex w-full flex-col gap-10 lg:gap-8">
      <div className="flex flex-col gap-6">
        <LoanTypeField
          options={loanTypeOptions}
          value={loanType}
          onValueChange={setLoanType}
        />

        <div className="border-cream-75 w-full border-t" />

        <AmountField
          label="My monthly gross income is"
          value={monthlyIncome}
          onValueChange={setMonthlyIncome}
        />

        <AmountField
          label="My monthly expense & liabilities are"
          value={monthlyExpenses}
          onValueChange={setMonthlyExpenses}
        />

        <MeasureField
          label="I Plan to repay the Loan Amount in"
          unit="Years"
          value={tenure}
          min={tenureRange.min}
          max={tenureRange.max}
          step={tenureRange.step}
          onValueChange={setTenure}
          withSlider
        />

        <div className="border-cream-75 w-full border-t" />

        <MeasureField
          label="I am looking at an Interest Rate of"
          unit="P.A"
          value={interestRate}
          min={interestRateRange.min}
          max={interestRateRange.max}
          step={interestRateRange.step}
          onValueChange={setInterestRate}
        />
      </div>

      <EligibilityResultSummary
        eligibleAmount={eligibleAmount}
        affordableEmi={affordableEmi}
        maxEmi={maxEmi}
      />
    </div>
  );
}
