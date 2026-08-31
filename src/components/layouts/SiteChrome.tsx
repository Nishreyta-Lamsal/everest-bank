'use client';

import { usePathname } from 'next/navigation';

import { ROUTE } from '@/constants';

import type { ReactNode } from 'react';

type SiteChromeProps = {
  children: ReactNode;
};

export default function SiteChrome({ children }: SiteChromeProps) {
  const pathname = usePathname();

  if (pathname.startsWith(ROUTE.ADMIN)) {
    return null;
  }

  return <>{children}</>;
}
