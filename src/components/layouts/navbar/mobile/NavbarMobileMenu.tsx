'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { icon } from '@/components/icons';
import NavbarMobileMenuColumn from './NavbarMobileMenuColumn';

import { useDismissableOverlay } from '@/hooks/useDismissableOverlay';
import { cn } from '@/lib/utils';

import { ROUTE } from '@/constants/route';

import type { MainNavItem } from '@/types';

const TRANSITION_DURATION_MS = 300;

type NavbarMobileMenuProps = {
  activeItem: MainNavItem;
  isOpen: boolean;
  onClose: () => void;
};

export default function NavbarMobileMenu({
  activeItem,
  isOpen,
  onClose,
}: NavbarMobileMenuProps) {
  const [openColumn, setOpenColumn] = useState<string | null>(null);
  const [prevIsOpen, setPrevIsOpen] = useState(isOpen);
  const [shouldRender, setShouldRender] = useState(isOpen);
  const [isVisible, setIsVisible] = useState(isOpen);

  if (isOpen !== prevIsOpen) {
    setPrevIsOpen(isOpen);
    if (isOpen) {
      setShouldRender(true);
    } else {
      setIsVisible(false);
    }
  }

  useDismissableOverlay(isOpen, onClose);

  useEffect(() => {
    if (isOpen) {
      const raf = requestAnimationFrame(() => setIsVisible(true));
      return () => cancelAnimationFrame(raf);
    }

    const timeout = setTimeout(
      () => setShouldRender(false),
      TRANSITION_DURATION_MS,
    );
    return () => clearTimeout(timeout);
  }, [isOpen]);

  if (!shouldRender) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-hidden={!isOpen}
      aria-label={`${activeItem.label} menu`}
      className={cn(
        'fixed inset-0 z-50 flex flex-col overflow-y-auto bg-white transition-transform duration-300 ease-in-out lg:hidden',
        isVisible ? 'translate-x-0' : 'translate-x-full',
      )}
    >
      <div className="flex items-center justify-between px-4 py-3">
        <Link href={ROUTE.PERSONAL} className="shrink-0" onClick={onClose}>
          <Image
            src="/icons/everest-bank-logo.svg"
            alt="Everest Bank"
            width={200}
            height={30}
            priority
          />
        </Link>
        <button
          type="button"
          aria-label="Close menu"
          onClick={onClose}
          className="flex size-6 shrink-0 items-center justify-center"
        >
          <icon.close className="text-red-500" />
        </button>
      </div>

      <div className="flex flex-col items-start gap-8 px-4 pb-8">
        {activeItem.megaMenu && (
          <nav
            aria-label={`${activeItem.label} menu`}
            className="flex w-full flex-col items-start"
          >
            {activeItem.megaMenu.columns.map((column) => (
              <NavbarMobileMenuColumn
                key={column.label}
                column={column}
                isOpen={openColumn === column.label}
                onToggle={() =>
                  setOpenColumn((current) =>
                    current === column.label ? null : column.label,
                  )
                }
              />
            ))}
          </nav>
        )}

        {activeItem.megaMenu?.cta && (
          <Link
            href={activeItem.megaMenu.cta.href}
            onClick={onClose}
            className="relative flex h-[120px] w-full items-end justify-between overflow-hidden rounded-lg rounded-tl-[80px] bg-orange-50 px-6 py-4"
          >
            <Image
              src="/images/navbar/mobile-menu-cta-mountain.svg"
              alt=""
              width={193}
              height={80}
              className="pointer-events-none absolute right-6 bottom-4"
            />
            <span className="text-title-1-mobile-md relative text-[#49423c]">
              {activeItem.megaMenu.cta.label}
            </span>
            <icon.arrowUpRight className="relative size-5 shrink-0 text-[#49423c]" />
          </Link>
        )}
      </div>
    </div>
  );
}
