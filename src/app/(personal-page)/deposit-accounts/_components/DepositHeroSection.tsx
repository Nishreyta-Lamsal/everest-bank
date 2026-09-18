import ContentHeroSection from '@/components/shared/content/ContentHeroSection';

import { getSectionContent } from '@/lib/get-section-content';

import type { DepositPageSection } from '@/api/services/personal/deposit-accounts/deposit-page.service';

type DepositHeroSectionProps = {
  sections?: DepositPageSection[];
};

export default function DepositHeroSection({
  sections,
}: DepositHeroSectionProps) {
  const content = getSectionContent(sections, 'deposit_hero');

  return (
    <ContentHeroSection
      image={
        content?.image?.src ||
        '/images/deposit-accounts/deposit-accounts-hero.png'
      }
      imageAlt={
        content?.image?.alt ||
        'A woman smiling as she puts a banknote into a piggy bank at home'
      }
      heading={content?.heading || 'Deposit Accounts'}
      buttonLabel={content?.button?.label || 'Open Your Account in 3 Minutes'}
      buttonHref={content?.button?.href || '#'}
      secondaryButtonHref={content?.secondary_button?.href || '#'}
      secondaryButtonAriaLabel={
        content?.secondary_button?.aria_label || 'Explore all deposit accounts'
      }
    />
  );
}
