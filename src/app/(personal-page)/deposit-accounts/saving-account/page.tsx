import Breadcrumbs from '@/components/ui/navigation/Breadcrumbs';
import MountainHeroSection from '@/components/shared/MountainHeroSection';
import StepSection from '@/components/shared/step/StepSection';
import ProcessSection from '@/components/shared/process/ProcessSection';

import { ROUTE } from '@/constants';

import { savingAccountSteps } from './_data/steps';
import { accountDocuments, accountDocumentsImage } from './_data/documents';

const breadcrumbItems = [
  { label: 'Deposit Accounts', href: ROUTE.DEPOSIT_ACCOUNTS },
  { label: 'Savings Account' },
];

export default function SavingAccountPage() {
  return (
    <main className="relative">
      <Breadcrumbs items={breadcrumbItems} tone="dark" />
      <MountainHeroSection
        heading="Savings Account"
        buttonLabel="Open your account in 3 minutes"
      />
      <ProcessSection
        heading="Documents You Need to Open Your Account"
        steps={accountDocuments}
        ctaLabel="Apply for Loan"
        image={accountDocumentsImage.src}
        imageAlt={accountDocumentsImage.alt}
      />
      <StepSection
        heading="Open Your Savings Account in 5 Simple Steps"
        steps={savingAccountSteps}
        ctaLabel="Ready to Open Your Savings Account?"
      />
    </main>
  );
}
