import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  XIcon,
} from '@/components/icons';

import { EXTERNAL_LINK } from '@/constants';
import type { FooterSocialLink, FooterSocialLinkData } from '@/types';

export const socialLinks: FooterSocialLink[] = [
  { label: 'Facebook', href: EXTERNAL_LINK.FACEBOOK, icon: FacebookIcon },
  { label: 'X (Twitter)', href: EXTERNAL_LINK.X, icon: XIcon },
  { label: 'Instagram', href: EXTERNAL_LINK.INSTAGRAM, icon: InstagramIcon },
  { label: 'LinkedIn', href: EXTERNAL_LINK.LINKEDIN, icon: LinkedinIcon },
];

export const footerSocialLinks: FooterSocialLinkData[] = [
  { label: 'Facebook', href: EXTERNAL_LINK.FACEBOOK, iconName: 'facebook' },
  { label: 'X (Twitter)', href: EXTERNAL_LINK.X, iconName: 'x' },
  { label: 'Instagram', href: EXTERNAL_LINK.INSTAGRAM, iconName: 'instagram' },
  { label: 'LinkedIn', href: EXTERNAL_LINK.LINKEDIN, iconName: 'linkedin' },
];
