'use client';

import { useState } from 'react';

import FieldLabel from '@/components/admin/shared/FieldLabel';
import { Input } from '@/components/admin/ui/input';
import { Select } from '@/components/admin/ui/select';

const PRODUCT_TYPE_OPTIONS = [
  { label: 'Loan', value: 'loan' },
  { label: 'Account', value: 'account' },
  { label: 'Card', value: 'card' },
  { label: 'Remittance', value: 'remittance' },
];

export default function ProductIdentityCard() {
  const [name, setName] = useState('');
  const [type, setType] = useState('loan');
  const [urlPath, setUrlPath] = useState('');

  return (
    <div className="flex w-full flex-col gap-3">
      <div className="flex w-full items-center justify-between gap-3">
        <p className="text-paragraph-lg-bold min-w-0 truncate text-neutral-900">
          {name || 'Page name goes here'}
        </p>
        <span className="text-paragraph-sm-medium flex shrink-0 items-center justify-center gap-1.5 rounded-full bg-[#edf2f7] px-3 py-2 text-[#65738a]">
          Draft
        </span>
      </div>

      <div className="flex w-full items-center gap-3">
        <FieldLabel label="Product name">
          <Input
            variant="default"
            size="medium"
            placeholder="Everest Agriculture Loan"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </FieldLabel>

        <FieldLabel label="Type">
          <Select
            variant="filled"
            size="medium"
            options={PRODUCT_TYPE_OPTIONS}
            value={type}
            onValueChange={setType}
          />
        </FieldLabel>
      </div>

      <FieldLabel label="URL path">
        <div className="flex w-full items-center gap-4">
          <p className="text-[12px] font-medium whitespace-nowrap text-neutral-900 opacity-[0.68]">
            everestbankltd.com/
          </p>
          <Input
            variant="default"
            size="medium"
            placeholder="loans/agriculture"
            value={urlPath}
            onChange={(event) => setUrlPath(event.target.value)}
          />
        </div>
      </FieldLabel>
    </div>
  );
}
