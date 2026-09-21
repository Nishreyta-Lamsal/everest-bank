export default function CalculatorUnavailable() {
  return (
    <div className="border-cream-75 flex w-full flex-col gap-2 rounded-[8px] border p-8">
      <p className="font-heading text-title-0-mobile-md lg:text-title-0-desktop-md text-grey-500">
        This calculator is currently unavailable
      </p>
      <p className="text-body-2-mobile lg:text-body-2-desktop text-grey-300">
        Please check back later, or contact us for help with your estimate.
      </p>
    </div>
  );
}


