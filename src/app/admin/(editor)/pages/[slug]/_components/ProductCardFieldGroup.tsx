'use client';

// import { icon } from '@/components/admin/icons';
import { Input } from '@/components/admin/ui/input';
import LinkTargetSelect from './LinkTargetSelect';
import ImageDropzone from './ImageDropzone';
import SlideImageThumbnail from './SlideImageThumbnail';

import type { ProductCard } from '@/types/admin';

type ProductCardFieldGroupProps = {
  label: string;
  card: ProductCard;
  onChange: (card: ProductCard) => void;
  onRemove: () => void;
  onDecorationUpload?: (file: File) => void;
  isUploadingDecoration?: boolean;
};

export default function ProductCardFieldGroup({
  label,
  card,
  onChange,
  // onRemove,
  onDecorationUpload,
  isUploadingDecoration,
}: ProductCardFieldGroupProps) {
  return (
    <div className="flex w-full flex-col gap-2 rounded-[6px] border border-[#e6ecf4] p-3">
      <div className="flex w-full items-center justify-between">
        <p className="min-w-0 truncate text-[13px] font-semibold text-neutral-900">
          {label}
          {card.title ? ` · ${card.title}` : ''}
        </p>
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
            Title
          </p>
          <Input
            variant="filled"
            size="medium"
            placeholder="Open Account"
            value={card.title ?? ''}
            onChange={(event) =>
              onChange({ ...card, title: event.target.value })
            }
          />
        </div>

        <div className="flex w-full flex-col gap-1">
          <p className="text-[12px] font-medium text-slate-950 opacity-[0.68]">
            Subtitle
          </p>
          <Input
            variant="filled"
            size="medium"
            placeholder="Only in 3 minutes"
            value={card.subtitle ?? ''}
            onChange={(event) =>
              onChange({ ...card, subtitle: event.target.value })
            }
          />
        </div>

        <div className="flex w-full flex-col gap-1">
          <p className="text-[12px] font-medium text-slate-950 opacity-[0.68]">
            Links to
          </p>
          <LinkTargetSelect
            value={card.href ?? ''}
            onChange={(href) => onChange({ ...card, href })}
          />
        </div>

        <label className="flex items-center gap-2 text-[12px] text-slate-950">
          <input
            type="checkbox"
            checked={Boolean(card.featured)}
            onChange={(event) =>
              onChange({ ...card, featured: event.target.checked })
            }
          />
          Featured card
        </label>

        {card.featured && (
          <div className="flex w-full flex-col gap-2">
            <p className="text-[12px] font-medium text-slate-950 opacity-[0.68]">
              Decoration image
            </p>
            {card.decoration_src?.src && (
              <SlideImageThumbnail
                src={card.decoration_src.src}
                alt={card.decoration_src.alt}
              />
            )}
            {onDecorationUpload && (
              <ImageDropzone
                onFileSelected={onDecorationUpload}
                isUploading={isUploadingDecoration}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
