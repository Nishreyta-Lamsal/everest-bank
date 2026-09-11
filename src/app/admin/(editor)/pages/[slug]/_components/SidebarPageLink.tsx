import Link from 'next/link';

import { ADMIN_ROUTE } from '@/constants/admin';

import type { Page } from '@/types/admin';

type SidebarPageLinkProps = {
  page: Page;
};

export default function SidebarPageLink({ page }: SidebarPageLinkProps) {
  return (
    <Link
      href={`${ADMIN_ROUTE.PAGES}/${page.slug}`}
      className="w-full truncate rounded-full px-3 py-2 text-[14px] text-[#4f4f4f]"
    >
      {page.title}
    </Link>
  );
}
