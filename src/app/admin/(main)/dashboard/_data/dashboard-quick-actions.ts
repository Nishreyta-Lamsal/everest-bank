import type { ComponentType, SVGProps } from 'react';

import { icon } from '@/components/admin/icons';

export type QuickAction = {
  id: string;
  label: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
};

export const quickActions: QuickAction[] = [
  { id: 'post-a-notice', label: 'Post a notice', icon: icon.megaphone },
  {
    id: 'update-forex-rates',
    label: 'Update forex rates',
    icon: icon.percent,
  },
  { id: 'edit-a-page', label: 'Edit a page', icon: icon.fileText },
  { id: 'add-a-product', label: 'Add a product', icon: icon.bank },
  { id: 'upload-a-file', label: 'Upload a file', icon: icon.photos },
  { id: 'check-approvals', label: 'Check approvals', icon: icon.bell },
];
