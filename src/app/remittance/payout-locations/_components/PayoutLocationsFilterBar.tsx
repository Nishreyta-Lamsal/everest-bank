'use client';

import { useState } from 'react';

import SelectField from '@/components/ui/inputs/SelectField';
import TextField from '@/components/ui/inputs/TextField';
import FilterButton from '@/components/ui/buttons/FilterButton';
import { MapPaperIcon, SearchIcon, TextBlockIcon } from '@/components/icons';

type PayoutLocationsView = 'map' | 'list';

const VIEW_OPTIONS = [
  { value: 'map', label: 'Map', icon: MapPaperIcon },
  { value: 'list', label: 'List', icon: TextBlockIcon },
] as const;

export default function PayoutLocationsFilterBar() {
  const [view, setView] = useState<PayoutLocationsView>('map');

  return (
    <div className="flex w-full flex-col gap-8 lg:flex-row lg:items-end lg:gap-[50px]">
      <div className="flex w-full flex-col gap-8 lg:flex-row lg:items-center">
        <SelectField
          label="Province"
          placeholder="All provinces"
          options={[]}
          variant="secondary"
          className="lg:flex-1"
        />
        <SelectField
          label="District"
          placeholder="Select a province"
          options={[]}
          variant="secondary"
          className="lg:flex-1"
        />
        <TextField
          label="Search"
          type="text"
          variant="secondary"
          placeholder="Name, address"
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
            onClick={() => setView(value)}
            leftIcon={<Icon className="size-4" />}
            className="flex-1 lg:flex-none"
          >
            {label}
          </FilterButton>
        ))}
      </div>
    </div>
  );
}
