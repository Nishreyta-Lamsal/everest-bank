import LayoutWrapper from '@/components/layouts/wrapper/LayoutWrapper';
import EMICalculator from './EMICalculator';
import YearlyBreakdown from './YearlyBreakdown';
import EMICalculatorCTA from './EMICalculatorCTA';
import EMIDescriptions from './EMIDescriptions';
import EMICalculatorSidebar from './EMICalculatorSidebar';

export default function EMICalculatorSection() {
  return (
    <section className="w-full py-8 lg:py-12">
      <LayoutWrapper>
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex w-full flex-col gap-8 lg:max-w-[751px] lg:gap-12">
            <h2 className="font-heading text-heading-h4-mobile-md lg:text-heading-h4-desktop-md text-grey-500 lg:w-[470px]">
              Estimate your monthly instalment for a loan from Everest Bank.
            </h2>

            <div className="flex flex-col gap-10 lg:gap-13">
              <EMICalculator />
              <YearlyBreakdown />
              <EMICalculatorCTA />
              <EMIDescriptions />
            </div>
          </div>

          <EMICalculatorSidebar />
        </div>
      </LayoutWrapper>
    </section>
  );
}
