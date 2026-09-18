import LayoutWrapper from '@/components/admin/layouts/wrapper/LayoutWrapper';
import ForexRatesHeader from './_components/ForexRatesHeader';
import ForexRatesContent from './_components/ForexRatesContent';

export default function ForexRatesPage() {
  return (
    <LayoutWrapper>
      <div className="flex w-full flex-col gap-6">
        <ForexRatesHeader />
        <ForexRatesContent />
      </div>
    </LayoutWrapper>
  );
}
