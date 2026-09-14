import PersonalPage from '@/app/(personal-page)/page';
import CardsPage from '@/app/(personal-page)/cards/page';
import LoanServicesPage from '@/app/(personal-page)/loans/page';
import DepositAccountsPage from '@/app/(personal-page)/deposit-accounts/page';
import SavingAccountPage from '@/app/(personal-page)/deposit-accounts/saving-account/page';
import AtmPage from '@/app/(personal-page)/atm/page';
import BranchesPage from '@/app/(personal-page)/branches/page';
import ForexRatesPage from '@/app/(personal-page)/forex-rates/page';
import NoticePage from '@/app/(personal-page)/notice/page';
import ToolsPage from '@/app/(personal-page)/services/tools/page';
import EMICalculatorPage from '@/app/(personal-page)/services/tools/emi-calculator/page';
import FDCalculatorPage from '@/app/(personal-page)/services/tools/fd-calculator/page';
import EligibilityCheckerPage from '@/app/(personal-page)/services/tools/eligibility-checker/page';
import BusinessPage from '@/app/business/page';
import SMEBankingPage from '@/app/business/sme-banking/page';
import AboutPage from '@/app/about/page';
import ProfilePage from '@/app/about/profile/page';
import CorporateMissionAndVisionPage from '@/app/about/corporate-mission-and-vision/page';
import OrganizationStructurePage from '@/app/about/organization-structure/page';
import BoardOfDirectorsPage from '@/app/about/board-of-directors/page';
import RemittancePage from '@/app/remittance/page';
import PayoutLocationsPage from '@/app/remittance/payout-locations/page';

import type { ComponentType } from 'react';

export const PAGE_PREVIEW_COMPONENTS: Record<string, ComponentType> = {
  personal: PersonalPage,
  cards: CardsPage,
  loans: LoanServicesPage,
  'deposit-accounts': DepositAccountsPage,
  'saving-account': SavingAccountPage,
  atm: AtmPage,
  branches: BranchesPage,
  'forex-rates': ForexRatesPage,
  notice: NoticePage,
  tools: ToolsPage,
  'emi-calculator': EMICalculatorPage,
  'fd-calculator': FDCalculatorPage,
  'eligibility-checker': EligibilityCheckerPage,
  business: BusinessPage,
  'sme-banking': SMEBankingPage,
  about: AboutPage,
  profile: ProfilePage,
  'corporate-mission-and-vision': CorporateMissionAndVisionPage,
  'organization-structure': OrganizationStructurePage,
  'board-of-directors': BoardOfDirectorsPage,
  remittance: RemittancePage,
  'payout-locations': PayoutLocationsPage,
};
