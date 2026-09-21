'use client';

import CalculatorSettingsShell from '../../_components/CalculatorSettingsShell';
import EligibilityLoanTypesCard from './EligibilityLoanTypesCard';

import {
  eligibilityRangeFields,
  validateEligibilityExtraFields,
} from '../_data/eligibility-settings';

export default function EligibilityCheckerSettings() {
  return (
    <CalculatorSettingsShell
      slug="eligibility"
      rangeFields={eligibilityRangeFields}
      validateExtraFields={validateEligibilityExtraFields}
      renderExtraFields={(config, setConfig) => (
        <EligibilityLoanTypesCard config={config} onChange={setConfig} />
      )}
    />
  );
}
