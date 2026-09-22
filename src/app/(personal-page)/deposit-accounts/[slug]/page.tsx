import { notFound } from 'next/navigation';

import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import Breadcrumbs from '@/components/ui/navigation/Breadcrumbs';
import MountainHeroSection from '@/components/shared/MountainHeroSection';
import AccountFinderSection from './_components/account-finder/AccountFinderSection';
import ProcessSection from '@/components/shared/process/ProcessSection';
import StepSection from '@/components/shared/step/StepSection';

import { depositDetailsPageService } from '@/api/services/personal/deposit-accounts/deposit-details-page.service';

import { getQueryClient } from '@/lib/get-query-client';
import { getSectionContent } from '@/lib/get-section-content';

import { savingAccountSteps } from './_data/steps';
import { accountDocuments, accountDocumentsImage } from './_data/documents';

type DepositAccountDetailsPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function DepositAccountDetailsPage({
  params,
}: DepositAccountDetailsPageProps) {
  const { slug } = await params;

  const queryClient = getQueryClient();

  const result = await queryClient
    .fetchQuery({
      queryKey: ['deposit-details-page', slug],
      queryFn: () => depositDetailsPageService.getDepositDetailsPage(slug),
    })
    .catch(() => null);

  if (!result) {
    notFound();
  }

  const { sections, title } = result.data;

  const breadcrumbsContent = getSectionContent(sections, 'content_breadcrumbs');
  const breadcrumbItems = breadcrumbsContent?.items?.length
    ? breadcrumbsContent.items
    : [{ label: title }];

  const hero = getSectionContent(sections, 'saving_hero');

  const documentsContent = getSectionContent(sections, 'saving_documents');
  const documentSteps = documentsContent?.steps?.length
    ? documentsContent.steps
    : accountDocuments;

  const stepsContent = getSectionContent(sections, 'saving_steps');
  const steps = stepsContent?.steps?.length
    ? stepsContent.steps.map((step) => ({
        number: step.number,
        title: step.title,
        image: step.image?.src || '/placeholder.png',
        alt: step.image?.alt || step.title,
      }))
    : savingAccountSteps;

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="relative">
        <Breadcrumbs items={breadcrumbItems} tone="dark" />
        <MountainHeroSection
          heading={hero?.heading || title}
          buttonLabel={hero?.button?.label || 'Open your account in 3 minutes'}
          buttonHref={hero?.button?.href}
        />
        <AccountFinderSection sections={sections} />
        <ProcessSection
          heading={
            documentsContent?.heading ||
            'Documents You Need to Open Your Account'
          }
          steps={documentSteps}
          ctaLabel={documentsContent?.cta?.label || 'Apply for Loan'}
          ctaHref={documentsContent?.cta?.href}
          image={documentsContent?.image?.src || accountDocumentsImage.src}
          imageAlt={documentsContent?.image?.alt || accountDocumentsImage.alt}
        />
        <StepSection
          heading={
            stepsContent?.heading ||
            'Open Your Savings Account in 5 Simple Steps'
          }
          steps={steps}
          ctaLabel={
            stepsContent?.cta?.label || 'Ready to Open Your Savings Account?'
          }
          ctaHref={stepsContent?.cta?.href}
        />
      </main>
    </HydrationBoundary>
  );
}
