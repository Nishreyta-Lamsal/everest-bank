'use client';

import { useState } from 'react';

import ProductSectionCard from './ProductSectionCard';
import FieldLabel from '@/components/admin/shared/FieldLabel';
import { Button } from '@/components/admin/ui/button';
import { Input } from '@/components/admin/ui/input';
import { icon } from '@/components/admin/icons';

export default function ApplicationProcessSectionCard() {
  const [steps, setSteps] = useState<string[]>([]);

  function updateStep(index: number, value: string) {
    setSteps((current) =>
      current.map((step, i) => (i === index ? value : step)),
    );
  }

  function removeStep(index: number) {
    setSteps((current) => current.filter((_, i) => i !== index));
  }

  function addStep() {
    setSteps((current) => [...current, '']);
  }

  return (
    <ProductSectionCard title="Application process">
      {steps.map((step, index) => (
        <FieldLabel key={index} label={`Step ${index + 1}`}>
          <div className="flex w-full items-center gap-6">
            <div className="flex flex-1 items-center gap-2">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-[12px] text-neutral-900 opacity-[0.68]">
                {index + 1}
              </span>
              <Input
                variant="filled"
                size="medium"
                placeholder="Discuss your project"
                value={step}
                onChange={(event) => updateStep(index, event.target.value)}
              />
            </div>
            <button
              type="button"
              onClick={() => removeStep(index)}
              aria-label={`Remove step ${index + 1}`}
              className="shrink-0 cursor-pointer text-slate-600"
            >
              <icon.trash className="size-4" />
            </button>
          </div>
        </FieldLabel>
      ))}

      <Button
        type="button"
        variant="secondary"
        size="large"
        className="w-full"
        onClick={addStep}
      >
        <icon.plus />
        Add steps
      </Button>
    </ProductSectionCard>
  );
}
