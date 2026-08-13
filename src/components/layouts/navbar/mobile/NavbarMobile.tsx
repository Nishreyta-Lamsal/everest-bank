import Image from 'next/image';
import Link from 'next/link';

import NavbarSearchInput from '../NavbarSearchInput';
import { MenuIcon } from '@/components/icons';
import Button from '@/components/ui/buttons/Button';

export default function NavbarMobile() {
  return (
    <div className="flex flex-col lg:hidden">
      <div className="flex items-center justify-between px-4 py-3">
        <Link href="/" className="shrink-0">
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
          aria-label="Open menu"
          className="flex size-6 shrink-0 items-center justify-center text-red-500"
        >
          <MenuIcon className="size-6" />
        </button>
      </div>
      <div className="flex items-center gap-2 px-4 py-2">
        <div className="min-w-0 flex-1">
          <NavbarSearchInput />
        </div>
        <Button shape="rectangular" size="sm" className="shrink-0">
          Login To EBL Digital
        </Button>
      </div>
    </div>
  );
}
