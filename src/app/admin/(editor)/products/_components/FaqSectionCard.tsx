'use client';

import { useState } from 'react';

import ProductSectionCard from './ProductSectionCard';
import FieldPairRow from '@/components/admin/shared/FieldPairRow';
import { Button } from '@/components/admin/ui/button';
import { icon } from '@/components/admin/icons';

type FaqItem = {
  question: string;
  answer: string;
};

export default function FaqSectionCard() {
  const [items, setItems] = useState<FaqItem[]>([]);

  function updateItem(index: number, next: FaqItem) {
    setItems((current) =>
      current.map((item, i) => (i === index ? next : item)),
    );
  }

  function removeItem(index: number) {
    setItems((current) => current.filter((_, i) => i !== index));
  }

  return (
    <ProductSectionCard title="FAQs">
      {items.map((item, index) => (
        <FieldPairRow
          key={index}
          label={`Question ${index + 1}`}
          primaryValue={item.question}
          onPrimaryChange={(value) =>
            updateItem(index, { ...item, question: value })
          }
          secondaryValue={item.answer}
          onSecondaryChange={(value) =>
            updateItem(index, { ...item, answer: value })
          }
          onRemove={() => removeItem(index)}
          removeLabel={`Remove question ${index + 1}`}
        />
      ))}

      <Button
        type="button"
        variant="secondary"
        size="large"
        className="w-full"
        onClick={() =>
          setItems((current) => [...current, { question: '', answer: '' }])
        }
      >
        <icon.plus />
        Add
      </Button>
    </ProductSectionCard>
  );
}
