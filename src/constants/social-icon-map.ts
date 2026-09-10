import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  XIcon,
  YoutubeIcon,
} from '@/components/icons';

import type { ComponentType, SVGProps } from 'react';

export const socialIconMap: Record<
  string,
  ComponentType<SVGProps<SVGSVGElement>>
> = {
  facebook: FacebookIcon,
  x: XIcon,
  instagram: InstagramIcon,
  linkedin: LinkedinIcon,
  youtube: YoutubeIcon,
};
