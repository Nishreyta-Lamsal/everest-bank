'use client';

import FieldLabel from '@/components/admin/shared/FieldLabel';
import MediaField from '@/components/admin/shared/MediaField';
import { icon } from '@/components/admin/icons';
import { Button } from '@/components/admin/ui/button';
import { Input } from '@/components/admin/ui/input';

import { useUploadMedia } from '@/hooks/api/admin/use-media';

import type { FormBanner, FormSidebarCard } from '@/types/admin';

type FormBannerCardProps = {
  banner: FormBanner | null;
  sidebarCards: FormSidebarCard[];
  isSaving: boolean;
  onBannerChange: (mediaId: number | null) => void;
  onSidebarCardsChange: (cards: FormSidebarCard[]) => void;
};

export default function FormBannerCard({
  banner,
  sidebarCards,
  isSaving,
  onBannerChange,
  onSidebarCardsChange,
}: FormBannerCardProps) {
  const uploadMedia = useUploadMedia();

  async function upload(file: File, onDone: (mediaId: number) => void) {
    const media = await uploadMedia.mutateAsync({ file, alt_text: file.name });

    onDone(media.id);
  }

  function updateCard(index: number, patch: Partial<FormSidebarCard>) {
    onSidebarCardsChange(
      sidebarCards.map((card, i) =>
        i === index ? { ...card, ...patch } : card,
      ),
    );
  }

  return (
    <div className="flex w-full flex-col gap-5">
      <p className="text-paragraph-lg-bold text-neutral-900">Page images</p>

      <MediaField
        label="Top image (optional)"
        media={
          banner?.file_url
            ? { src: banner.file_url, alt: banner.alt_text }
            : undefined
        }
        isUploading={uploadMedia.isPending}
        onUpload={(file) => upload(file, onBannerChange)}
        onRemove={() => onBannerChange(null)}
      />

      <div className="flex w-full flex-col gap-3 border-t border-black/5 pt-4">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <p className="text-[13px] text-neutral-900">Side images</p>
            <p className="text-[12px] text-neutral-700/68">
              Promo cards shown beside the form. Optional.
            </p>
          </div>
          <Button
            type="button"
            variant="outline"
            size="small"
            onClick={() =>
              onSidebarCardsChange([...sidebarCards, { title: '', href: '' }])
            }
          >
            <icon.plus />
            Add card
          </Button>
        </div>

        {sidebarCards.map((card, index) => (
          <div
            key={index}
            className="flex w-full flex-col gap-3 rounded-lg bg-slate-50 p-3"
          >
            <div className="flex items-start justify-between gap-2">
              <FieldLabel label="Title">
                <Input
                  variant="default"
                  size="small"
                  placeholder="Online Account Opening"
                  value={card.title}
                  onChange={(event) =>
                    updateCard(index, { title: event.target.value })
                  }
                />
              </FieldLabel>
              <button
                type="button"
                aria-label={`Remove ${card.title || 'card'}`}
                onClick={() =>
                  onSidebarCardsChange(
                    sidebarCards.filter((_, i) => i !== index),
                  )
                }
                className="mt-5 flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-lg text-red-500 hover:bg-red-50"
              >
                <icon.trash className="size-4" />
              </button>
            </div>

            <FieldLabel label="Links to (optional)">
              <Input
                variant="default"
                size="small"
                placeholder="/personal/accounts/savings"
                value={card.href ?? ''}
                onChange={(event) =>
                  updateCard(index, { href: event.target.value })
                }
              />
            </FieldLabel>

            <MediaField
              label="Image"
              media={
                card.image_url
                  ? { src: card.image_url, alt: card.title }
                  : undefined
              }
              isUploading={uploadMedia.isPending}
              onUpload={(file) =>
                upload(file, (mediaId) =>
                  // image_url is filled in by the server on the next read;
                  // clearing it here avoids showing the previous image.
                  updateCard(index, { image_id: mediaId, image_url: null }),
                )
              }
              onRemove={() =>
                updateCard(index, { image_id: null, image_url: null })
              }
            />
          </div>
        ))}

        {sidebarCards.length === 0 && (
          <p className="py-2 text-[12px] text-neutral-700/68">
            No side images. The form will use the full width.
          </p>
        )}
      </div>

      {isSaving && <p className="text-[12px] text-neutral-700/68">Saving…</p>}
    </div>
  );
}
