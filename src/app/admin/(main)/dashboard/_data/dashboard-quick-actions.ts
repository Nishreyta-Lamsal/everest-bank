import type { ComponentType, SVGProps } from 'react';

import { icon } from '@/components/admin/icons';

import { ADMIN_ROUTE } from '@/constants/admin';

export type QuickAction = {
  id: string;
  label: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  href?: string;
};

export const quickActions: QuickAction[] = [
  {
    id: 'post-a-notice',
    label: 'Post a notice',
    icon: icon.megaphone,
    href: ADMIN_ROUTE.NOTICES_AND_NEWS,
  },
  {
    id: 'update-forex-rates',
    label: 'Update forex rates',
    icon: icon.percent,
  },
  {
    id: 'edit-a-page',
    label: 'Edit a page',
    icon: icon.fileText,
    href: ADMIN_ROUTE.PAGES,
  },
  {
    id: 'add-a-product',
    label: 'Add a product',
    icon: icon.bank,
    href: ADMIN_ROUTE.PRODUCT_NEW,
  },
  { id: 'upload-a-file', label: 'Upload a file', icon: icon.photos },
  { id: 'check-approvals', label: 'Check approvals', icon: icon.bell },
];
