'use client';

import CalculatorSettingsShell from '../../_components/CalculatorSettingsShell';

import { emiRangeFields } from '../_data/emi-settings';

export default function EMICalculatorSettings() {
  return <CalculatorSettingsShell slug="emi" rangeFields={emiRangeFields} />;
}
