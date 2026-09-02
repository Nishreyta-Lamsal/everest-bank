import PillTabs from '@/components/ui/navigation/PillTabs';

import { calculatorTabs } from '../_data/calculator-tabs';

type CalculatorTabsProps = {
  activeHref: string;
};

export default function CalculatorTabs({ activeHref }: CalculatorTabsProps) {
  return (
    <PillTabs
      items={calculatorTabs}
      activeHref={activeHref}
      label="Calculator tools"
      variant="primary"
    />
  );
}
