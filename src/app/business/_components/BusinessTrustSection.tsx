import StatBanner from '@/components/shared/StatBanner';

import { getSectionContent } from '@/lib/get-section-content';

import type { BusinessPageSection } from '@/api/services/business/business-page.service';

const TRUST_IMAGES = [
  {
    src: '/images/trust/branch-photo.png',
    alt: 'An Everest Bank relationship manager reviewing paperwork with a business client',
  },
  {
    src: '/images/trust/branch-photo.png',
    alt: 'An Everest Bank relationship manager reviewing paperwork with a business client',
  },
  {
    src: '/images/trust/branch-photo.png',
    alt: 'An Everest Bank relationship manager reviewing paperwork with a business client',
  },
  {
    src: '/images/trust/branch-photo.png',
    alt: 'An Everest Bank relationship manager reviewing paperwork with a business client',
  },
  {
    src: '/images/trust/branch-photo.png',
    alt: 'An Everest Bank relationship manager reviewing paperwork with a business client',
  },
];

type BusinessTrustSectionProps = {
  sections?: BusinessPageSection[];
};

export default function BusinessTrustSection({
  sections,
}: BusinessTrustSectionProps) {
  const content = getSectionContent(sections, 'business_trust');

  const images = content?.images || TRUST_IMAGES;
  const title = content?.title || '500+';
  const description = content?.description || 'SMEs & Corporate Clients';

  return <StatBanner images={images} title={title} description={description} />;
}
