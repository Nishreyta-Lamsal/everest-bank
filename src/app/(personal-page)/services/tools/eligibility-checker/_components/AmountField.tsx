import { useId } from 'react';

type AmountFieldProps = {
  label: string;
  value: number;
  onValueChange: (value: number) => void;
};

export default function AmountField({
  label,
  value,
  onValueChange,
}: AmountFieldProps) {
  const inputId = useId();

  const handleChange = (rawValue: string) => {
    const numericValue = Number(rawValue.replace(/[^\d.]/g, ''));

    if (!Number.isNaN(numericValue)) {
      onValueChange(numericValue);
    }
  };

  return (
    <div className="flex w-full flex-col justify-center gap-2">
      <label
        htmlFor={inputId}
        className="text-body-2-mobile lg:text-body-1-desktop text-grey-400"
      >
        {label}
      </label>
      <div className="flex h-[52px] w-full items-center">
        <div className="border-grey-100 text-body-2-mobile-md lg:text-body-2-desktop-md text-grey-300 flex h-full w-[76px] shrink-0 items-center justify-center rounded-l-[8px] border px-4">
          Rs
        </div>
        <input
          id={inputId}
          inputMode="decimal"
          value={value.toLocaleString('en-IN')}
          onChange={(event) => handleChange(event.target.value)}
          className="border-grey-100 text-body-2-mobile-md lg:text-body-2-desktop-md text-grey-300 -ml-px h-full min-w-0 flex-1 rounded-r-[8px] border bg-transparent px-4 outline-none"
        />
      </div>
    </div>
  );
}
