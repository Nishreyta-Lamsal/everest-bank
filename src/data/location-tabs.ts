import { ROUTE } from '@/constants';

import type { LinkAction } from '@/types';

export const locationTabs: LinkAction[] = [
  { label: 'ATM', href: ROUTE.ATM },
  { label: 'Branch Locator', href: ROUTE.BRANCHES },
];
