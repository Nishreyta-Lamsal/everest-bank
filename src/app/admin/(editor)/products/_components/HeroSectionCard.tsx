'use client';

import { useState } from 'react';

import ProductSectionCard from './ProductSectionCard';
import FieldLabel from '@/components/admin/shared/FieldLabel';
import ButtonFieldGroup from '@/components/admin/shared/ButtonFieldGroup';
import { Button } from '@/components/admin/ui/button';
import { Input } from '@/components/admin/ui/input';
import { Textarea } from '@/components/admin/ui/textarea';
import { icon } from '@/components/admin/icons';

type HeroButtonState = {
  label: string;
  linkTarget: string;
};

const EMPTY_BUTTON: HeroButtonState = { label: '', linkTarget: '' };

export default function HeroSectionCard() {
  const [headline, setHeadline] = useState('');
  const [description, setDescription] = useState('');
  const [primaryButton, setPrimaryButton] =
    useState<HeroButtonState>(EMPTY_BUTTON);
  const [secondaryButton, setSecondaryButton] =
    useState<HeroButtonState | null>(null);

  return (
    <ProductSectionCard
      title="Hero Section"
      description="The first section a visitor sees."
    >
      <FieldLabel label="Headline">
        <Input
          variant="default"
          size="medium"
          placeholder="Everest Agriculture Loan"
          value={headline}
          onChange={(event) => setHeadline(event.target.value)}
        />
      </FieldLabel>

      <FieldLabel label="Description">
        <Textarea
          variant="default"
          size="medium"
          placeholder="Financing designed for the people who cultivate Nepal's future.."
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
      </FieldLabel>

      <ButtonFieldGroup
        label="Primary Button"
        buttonLabel={primaryButton.label}
        onButtonLabelChange={(label) =>
          setPrimaryButton((button) => ({ ...button, label }))
        }
        linkTarget={primaryButton.linkTarget}
        onLinkTargetChange={(linkTarget) =>
          setPrimaryButton((button) => ({ ...button, linkTarget }))
        }
        onRemove={() => setPrimaryButton(EMPTY_BUTTON)}
      />

      {secondaryButton ? (
        <ButtonFieldGroup
          label="Secondary Button"
          buttonLabel={secondaryButton.label}
          onButtonLabelChange={(label) =>
            setSecondaryButton((button) => button && { ...button, label })
          }
          linkTarget={secondaryButton.linkTarget}
          onLinkTargetChange={(linkTarget) =>
            setSecondaryButton(
              (button) => button && { ...button, linkTarget },
            )
          }
          onRemove={() => setSecondaryButton(null)}
        />
      ) : (
        <Button
          type="button"
          variant="secondary"
          size="large"
          className="w-full"
          onClick={() => setSecondaryButton(EMPTY_BUTTON)}
        >
          <icon.plus />
          Add secondary button
        </Button>
      )}
    </ProductSectionCard>
  );
}
