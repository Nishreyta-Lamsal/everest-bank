import LayoutWrapper from '@/components/admin/layouts/wrapper/LayoutWrapper';
import PagesHeader from './_components/PagesHeader';
import PagesListCard from './_components/pages-list/PagesListCard';

export default function PagesPage() {
  return (
    <LayoutWrapper>
      <div className="flex w-full flex-col gap-6">
        <PagesHeader />
        <PagesListCard />
      </div>
    </LayoutWrapper>
  );
}
