import NavbarMenuItem from './NavbarMenuItem';
import NavbarSearchInput from './NavbarSearchInput';
import Button from '@/components/ui/buttons/Button';

import { mainNavItems } from '@/data';

export default function NavbarMainBar() {
  return (
    <div className="flex items-center justify-between pr-4 md:pr-10 xl:pr-22">
      <div className="flex items-center">
        {mainNavItems.map((item, index) => (
          <NavbarMenuItem key={item.label} {...item} isFirst={index === 0} />
        ))}
      </div>
      <div className="flex items-center gap-2">
        <NavbarSearchInput />
        <Button shape="rectangular" size="sm">
          Login To EBL Digital
        </Button>
      </div>
    </div>
  );
}
