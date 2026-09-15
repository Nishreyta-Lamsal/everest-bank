import type { ReactNode } from 'react';

import ProductEditorShell from './_components/ProductEditorShell';
import PersonalPage from '@/app/(personal-page)/page';

type ProductEditorLayoutProps = {
  children: ReactNode;
};

export default function ProductEditorLayout({
  children,
}: ProductEditorLayoutProps) {
  return (
    <ProductEditorShell preview={<PersonalPage />}>
      {children}
    </ProductEditorShell>
  );
}
