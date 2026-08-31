import LayoutWrapper from '@/components/layouts/wrapper/LayoutWrapper';
import FDCalculator from './FDCalculator';
import FDCalculatorCTA from './FDCalculatorCTA';
import FDCalculatorSidebar from './FDCalculatorSidebar';

export default function FDCalculatorSection() {
  return (
    <section className="w-full py-8 lg:py-12">
      <LayoutWrapper>
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex w-full flex-col gap-8 lg:max-w-[751px] lg:gap-11">
            <h2 className="font-heading text-heading-h4-mobile-md lg:text-heading-h4-desktop-md text-grey-500 lg:w-[470px]">
              See how much your Everest Bank fixed deposit is worth at maturity.
            </h2>

            <div className="flex flex-col gap-10 lg:gap-13">
              <FDCalculator />
              <FDCalculatorCTA />
            </div>
          </div>

          <FDCalculatorSidebar />
        </div>
      </LayoutWrapper>
    </section>
  );
}
