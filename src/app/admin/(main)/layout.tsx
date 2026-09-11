import type { ReactNode } from 'react';

import MainNavbar from '@/components/admin/layouts/header/MainNavbar';
import Sidebar from '@/components/admin/layouts/sidebar/Sidebar';

type AdminLayoutProps = {
  children: ReactNode;
};

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-blue-50">
      <MainNavbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="font-urbanist flex-1">{children}</main>
      </div>
    </div>
  );
}
