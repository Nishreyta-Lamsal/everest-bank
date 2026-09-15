'use client';

import { useState } from 'react';

import ProductSectionCard from './ProductSectionCard';
import FieldLabel from '@/components/admin/shared/FieldLabel';
import ButtonFieldGroup from '@/components/admin/shared/ButtonFieldGroup';
import FieldPairRow from '@/components/admin/shared/FieldPairRow';
import { Button } from '@/components/admin/ui/button';
import { Input } from '@/components/admin/ui/input';
import { icon } from '@/components/admin/icons';

type InfoRequirement = {
  title: string;
  description: string;
};

type ApplyButtonState = {
  label: string;
  linkTarget: string;
};

const EMPTY_BUTTON: ApplyButtonState = { label: '', linkTarget: '' };

export default function RequiredInfoSectionCard() {
  const [headline, setHeadline] = useState('');
  const [applyButton, setApplyButton] =
    useState<ApplyButtonState>(EMPTY_BUTTON);
  const [requirements, setRequirements] = useState<InfoRequirement[]>([]);

  function updateRequirement(index: number, next: InfoRequirement) {
    setRequirements((current) =>
      current.map((item, i) => (i === index ? next : item)),
    );
  }

  function removeRequirement(index: number) {
    setRequirements((current) => current.filter((_, i) => i !== index));
  }

  function addRequirement() {
    setRequirements((current) => [
      ...current,
      { title: '', description: '' },
    ]);
  }

  return (
    <ProductSectionCard title="Required information to apply">
      <div className="border-black-alpha-5 flex w-full flex-col gap-3 border-b pb-3">
        <FieldLabel label="Headline">
          <Input
            variant="default"
            size="medium"
            placeholder="Everything You Need to Apply"
            value={headline}
            onChange={(event) => setHeadline(event.target.value)}
          />
        </FieldLabel>

        <ButtonFieldGroup
          label="Button"
          buttonLabel={applyButton.label}
          onButtonLabelChange={(label) =>
            setApplyButton((button) => ({ ...button, label }))
          }
          linkTarget={applyButton.linkTarget}
          onLinkTargetChange={(linkTarget) =>
            setApplyButton((button) => ({ ...button, linkTarget }))
          }
          onRemove={() => setApplyButton(EMPTY_BUTTON)}
        />
      </div>

      {requirements.map((item, index) => (
        <FieldPairRow
          key={index}
          label={`Information ${index + 1}`}
          primaryValue={item.title}
          onPrimaryChange={(value) =>
            updateRequirement(index, { ...item, title: value })
          }
          primaryPlaceholder="Personal Identification"
          secondaryValue={item.description}
          onSecondaryChange={(value) =>
            updateRequirement(index, { ...item, description: value })
          }
          secondaryPlaceholder="Proof of residential address through utility bills, ward recommendation letters, or other accepted address verification documents."
          onRemove={() => removeRequirement(index)}
          removeLabel={`Remove information ${index + 1}`}
        />
      ))}

      <Button
        type="button"
        variant="secondary"
        size="large"
        className="w-full"
        onClick={addRequirement}
      >
        <icon.plus />
        Add
      </Button>
    </ProductSectionCard>
  );
}
