import type { ComponentType, SVGProps } from 'react';

export type UtilityNavItem = {
  label: string;
  href: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
};

export type MainNavItem = {
  label: string;
  href: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  activePrefixes?: string[];
};

export type PersonalMenuLink = {
  label: string;
  href: string;
};

export type PersonalMenuColumn = {
  label: string;
  href?: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  links: PersonalMenuLink[];
};

export type NavbarUtilityLinkProps = UtilityNavItem;

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
