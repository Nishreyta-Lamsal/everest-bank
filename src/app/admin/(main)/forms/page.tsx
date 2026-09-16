import LayoutWrapper from '@/components/admin/layouts/wrapper/LayoutWrapper';
import FormsHeader from './_components/FormsHeader';
import FormsListCard from './_components/forms-list/FormsListCard';

export default function FormsPage() {
  return (
    <LayoutWrapper>
      <div className="flex w-full flex-col gap-6">
        <FormsHeader />
        <FormsListCard />
      </div>
    </LayoutWrapper>
  );
}
