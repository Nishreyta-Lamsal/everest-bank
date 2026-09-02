import type { ComponentType, SVGProps } from 'react';

export type UtilityNavItem = {
  label: string;
  href: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
};

export type MegaMenuLink = {
  label: string;
  href: string;
};

export type MegaMenuColumn = {
  label: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  links: MegaMenuLink[];
  explore?: MegaMenuLink;
};

export type MegaMenu = {
  columns: MegaMenuColumn[];
  cta: MegaMenuLink;
};

export type MainNavItem = {
  label: string;
  href: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  activePrefixes?: string[];
  megaMenu?: MegaMenu;
};

export type NavbarUtilityLinkProps = UtilityNavItem;

export type NavbarMegaMenuProps = MegaMenu & {
  label: string;
};

export type NavbarMegaMenuColumnProps = MegaMenuColumn;

export type NavbarMenuItemProps = {
  label: string;
  href: string;
  isFirst?: boolean;
  hasDropdown?: boolean;
  isExpanded?: boolean;
  isActive?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
};
