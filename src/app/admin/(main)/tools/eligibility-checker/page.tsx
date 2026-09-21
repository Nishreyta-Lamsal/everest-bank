import LayoutWrapper from '@/components/admin/layouts/wrapper/LayoutWrapper';
import CalculatorSettingsHeader from '../_components/CalculatorSettingsHeader';
import EligibilityCheckerSettings from './_components/EligibilityCheckerSettings';

export default function AdminEligibilityCheckerPage() {
  return (
    <LayoutWrapper>
      <div className="flex w-full flex-col gap-6">
        <CalculatorSettingsHeader
          title="Eligibility Checker"
          description="The limits, loan types and starting values for the eligibility checker on the website."
        />
        <EligibilityCheckerSettings />
      </div>
    </LayoutWrapper>
  );
}
