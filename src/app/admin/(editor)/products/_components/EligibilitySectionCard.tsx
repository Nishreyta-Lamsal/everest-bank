'use client';

import { useState } from 'react';

import ProductSectionCard from './ProductSectionCard';
import FieldLabel from '@/components/admin/shared/FieldLabel';
import Pill from '@/components/admin/shared/Pill';
import { Button } from '@/components/admin/ui/button';
import { Input } from '@/components/admin/ui/input';

const DEFAULT_CHECKLIST = [
  'Individual Farmers',
  'Livestock & Dairy Farmers',
  'Agricultural Cooperatives',
  'Agribusiness Entrepreneurs',
];

export default function EligibilitySectionCard() {
  const [headline, setHeadline] = useState('');
  const [checklist, setChecklist] = useState<string[]>(DEFAULT_CHECKLIST);
  const [newItem, setNewItem] = useState('');

  function addItem() {
    const value = newItem.trim();

    if (!value) return;

    setChecklist((current) => [...current, value]);
    setNewItem('');
  }

  function removeItem(index: number) {
    setChecklist((current) => current.filter((_, i) => i !== index));
  }

  return (
    <ProductSectionCard title="Eligibility Check">
      <FieldLabel label="Headline">
        <Input
          variant="default"
          size="medium"
          placeholder="Check Your Eligibility & Financing Potential"
          value={headline}
          onChange={(event) => setHeadline(event.target.value)}
        />
      </FieldLabel>

      <FieldLabel label="Checklist">
        <div className="flex w-full flex-col gap-3">
          {checklist.length > 0 && (
            <div className="flex w-full flex-wrap items-start gap-2">
              {checklist.map((item, index) => (
                <Pill
                  key={`${item}-${index}`}
                  onRemove={() => removeItem(index)}
                  removeLabel={`Remove ${item}`}
                >
                  {item}
                </Pill>
              ))}
            </div>
          )}

          <div className="flex w-full items-center gap-4">
            <Input
              variant="default"
              size="medium"
              placeholder="Commercial Farming Operations"
              value={newItem}
              onChange={(event) => setNewItem(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  event.preventDefault();
                  addItem();
                }
              }}
            />
            <Button
              type="button"
              variant="secondary"
              size="large"
              className="shrink-0"
              onClick={addItem}
            >
              Add
            </Button>
          </div>
        </div>
      </FieldLabel>
    </ProductSectionCard>
  );
}
