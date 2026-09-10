import Image from 'next/image';

import { icon } from '@/components/admin/icons';
import { Input } from '@/components/admin/ui/input';

export default function MainNavbar() {
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
        <Image
          src="/admin/icons/client-logo.svg"
          alt="Client logo"
          width={40}
          height={40}
          className="size-10"
        />
      </div>
    </nav>
  );
}
