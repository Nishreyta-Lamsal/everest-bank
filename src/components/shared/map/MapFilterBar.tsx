import LayoutWrapper from '@/components/layouts/wrapper/LayoutWrapper';
import SelectField from '@/components/ui/inputs/SelectField';
import TextField from '@/components/ui/inputs/TextField';
import FilterButton from '@/components/ui/buttons/FilterButton';
import { icon } from '@/components/icons';

import type { SelectFieldOption } from '@/components/ui/inputs/SelectField';
import type { MapView } from '@/types';

type MapFilterBarProps = {
  view: MapView;
  onViewChange: (view: MapView) => void;
  provinceOptions?: SelectFieldOption[];
  districtOptions?: SelectFieldOption[];
  searchPlaceholder?: string;
};

const VIEW_OPTIONS = [
  { value: 'map', label: 'Map', icon: icon.mapPaper },
  { value: 'grid', label: 'Grid', icon: icon.grid },
] as const;

export default function MapFilterBar({
  view,
  onViewChange,
  provinceOptions = [],
  districtOptions = [],
  searchPlaceholder = 'Name, address',
}: MapFilterBarProps) {
  return (
    <section className="w-full pt-8 pb-6 lg:pt-12">
      <LayoutWrapper>
        <div className="flex w-full flex-col gap-8 lg:flex-row lg:items-end lg:gap-[50px]">
          <div className="flex w-full flex-col gap-8 lg:flex-row lg:items-center">
            <SelectField
              label="Province"
              placeholder="All provinces"
              options={provinceOptions}
              variant="secondary"
              className="lg:flex-1"
            />
            <SelectField
              label="District"
              placeholder="Select a province"
              options={districtOptions}
              variant="secondary"
              className="lg:flex-1"
            />
            <TextField
              label="Search"
              type="text"
              variant="secondary"
              placeholder={searchPlaceholder}
              trailingIcon={
                <icon.search className="text-grey-400 size-4 shrink-0" />
              }
              className="lg:flex-1"
            />
          </div>

          <div
            role="group"
            aria-label="Result view"
            className="order-first flex w-full shrink-0 items-center gap-2 lg:order-none lg:h-[41px] lg:w-auto"
          >
            {VIEW_OPTIONS.map(({ value, label, icon: Icon }) => (
              <FilterButton
                key={value}
                active={view === value}
                aria-pressed={view === value}
                onClick={() => onViewChange(value)}
                leftIcon={<Icon className="size-4" />}
                className="flex-1 lg:flex-none"
              >
                {label}
              </FilterButton>
            ))}
          </div>
        </div>
      </LayoutWrapper>
    </section>
  );
}
