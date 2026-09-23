'use client';

import { useState } from 'react';

import ProductSectionCard from './ProductSectionCard';
import FieldLabel from '@/components/admin/shared/FieldLabel';
import ImageDropzone from '@/components/admin/shared/ImageDropzone';
import ImagePreview from '@/components/admin/shared/ImagePreview';
import { toSectionMedia } from '@/components/admin/shared/MediaField';
import { Button } from '@/components/admin/ui/button';
import { Input } from '@/components/admin/ui/input';
import { icon } from '@/components/admin/icons';

import type { SectionMedia } from '@/types/admin';

type BuiltForItem = {
  title: string;
  image?: SectionMedia;
};

export default function BuiltForSectionCard() {
  const [items, setItems] = useState<BuiltForItem[]>([]);

  function updateItem(index: number, next: BuiltForItem) {
    setItems((current) =>
      current.map((item, i) => (i === index ? next : item)),
    );
  }

  function removeItem(index: number) {
    setItems((current) => current.filter((_, i) => i !== index));
  }

  function addItem() {
    setItems((current) => [...current, { title: '' }]);
  }

  function selectImage(index: number, image: SectionMedia) {
    updateItem(index, { ...items[index], image });
  }

  return (
    <ProductSectionCard title="Built for">
      {items.map((item, index) => (
        <div key={index} className="flex w-full items-center gap-6">
          <div className="flex flex-1 flex-col gap-3">
            <FieldLabel label="Title">
              <Input
                variant="filled"
                size="medium"
                placeholder="Crop Farming"
                value={item.title}
                onChange={(event) =>
                  updateItem(index, { ...item, title: event.target.value })
                }
              />
            </FieldLabel>
            <FieldLabel label="Right-Side Image">
              {item.image?.src ? (
                <ImagePreview
                  src={item.image.src}
                  alt={item.image.alt}
                  onReplace={(picked) =>
                    selectImage(index, toSectionMedia(picked))
                  }
                  onRemove={() =>
                    updateItem(index, { ...item, image: undefined })
                  }
                />
              ) : (
                <ImageDropzone
                  onMediaSelected={(picked) =>
                    selectImage(index, toSectionMedia(picked))
                  }
                />
              )}
            </FieldLabel>
          </div>
          <button
            type="button"
            onClick={() => removeItem(index)}
            aria-label={`Remove ${item.title || 'item'}`}
            className="shrink-0 cursor-pointer text-slate-600"
          >
            <icon.trash className="size-4" />
          </button>
        </div>
      ))}

      <Button
        type="button"
        variant="secondary"
        size="large"
        className="w-full"
        onClick={addItem}
      >
        <icon.plus />
        Add
      </Button>
    </ProductSectionCard>
  );
}
