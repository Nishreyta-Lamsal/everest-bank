type CalculatorSettingsHeaderProps = {
  title: string;
  description: string;
};

export default function CalculatorSettingsHeader({
  title,
  description,
}: CalculatorSettingsHeaderProps) {
  return (
    <section className="flex w-full items-center justify-between">
      <div className="flex flex-col gap-1">
        <p className="text-heading-3 text-neutral-900">{title}</p>
        <p className="text-paragraph-sm text-neutral-700">{description}</p>
      </div>
    </section>
  );
}
