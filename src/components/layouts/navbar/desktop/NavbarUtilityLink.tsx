import Link from 'next/link';
import type { ComponentType, SVGProps } from 'react';

type NavbarUtilityLinkProps = {
  label: string;
  href: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
};

export default function NavbarUtilityLink({
  label,
  href,
  icon: Icon,
}: NavbarUtilityLinkProps) {
  return (
    <Link
      href={href}
      className="text-body-4-desktop flex items-center gap-1 rounded py-2 text-red-500 transition-colors hover:text-red-600"
    >
      <Icon className="size-4 shrink-0" />
      {label}
    </Link>
  );
}
