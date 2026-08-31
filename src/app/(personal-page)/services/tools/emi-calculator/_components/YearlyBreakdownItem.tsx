import { PlusIcon } from '@/components/icons';

type YearlyBreakdownItemProps = {
  year: number;
};

export default function YearlyBreakdownItem({
  year,
}: YearlyBreakdownItemProps) {
  return (
    <div className="border-cream-75 flex w-full items-center gap-2 border-b py-4.5 lg:py-4">
      <PlusIcon className="size-2.5 shrink-0 text-orange-500" />
      <p className="text-body-1-mobile lg:text-body-1-desktop text-grey-500">
        {year} AD
      </p>
    </div>
  );
}
