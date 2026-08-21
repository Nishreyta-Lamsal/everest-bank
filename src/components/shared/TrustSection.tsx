import StatBanner from '@/components/shared/StatBanner';

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

export default function TrustSection() {
  return (
    <StatBanner
      images={TRUST_IMAGES}
      title="30+"
      description="Years of trust"
    />
  );
}
