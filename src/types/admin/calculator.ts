export type CalculatorSlug = 'emi' | 'fd' | 'eligibility';

/** A numeric input's allowed bounds and the value it starts on. */
export type CalculatorRange = {
  min: number;
  max: number;
  default: number;
};

export type EmiCalculatorConfig = {
  loan_amount: CalculatorRange;
  interest_rate: CalculatorRange;
  tenure_years: CalculatorRange;
};

export type FdCalculatorConfig = {
  deposit_amount: CalculatorRange;
  interest_rate: CalculatorRange;
  tenure_years: CalculatorRange;
};

export type EligibilityLoanType = {
  slug: string;
  label: string;
};

export type EligibilityCalculatorConfig = {
  gross_monthly_income: CalculatorRange;
  interest_rate: CalculatorRange;
  loan_types: EligibilityLoanType[];
  default_loan_type: string;
};

export type CalculatorConfigMap = {
  emi: EmiCalculatorConfig;
  fd: FdCalculatorConfig;
  eligibility: EligibilityCalculatorConfig;
};

export type AnyCalculatorConfig =
  CalculatorConfigMap[keyof CalculatorConfigMap];

export type CalculatorConfig<S extends CalculatorSlug = CalculatorSlug> = {
  slug: S;
  label: string;
  is_enabled: boolean;
  config: CalculatorConfigMap[S];
  created_at: string;
  updated_at: string;
};

/** The public endpoint drops the admin-only bookkeeping fields. */
export type CalculatorPublic<S extends CalculatorSlug = CalculatorSlug> = {
  slug: S;
  label: string;
  config: CalculatorConfigMap[S];
  updated_at: string;
};

export type CalculatorListData = {
  calculators: CalculatorConfig[];
};

export type CalculatorPublicListData = {
  calculators: CalculatorPublic[];
};

export type CalculatorConfigWrite<S extends CalculatorSlug = CalculatorSlug> = {
  is_enabled?: boolean;
  config?: CalculatorConfigMap[S];
};
