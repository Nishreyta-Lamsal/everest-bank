import type { ReactNode } from 'react';

import ProductEditorShell from './_components/ProductEditorShell';

type ProductEditorLayoutProps = {
  children: ReactNode;
};

export default function ProductEditorLayout({
  children,
}: ProductEditorLayoutProps) {
  return <ProductEditorShell>{children}</ProductEditorShell>;
}
