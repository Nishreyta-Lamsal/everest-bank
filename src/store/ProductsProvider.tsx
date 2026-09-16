'use client';

import { createContext, useContext, useState } from 'react';

import type { ReactNode } from 'react';

type ProductsContextValue = {
  pageId?: number;
  setPageId: (id: number) => void;
  /** The product type drilled into, or undefined at the top level. */
  productType?: { id: number; title: string };
  setProductType: (productType?: { id: number; title: string }) => void;
};

const ProductsContext = createContext<ProductsContextValue | null>(null);

type ProductsProviderProps = {
  children: ReactNode;
};

export default function ProductsProvider({ children }: ProductsProviderProps) {
  const [pageId, setPageId] = useState<number>();
  const [productType, setProductType] = useState<{
    id: number;
    title: string;
  }>();

  return (
    <ProductsContext.Provider
      value={{ pageId, setPageId, productType, setProductType }}
    >
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductsContext);

  if (!context) {
    throw new Error('useProducts must be used within a ProductsProvider');
  }

  return context;
}
