import LayoutWrapper from '@/components/admin/layouts/wrapper/LayoutWrapper';
import AssetsHeader from './_components/AssetsHeader';
import RecentFilesCard from './_components/recent-files/RecentFilesCard';
import FoldersCard from './_components/folders/FoldersCard';
import StorageUsageCard from './_components/storage/StorageUsageCard';
import MostReusedCard from './_components/MostReusedCard';
import MediaDndProvider from './_components/dnd/MediaDndProvider';

export default function AssetsPage() {
  return (
    <LayoutWrapper>
      <div className="flex w-full flex-col gap-6">
        <AssetsHeader />

        <MediaDndProvider>
          <div className="grid grid-cols-1 gap-2 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <RecentFilesCard />
            </div>

            <div className="flex flex-col gap-2 lg:col-span-1">
              <FoldersCard />
              <StorageUsageCard />
              <MostReusedCard />
            </div>
          </div>
        </MediaDndProvider>
      </div>
    </LayoutWrapper>
  );
}
