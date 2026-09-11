import { Input } from '@/components/admin/ui/input';

type LinkTargetSelectProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function LinkTargetSelect({
  value,
  onChange,
}: LinkTargetSelectProps) {
  return (
    <Input
      variant="filled"
      size="medium"
      className="font-medium"
      placeholder="/savings or https://example.com"
      value={value}
      onChange={(event) => onChange(event.target.value)}
    />
  );
}
