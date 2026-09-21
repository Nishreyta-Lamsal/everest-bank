import LayoutWrapper from '@/components/admin/layouts/wrapper/LayoutWrapper';
import CalculatorSettingsHeader from '../_components/CalculatorSettingsHeader';
import FDCalculatorSettings from './_components/FDCalculatorSettings';

export default function AdminFDCalculatorPage() {
  return (
    <LayoutWrapper>
      <div className="flex w-full flex-col gap-6">
        <CalculatorSettingsHeader
          title="FD Calculator"
          description="The limits and starting values for the fixed deposit calculator on the website."
        />
        <FDCalculatorSettings />
      </div>
    </LayoutWrapper>
  );
}
