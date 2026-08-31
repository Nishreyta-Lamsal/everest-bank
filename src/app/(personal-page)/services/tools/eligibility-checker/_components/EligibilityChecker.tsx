'use client';

import { useState } from 'react';

import LoanTypeField from './LoanTypeField';
import AmountField from './AmountField';
import MeasureField from './MeasureField';
import EligibilityResultSummary from './EligibilityResultSummary';

import {
  eligibilityCheckerDefaults,
  interestRateRange,
  maxEmiShareOfDisposableIncome,
  tenureRange,
} from '../_data/eligibility-checker';

function calculateEligibleAmount(
  monthlyEmi: number,
  annualRate: number,
  months: number,
) {
  if (monthlyEmi <= 0 || months <= 0) {
    return 0;
  }

  const monthlyRate = annualRate / 12 / 100;

  if (monthlyRate === 0) {
    return monthlyEmi * months;
  }

  return (monthlyEmi * (1 - (1 + monthlyRate) ** -months)) / monthlyRate;
}

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

export default function EligibilityChecker() {
  const [loanType, setLoanType] = useState(eligibilityCheckerDefaults.loanType);
  const [monthlyIncome, setMonthlyIncome] = useState(
    eligibilityCheckerDefaults.monthlyIncome,
  );
  const [monthlyExpenses, setMonthlyExpenses] = useState(
    eligibilityCheckerDefaults.monthlyExpenses,
  );
  const [tenure, setTenure] = useState(eligibilityCheckerDefaults.tenure);
  const [interestRate, setInterestRate] = useState(
    eligibilityCheckerDefaults.interestRate,
  );

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
        <LoanTypeField value={loanType} onValueChange={setLoanType} />

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
