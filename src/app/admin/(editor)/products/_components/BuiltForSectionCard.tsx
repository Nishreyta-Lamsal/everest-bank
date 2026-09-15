'use client';

import { useState } from 'react';

import ProductSectionCard from './ProductSectionCard';
import FieldLabel from '@/components/admin/shared/FieldLabel';
import MediaField from '@/components/admin/shared/MediaField';
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

  function uploadImage(index: number, file: File) {
    updateItem(index, {
      ...items[index],
      image: { src: URL.createObjectURL(file), alt: '' },
    });
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
            <MediaField
              label="Right-Side Image"
              media={item.image}
              onUpload={(file) => uploadImage(index, file)}
              onRemove={() => updateItem(index, { ...item, image: undefined })}
            />
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
