import type { ComponentType, SVGProps } from 'react';

export type FooterOfficer = {
  title: string;
  name: string;
  photo: string;
  phone: string;
  extension: string;
  email: string;
};

export type FooterLink = {
  label: string;
  href: string;
};

export type FooterLinkColumn = {
  title: string;
  links: FooterLink[];
};

export type FooterSocialLink = {
  label: string;
  href: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
};

export type FooterOfficerCardProps = FooterOfficer;

export type FooterSocialColumnProps = {
  className?: string;
};

export type FooterLinkColumnProps = {
  column: FooterLinkColumn;
  className?: string;
};

export type FooterAccordionColumnProps = {
  column: FooterLinkColumn;
  isLast?: boolean;
};
