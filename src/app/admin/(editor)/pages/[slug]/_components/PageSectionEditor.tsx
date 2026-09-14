'use client';

import { useSearchParams } from 'next/navigation';

import HeroSlideEditor from './HeroSlideEditor';
import ProductsSectionEditor from './ProductsSectionEditor';
import LoansPreviewEditor from './LoansPreviewEditor';
import CardsPreviewEditor from './CardsPreviewEditor';
import AppPromoEditor from './AppPromoEditor';
import CsrSectionEditor from './CsrSectionEditor';
import TrustBannerEditor from './TrustBannerEditor';
import SectionContentPreview from './SectionContentPreview';
import { Card } from '@/components/admin/ui/card';

import { usePage } from '@/hooks/api/admin/use-pages';
import { usePageSection } from '@/hooks/api/admin/use-page-sections';

type PageSectionEditorProps = {
  slug: string;
};

function EditorCard({ children }: { children: React.ReactNode }) {
  return (
    <Card className="w-full">
      <p className="text-[14px] text-neutral-700 opacity-[0.72]">{children}</p>
    </Card>
  );
}

export default function PageSectionEditor({ slug }: PageSectionEditorProps) {
  const searchParams = useSearchParams();
  const sectionParam = searchParams.get('section');
  const requestedId = sectionParam ? Number(sectionParam) : undefined;

  const { data: page, isPending, isError } = usePage(slug);

  // Fall back to the first section when the URL doesn't name one.
  const fallbackId = page?.sections?.length
    ? [...page.sections].sort((a, b) => a.position - b.position)[0].id
    : undefined;
  const activeId = requestedId ?? fallbackId;

  const {
    data: section,
    isPending: isSectionPending,
    isError: isSectionError,
  } = usePageSection(slug, activeId);

  if (isPending || (activeId && isSectionPending)) {
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
    return <EditorCard>Could not load this page.</EditorCard>;
  }

  if (!activeId) {
    return <EditorCard>This page has no sections yet.</EditorCard>;
  }

  if (isSectionError || !section) {
    return <EditorCard>Could not load this section.</EditorCard>;
  }

  if (section.section_type.endsWith('hero')) {
    return <HeroSlideEditor key={section.id} slug={slug} section={section} />;
  }

  if (section.section_type.endsWith('products')) {
    return (
      <ProductsSectionEditor key={section.id} slug={slug} section={section} />
    );
  }

  if (section.section_type === 'loans_preview') {
    return (
      <LoansPreviewEditor key={section.id} slug={slug} section={section} />
    );
  }

  if (section.section_type === 'cards_preview') {
    return (
      <CardsPreviewEditor key={section.id} slug={slug} section={section} />
    );
  }

  if (section.section_type === 'app_promo') {
    return <AppPromoEditor key={section.id} slug={slug} section={section} />;
  }

  if (section.section_type === 'csr') {
    return <CsrSectionEditor key={section.id} slug={slug} section={section} />;
  }

  if (section.section_type === 'trust') {
    return <TrustBannerEditor key={section.id} slug={slug} section={section} />;
  }

  return <SectionContentPreview key={section.id} section={section} />;
}
