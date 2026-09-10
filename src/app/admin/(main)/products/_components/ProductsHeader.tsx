import { icon } from '@/components/admin/icons';
import { Button } from '@/components/admin/ui/button';

export default function ProductsHeader() {
  return (
    <section className="flex w-full items-center justify-between">
      <div className="flex flex-col gap-1">
        <p className="text-heading-3 text-neutral-900">Products</p>
        <p className="text-paragraph-sm text-neutral-700">
          Every loan, account, card, and remittance service on the website one
          structured editor.
        </p>
      </div>
      <Button variant="primary">
        <icon.plus />
        Add new pages
      </Button>
    </section>
  );
}
