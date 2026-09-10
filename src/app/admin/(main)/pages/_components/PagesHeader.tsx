import { icon } from '@/components/admin/icons';
import { Button } from '@/components/admin/ui/button';

export default function PagesHeader() {
  return (
    <section className="flex w-full items-center justify-between">
      <div className="flex flex-col gap-1">
        <p className="text-heading-3 text-neutral-900">Pages</p>
        <p className="text-paragraph-sm text-neutral-700">
          Every page on everestbankltd.com, assembled from sections. Open a page
          to edit content in the full-screen editor.
        </p>
      </div>
      <Button variant="primary">
        <icon.plus />
        Add new pages
      </Button>
    </section>
  );
}
