import ProductIdentityCard from '../_components/ProductIdentityCard';
import HeroSectionCard from '../_components/HeroSectionCard';
import KeyStatsSectionCard from '../_components/KeyStatsSectionCard';
import EligibilitySectionCard from '../_components/EligibilitySectionCard';
import RequiredInfoSectionCard from '../_components/RequiredInfoSectionCard';
import BuiltForSectionCard from '../_components/BuiltForSectionCard';
import ApplicationProcessSectionCard from '../_components/ApplicationProcessSectionCard';
import CtaBannerSectionCard from '../_components/CtaBannerSectionCard';
import FaqSectionCard from '../_components/FaqSectionCard';
import ProductInfoSectionCard from '../_components/ProductInfoSectionCard';
import { Card } from '@/components/admin/ui/card';

export default function NewProductPage() {
  return (
    <div className="mx-auto w-full">
      <Card className="flex w-full flex-col gap-6">
        <ProductIdentityCard />
        <HeroSectionCard />
        <KeyStatsSectionCard />
        <EligibilitySectionCard />
        <RequiredInfoSectionCard />
        <BuiltForSectionCard />
        <ApplicationProcessSectionCard />
        <CtaBannerSectionCard />
        <FaqSectionCard />
        <ProductInfoSectionCard />
      </Card>
    </div>
  );
}
