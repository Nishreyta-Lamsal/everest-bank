'use client';

import TextField from '@/components/ui/inputs/TextField';
import DatePickerField from '@/components/ui/inputs/DatePickerField';
import { icon } from '@/components/icons';

type NewsFilterBarProps = {
  search: string;
  onSearchChange: (search: string) => void;
  date: string;
  onDateChange: (date: string) => void;
};

export default function NewsFilterBar({
  search,
  onSearchChange,
  date,
  onDateChange,
}: NewsFilterBarProps) {
  return (
    <div className="flex w-full flex-col gap-8 lg:flex-row lg:items-end lg:gap-8">
      <TextField
        label="Search"
        type="search"
        variant="secondary"
        placeholder="Search"
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
        trailingIcon={
          <icon.search
            aria-hidden="true"
            className="text-grey-400 size-4 shrink-0"
          />
        }
        className="lg:w-[320px]"
      />

      <DatePickerField
        label="Date"
        variant="secondary"
        value={date}
        onChange={(event) => onDateChange(event.target.value)}
        className="lg:w-[320px]"
      />
    </div>
  );
}
