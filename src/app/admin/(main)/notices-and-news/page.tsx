import LayoutWrapper from '@/components/admin/layouts/wrapper/LayoutWrapper';
import NoticesAndNewsHeader from './_components/NoticesAndNewsHeader';
import NoticesAndNewsContent from './_components/NoticesAndNewsContent';

export default function NoticesAndNewsPage() {
  return (
    <LayoutWrapper>
      <div className="flex w-full flex-col gap-6">
        <NoticesAndNewsHeader />
        <NoticesAndNewsContent />
      </div>
    </LayoutWrapper>
  );
}
