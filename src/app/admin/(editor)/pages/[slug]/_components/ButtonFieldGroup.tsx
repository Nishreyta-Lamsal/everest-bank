// eslint-disable-next-line @typescript-eslint/no-unused-vars -- kept for commented-out delete controls
import { icon } from '@/components/admin/icons';
import { Input } from '@/components/admin/ui/input';
import LinkTargetSelect from './LinkTargetSelect';

type ButtonFieldGroupProps = {
  label: string;
  buttonLabel: string;
  onButtonLabelChange: (value: string) => void;
  linkTarget: string;
  onLinkTargetChange: (value: string) => void;
  onRemove: () => void;
};

export default function ButtonFieldGroup({
  label,
  buttonLabel,
  onButtonLabelChange,
  linkTarget,
  onLinkTargetChange,
  // onRemove,
}: ButtonFieldGroupProps) {
  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex w-full items-center justify-between">
        <p className="text-[13px] font-semibold text-neutral-900">{label}</p>
        {/* <button
          type="button"
          onClick={onRemove}
          aria-label={`Remove ${label.toLowerCase()}`}
          className="text-slate-600"
        >
          <icon.trash className="size-4" />
        </button> */}
      </div>
      <div className="flex w-full flex-col gap-3">
        <div className="flex w-full flex-col gap-1">
          <p className="text-[12px] font-medium text-slate-950 opacity-[0.68]">
            Button label
          </p>
          <Input
            variant="filled"
            size="medium"
            className="font-medium"
            value={buttonLabel}
            onChange={(event) => onButtonLabelChange(event.target.value)}
          />
        </div>
        <div className="flex w-full flex-col gap-1">
          <p className="text-[12px] font-medium text-slate-950 opacity-[0.68]">
            Links to
          </p>
          <LinkTargetSelect value={linkTarget} onChange={onLinkTargetChange} />
        </div>
      </div>
    </div>
  );
}
