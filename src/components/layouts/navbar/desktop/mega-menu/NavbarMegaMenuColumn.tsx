import Link from 'next/link';

import type { NavbarMegaMenuColumnProps } from '@/types';

export default function NavbarMegaMenuColumn({
  label,
  href,
  icon: Icon,
  links,
}: NavbarMegaMenuColumnProps) {
  const titleClassName = 'flex items-center gap-2 py-2';
  const title = (
    <>
      <Icon className="text-grey-500 size-4 shrink-0" />
      <p className="text-body-2-desktop-md text-grey-500">{label}</p>
    </>
  );

  return (
    <div className="flex w-full flex-col gap-2">
      {href ? (
        <Link href={href} className={titleClassName}>
          {title}
        </Link>
      ) : (
        <div className={titleClassName}>{title}</div>
      )}
      <div className="flex flex-col gap-4 pl-6">
        {links.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="text-body-3-desktop text-grey-500 transition-colors hover:text-red-500"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
