'use client';

import { createContext, useContext, useState } from 'react';

import type { ReactNode } from 'react';

type ProductsContextValue = {
  pageId?: number;
  setPageId: (id: number) => void;
  productTypeId?: number;
  setProductTypeId: (id: number) => void;
};

const ProductsContext = createContext<ProductsContextValue | null>(null);

type ProductsProviderProps = {
  children: ReactNode;
};

export default function ProductsProvider({
  children,
}: ProductsProviderProps) {
  const [pageId, setPageId] = useState<number>();
  const [productTypeId, setProductTypeId] = useState<number>();

  return (
    <ProductsContext.Provider
      value={{ pageId, setPageId, productTypeId, setProductTypeId }}
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
