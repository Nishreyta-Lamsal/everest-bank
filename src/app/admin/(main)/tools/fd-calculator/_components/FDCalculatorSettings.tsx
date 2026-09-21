'use client';

import CalculatorSettingsShell from '../../_components/CalculatorSettingsShell';

import { fdRangeFields } from '../_data/fd-settings';

export default function FDCalculatorSettings() {
  return <CalculatorSettingsShell slug="fd" rangeFields={fdRangeFields} />;
}
