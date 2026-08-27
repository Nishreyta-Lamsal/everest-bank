import type { ReactNode } from 'react';

import { QueryProvider } from './query-provider';

type ProviderProps = {
  children: ReactNode;
};

export default function Providers({ children }: ProviderProps) {
  return (
    <>
      <QueryProvider>{children}</QueryProvider>
    </>
  );
}
