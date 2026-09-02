'use client';

import { useState } from 'react';

import LayoutWrapper from '@/components/layouts/wrapper/LayoutWrapper';
import SelectField from '@/components/ui/inputs/SelectField';
import TextField from '@/components/ui/inputs/TextField';
import FilterButton from '@/components/ui/buttons/FilterButton';
import { MapPaperIcon, SearchIcon, TextBlockIcon } from '@/components/icons';

import type { SelectFieldOption } from '@/components/ui/inputs/SelectField';

type MapView = 'map' | 'list';

type MapFilterBarProps = {
  provinceOptions?: SelectFieldOption[];
  districtOptions?: SelectFieldOption[];
  searchPlaceholder?: string;
  onViewChange?: (view: MapView) => void;
};

const VIEW_OPTIONS = [
  { value: 'map', label: 'Map', icon: MapPaperIcon },
  { value: 'list', label: 'List', icon: TextBlockIcon },
] as const;

export default function MapFilterBar({
  provinceOptions = [],
  districtOptions = [],
  searchPlaceholder = 'Name, address',
  onViewChange,
}: MapFilterBarProps) {
  const [view, setView] = useState<MapView>('map');

  const selectView = (nextView: MapView) => {
    setView(nextView);
    onViewChange?.(nextView);
  };

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
                <SearchIcon className="text-grey-400 size-4 shrink-0" />
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
                onClick={() => selectView(value)}
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
