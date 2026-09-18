import OpenAccountSection from '@/components/shared/OpenAccountSection';

import { getSectionContent } from '@/lib/get-section-content';

import type { SmePageSection } from '@/api/services/business/sme-page.service';

type SmeOpenAccountSectionProps = {
  sections?: SmePageSection[];
};

export default function SmeOpenAccountSection({
  sections,
}: SmeOpenAccountSectionProps) {
  const content = getSectionContent(sections, 'sme_open_account');

  return (
    <OpenAccountSection
      heading={content?.heading}
      ctaHref={content?.cta?.href}
      ctaLabel={content?.cta?.label}
      videoSrc={content?.video?.src}
      posterSrc={content?.video?.poster?.src}
      posterAlt={content?.video?.poster?.alt}
      features={content?.features}
    />
  );
}
