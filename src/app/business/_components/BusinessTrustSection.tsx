import StatBanner from '@/components/shared/StatBanner';

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

export default function BusinessTrustSection() {
  return (
    <StatBanner
      images={TRUST_IMAGES}
      title="500+"
      description="SMEs & Corporate Clients"
    />
  );
}
