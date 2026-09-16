import FormsListRow from './FormsListRow';

import type { Form } from '@/types/admin';

type FormsListProps = {
  items: Form[];
};

export default function FormsList({ items }: FormsListProps) {
  return (
    <div className="flex w-full flex-col divide-y divide-black/3">
      {items.map((form) => (
        <FormsListRow key={form.id} form={form} />
      ))}
    </div>
  );
}
