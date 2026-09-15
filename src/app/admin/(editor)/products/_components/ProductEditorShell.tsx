import type { ReactNode } from 'react';

import PageEditorHeader from '../../pages/[slug]/_components/PageEditorHeader';
import LivePreview from '../../pages/[slug]/_components/LivePreview';
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
              <LivePreview>{preview}</LivePreview>
            </div>
          </main>
        </div>
      </div>
    </PageEditorProvider>
  );
}
