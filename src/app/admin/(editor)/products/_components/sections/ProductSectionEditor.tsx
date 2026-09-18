'use client';

import ContentBreadcrumbsEditor from './ContentBreadcrumbsEditor';
import ContentHeroEditor from '../../../pages/[slug]/_components/ContentHeroEditor';
import ContentStatsEditor from './ContentStatsEditor';
import ContentBodyEditor from './ContentBodyEditor';
import ContentSidebarEditor from './ContentSidebarEditor';
import CardsTrustBarEditor from './CardsTrustBarEditor';
import CardOverviewEditor from './CardOverviewEditor';
import LoanHeroEditor from './LoanHeroEditor';
import LoanStatsEditor from './LoanStatsEditor';
import LoanEligibilityEditor from './LoanEligibilityEditor';
import LoanApplyChecklistEditor from './LoanApplyChecklistEditor';
import LoanFinancingEditor from './LoanFinancingEditor';
import LoanProcessEditor from './LoanProcessEditor';
import LoanImpactEditor from './LoanImpactEditor';
import LoanFaqsEditor from './LoanFaqsEditor';
import LoanGlanceEditor from './LoanGlanceEditor';
import SavingHeroEditor from './SavingHeroEditor';
import SavingDocumentsEditor from './SavingDocumentsEditor';
import SavingStepsEditor from './SavingStepsEditor';
import SavingAccountFinderEditor from './SavingAccountFinderEditor';
import SectionContentPreview from '../../../pages/[slug]/_components/SectionContentPreview';

import type { PageSectionRead } from '@/types/admin';

type ProductSectionEditorProps = {
  slug: string;
  section: PageSectionRead;
};

export default function ProductSectionEditor({
  slug,
  section,
}: ProductSectionEditorProps) {
  switch (section.section_type) {
    case 'content_breadcrumbs':
      return <ContentBreadcrumbsEditor slug={slug} section={section} />;
    // Same heading/image/button shape as the content hero.
    case 'content_hero':
    case 'card_product_hero':
      return <ContentHeroEditor slug={slug} section={section} />;
    case 'cards_trust_bar':
      return <CardsTrustBarEditor slug={slug} section={section} />;
    case 'card_overview':
      return <CardOverviewEditor slug={slug} section={section} />;
    case 'content_stats':
      return <ContentStatsEditor slug={slug} section={section} />;
    case 'content_body':
      return <ContentBodyEditor slug={slug} section={section} />;
    case 'content_sidebar':
      return <ContentSidebarEditor slug={slug} section={section} />;
    case 'loan_hero':
      return <LoanHeroEditor slug={slug} section={section} />;
    case 'loan_stats':
      return <LoanStatsEditor slug={slug} section={section} />;
    case 'loan_eligibility':
      return <LoanEligibilityEditor slug={slug} section={section} />;
    case 'loan_apply_checklist':
      return <LoanApplyChecklistEditor slug={slug} section={section} />;
    case 'loan_financing':
      return <LoanFinancingEditor slug={slug} section={section} />;
    case 'loan_process':
      return <LoanProcessEditor slug={slug} section={section} />;
    case 'loan_impact':
      return <LoanImpactEditor slug={slug} section={section} />;
    case 'loan_faqs':
      return <LoanFaqsEditor slug={slug} section={section} />;
    case 'loan_glance':
      return <LoanGlanceEditor slug={slug} section={section} />;
    case 'saving_hero':
      return <SavingHeroEditor slug={slug} section={section} />;
    case 'saving_documents':
      return <SavingDocumentsEditor slug={slug} section={section} />;
    case 'saving_steps':
      return <SavingStepsEditor slug={slug} section={section} />;
    case 'saving_account_finder':
      return <SavingAccountFinderEditor slug={slug} section={section} />;
    default:
      return <SectionContentPreview section={section} />;
  }
}
