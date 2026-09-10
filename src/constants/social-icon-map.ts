import { icon } from '@/components/icons';

import type { ComponentType, SVGProps } from 'react';

export const socialIconMap: Record<
  string,
  ComponentType<SVGProps<SVGSVGElement>>
> = {
  facebook: icon.facebook,
  x: icon.x,
  instagram: icon.instagram,
  linkedin: icon.linkedin,
  youtube: icon.youtube,
};
