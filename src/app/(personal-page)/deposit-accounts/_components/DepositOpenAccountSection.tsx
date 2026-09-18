import OpenAccountSection from '@/components/shared/OpenAccountSection';

import { getSectionContent } from '@/lib/get-section-content';

import type { DepositPageSection } from '@/api/services/personal/deposit-accounts/deposit-page.service';

type DepositOpenAccountSectionProps = {
  sections?: DepositPageSection[];
};

export default function DepositOpenAccountSection({
  sections,
}: DepositOpenAccountSectionProps) {
  const content = getSectionContent(sections, 'deposit_open_account');

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
