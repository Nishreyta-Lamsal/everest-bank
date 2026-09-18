'use client';

import type { ReactNode } from 'react';
import { useParams } from 'next/navigation';

import PageEditorHeader from '../../pages/[slug]/_components/PageEditorHeader';
import ProductPreviewSlot from './ProductPreviewSlot';
import Sidebar from '@/components/admin/layouts/sidebar/Sidebar';
import { PageEditorProvider } from '@/store/PageEditorContext';

import { ADMIN_ROUTE } from '@/constants/admin';

type ProductEditorShellProps = {
  preview: ReactNode;
  children: ReactNode;
};

export default function ProductEditorShell({
  preview,
  children,
}: ProductEditorShellProps) {

  const params = useParams<{ slug?: string }>();

  return (
    <PageEditorProvider>
      <div className="flex h-screen flex-col overflow-hidden bg-blue-50">
        <PageEditorHeader
          pageName="Products"
          backHref={ADMIN_ROUTE.PRODUCTS}
          domainLabel="everestbankltd.com"
          domainHref="https://everestbankltd.com"
        />
        <div className="flex min-h-0 flex-1">
          <Sidebar />
          <main className="flex min-h-0 min-w-0 flex-1 gap-4 p-4">
            <div className="min-w-0 flex-2 overflow-y-auto">{children}</div>
            <div className="hidden min-h-0 w-[600px] shrink-0 xl:block">
              <ProductPreviewSlot slug={params?.slug} fallback={preview} />
            </div>
          </main>
        </div>
      </div>
    </PageEditorProvider>
  );
}
