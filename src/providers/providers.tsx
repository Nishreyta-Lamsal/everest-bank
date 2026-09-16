import { QueryProvider } from './query-provider';
import ProductsProvider from '@/store/ProductsProvider';

import type { ReactNode } from 'react';

type ProviderProps = {
  children: ReactNode;
};

export default function Providers({ children }: ProviderProps) {
  return (
    <QueryProvider>
      <ProductsProvider>{children}</ProductsProvider>
    </QueryProvider>
  );
}
