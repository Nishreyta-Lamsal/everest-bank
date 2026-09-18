'use client';

import DatePickerField from '@/components/ui/inputs/DatePickerField';
import SelectField from '@/components/ui/inputs/SelectField';

import type { SelectFieldOption } from '@/components/ui/inputs/SelectField';

type ForexFilterBarProps = {
  date: string;
  onDateChange: (date: string) => void;
  time: string;
  onTimeChange: (time: string) => void;
  timeOptions: SelectFieldOption[];
};

export default function ForexFilterBar({
  date,
  onDateChange,
  time,
  onTimeChange,
  timeOptions,
}: ForexFilterBarProps) {
  return (
    <div className="flex w-full flex-col gap-8 lg:flex-row lg:items-end lg:gap-8">
      <DatePickerField
        label="Select Date"
        variant="secondary"
        value={date}
        onChange={(event) => onDateChange(event.target.value)}
        className="lg:w-[320px]"
      />

      <SelectField
        label="Time"
        variant="secondary"
        options={
          timeOptions.length
            ? timeOptions
            : [
                {
                  label: date ? 'No times published' : 'Select a date first',
                  value: '',
                },
              ]
        }
        value={time}
        onChange={(event) => onTimeChange(event.target.value)}
        disabled={timeOptions.length === 0}
        className="lg:w-[320px]"
      />
    </div>
  );
}
