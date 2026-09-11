// eslint-disable-next-line @typescript-eslint/no-unused-vars -- kept for commented-out delete controls
import { icon } from '@/components/admin/icons';
import { Switch } from '@/components/admin/ui/switch';

type SlideEditorHeaderProps = {
  title: string;
  description: string;
  shownOnPage: boolean;
  onShownOnPageChange: (shown: boolean) => void;
  onDelete?: () => void;
};

export default function SlideEditorHeader({
  title,
  description,
  shownOnPage,
  onShownOnPageChange,
  // onDelete,
}: SlideEditorHeaderProps) {
  return (
    <div className="flex w-full items-start justify-between">
      <div className="flex flex-col gap-1">
        <p className="text-[18px] leading-[1.4] font-semibold text-neutral-900">
          {title}
        </p>
        <p className="text-[12px] leading-[1.2] text-neutral-700 opacity-[0.72]">
          {description}
        </p>
      </div>
      <div className="flex items-center gap-4">
        {/* <button
          type="button"
          onClick={onDelete}
          aria-label="Delete slide"
          className="flex items-center justify-center rounded-full bg-[#f6f6f6] p-2 text-slate-600"
        >
          <icon.trash className="size-[18px]" />
        </button> */}
        <label className="flex items-center gap-1">
          <Switch checked={shownOnPage} onCheckedChange={onShownOnPageChange} />
          <span className="text-[12px] font-medium tracking-[-0.24px] text-[#45546c]">
            Shown on page
          </span>
        </label>
      </div>
    </div>
  );
}
