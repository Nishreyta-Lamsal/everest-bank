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
  opensInNewTab?: boolean;
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

export type FooterSocialLinkData = {
  label: string;
  href: string;
  iconName: string;
};

export type FooterSupportContent = {
  title: string;
  description: string;
  swiftCode: string;
  tollFreeNumber: string;
  callHref?: string;
  enquireHref?: string;
};

export type FooterBrandContent = {
  logoUrl?: string;
  appQrUrl?: string;
  appPromoLabel: string;
};

export type FooterSocialColumnProps = {
  links: FooterSocialLinkData[];
  className?: string;
};

export type FooterSectionProps = {
  columns: FooterLinkColumn[];
  socials: FooterSocialLinkData[];
  brand: FooterBrandContent;
};

export type FooterSupportCardProps = {
  content: FooterSupportContent;
};

export type FooterBrandProps = {
  content: FooterBrandContent;
};

export type FooterLinkColumnProps = {
  column: FooterLinkColumn;
  className?: string;
};

export type FooterAccordionColumnProps = {
  column: FooterLinkColumn;
  isLast?: boolean;
};
