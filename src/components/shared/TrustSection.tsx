import StatBanner from '@/components/shared/StatBanner';

import type { SectionOf, TrustBannerContent } from '@/types';

import { getSectionContent } from '@/lib/get-section-content';

type TrustBannerSection = SectionOf<'trust', TrustBannerContent>;

const TRUST_IMAGES = [
  {
    src: '/images/trust/branch-photo.png',
    alt: 'An Everest Bank Limited branch',
  },
  {
    src: '/images/trust/branch-photo.png',
    alt: 'An Everest Bank Limited branch',
  },
  {
    src: '/images/trust/branch-photo.png',
    alt: 'An Everest Bank Limited branch',
  },
  {
    src: '/images/trust/branch-photo.png',
    alt: 'An Everest Bank Limited branch',
  },
  {
    src: '/images/trust/branch-photo.png',
    alt: 'An Everest Bank Limited branch',
  },
];

type TrustSectionProps<
  TSection extends { section_type: string; content: unknown },
> = {
  sections?: TSection[];
};

export default function TrustSection<
  TSection extends { section_type: string; content: unknown },
>({ sections }: TrustSectionProps<TSection>) {
  const content =
    sections &&
    getSectionContent(sections as unknown as TrustBannerSection[], 'trust');

  const images = content?.images || TRUST_IMAGES;
  const title = content?.title || '30+';
  const description = content?.description || 'Years of trust';

  return <StatBanner images={images} title={title} description={description} />;
}
