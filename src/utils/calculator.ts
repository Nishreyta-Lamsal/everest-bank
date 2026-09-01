export function calculateMonthlyEmi(
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

export function calculateEligibleAmount(
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

export function calculateMaturityValue(
  principal: number,
  annualRate: number,
  years: number,
  periodsPerYear: number,
) {
  if (principal <= 0 || years <= 0) {
    return principal;
  }

  const ratePerPeriod = annualRate / 100 / periodsPerYear;

  return principal * (1 + ratePerPeriod) ** (periodsPerYear * years);
}
