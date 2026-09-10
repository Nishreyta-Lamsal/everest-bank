import LayoutWrapper from '@/components/layouts/wrapper/LayoutWrapper';
import DashboardBanner from './_components/DashboardBanner';
import DashboardContent from './_components/DashboardContent';

export default function DashboardPage() {
  return (
    <LayoutWrapper>
      <div className="flex flex-col gap-6 lg:gap-8">
        <DashboardBanner />
        <DashboardContent />
      </div>
    </LayoutWrapper>
  );
}
