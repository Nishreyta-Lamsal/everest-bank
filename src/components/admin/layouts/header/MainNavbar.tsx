'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

import { icon } from '@/components/admin/icons';
import { Input } from '@/components/admin/ui/input';

import { useLogout, useMe } from '@/hooks/api/admin/use-auth';

export default function MainNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const { data: me } = useMe();
  const logout = useLogout();

  useEffect(
    function () {
      if (!isMenuOpen) return;

      function handlePointerDown(event: MouseEvent) {
        if (!menuRef.current?.contains(event.target as Node)) {
          setIsMenuOpen(false);
        }
      }

      function handleKeyDown(event: KeyboardEvent) {
        if (event.key === 'Escape') setIsMenuOpen(false);
      }

      document.addEventListener('mousedown', handlePointerDown);
      document.addEventListener('keydown', handleKeyDown);

      return function () {
        document.removeEventListener('mousedown', handlePointerDown);
        document.removeEventListener('keydown', handleKeyDown);
      };
    },
    [isMenuOpen],
  );

  return (
    <nav className="sticky top-0 z-50 flex h-[60px] items-center justify-between bg-[rgba(251,251,251,0.8)] px-4 backdrop-blur-xs">
      <icon.mainLogo className="h-[28px] w-[200px] text-blue-900" />
      <div className="flex items-center gap-3">
        <Input
          type="text"
          placeholder="Search …"
          className="text-sm"
          containerClassName="w-[230px] bg-white-alpha-70"
          leftIcon={<icon.search className="text-black-alpha-80 size-4" />}
          showKbd
          kbdKey="K"
        />
        <div className="flex size-10 cursor-pointer items-center justify-center rounded-full bg-neutral-100">
          <icon.bell className="text-slate-600" />
        </div>
        <div className="flex size-10 cursor-pointer items-center justify-center rounded-full bg-neutral-100 p-2">
          <icon.settings className="size-6 text-slate-600" />
        </div>

        <div ref={menuRef} className="relative">
          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-label="Account menu"
            aria-haspopup="menu"
            aria-expanded={isMenuOpen}
            className="flex size-10 cursor-pointer items-center justify-center rounded-full"
          >
            <Image
              src="/admin/icons/client-logo.svg"
              alt="Client logo"
              width={40}
              height={40}
              className="size-10"
            />
          </button>

          {isMenuOpen && (
            <div
              role="menu"
              className="absolute top-full right-0 z-20 mt-1 flex min-w-[200px] flex-col rounded-[8px] border border-black/5 bg-white py-1 shadow-lg"
            >
              {me?.email && (
                <p className="truncate border-b border-black/5 px-3 py-2 text-[13px] text-neutral-500">
                  {me.email}
                </p>
              )}
              <button
                type="button"
                role="menuitem"
                disabled={logout.isPending}
                onClick={() => {
                  setIsMenuOpen(false);
                  logout.mutate();
                }}
                className="flex cursor-pointer items-center px-3 py-2 text-left text-[14px] text-red-600 transition-colors hover:bg-red-50 disabled:pointer-events-none disabled:opacity-50"
              >
                {logout.isPending ? 'Logging out…' : 'Logout'}
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
