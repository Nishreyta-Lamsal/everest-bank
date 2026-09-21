import LayoutWrapper from '@/components/admin/layouts/wrapper/LayoutWrapper';
import CalculatorSettingsHeader from '../_components/CalculatorSettingsHeader';
import EMICalculatorSettings from './_components/EMICalculatorSettings';

export default function AdminEMICalculatorPage() {
  return (
    <LayoutWrapper>
      <div className="flex w-full flex-col gap-6">
        <CalculatorSettingsHeader
          title="EMI Calculator"
          description="The limits and starting values for the EMI calculator on the website."
        />
        <EMICalculatorSettings />
      </div>
    </LayoutWrapper>
  );
}
