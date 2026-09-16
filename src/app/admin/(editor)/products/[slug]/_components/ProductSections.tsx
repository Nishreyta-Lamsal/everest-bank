'use client';

import ProductSectionEditor from '../../_components/sections/ProductSectionEditor';
import { Card } from '@/components/admin/ui/card';

import { usePage } from '@/hooks/api/admin/use-pages';

type ProductSectionsProps = {
  slug: string;
};

function Message({ children }: { children: string }) {
  return (
    <Card className="w-full">
      <p className="text-[14px] text-neutral-700 opacity-[0.72]">{children}</p>
    </Card>
  );
}

export default function ProductSections({ slug }: ProductSectionsProps) {
  const { data: page, isPending, isError } = usePage(slug);

  if (isPending) {
    return (
      <Card className="w-full">
        <div className="flex w-full flex-col gap-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="h-[48px] w-full animate-pulse rounded-[6px] bg-slate-100"
            />
          ))}
        </div>
      </Card>
    );
  }

  if (isError || !page) {
    return <Message>Could not load this product.</Message>;
  }

  const sections = [...(page.sections ?? [])].sort(
    (a, b) => a.position - b.position,
  );

  if (sections.length === 0) {
    return <Message>This product has no sections yet.</Message>;
  }

  return (
    <>
      {sections.map((section) => (
        <ProductSectionEditor
          key={section.id}
          slug={page.slug}
          section={section}
        />
      ))}
    </>
  );
}
