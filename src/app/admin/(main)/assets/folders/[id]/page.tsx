import { notFound } from 'next/navigation';

import LayoutWrapper from '@/components/admin/layouts/wrapper/LayoutWrapper';
import FolderDetailsContent from './_components/FolderDetailsContent';

type FolderDetailsPageProps = {
  params: Promise<{ id: string }>;
};

export default async function FolderDetailsPage({
  params,
}: FolderDetailsPageProps) {
  const { id } = await params;
  const folderId = Number(id);

  if (!Number.isInteger(folderId)) {
    notFound();
  }

  return (
    <LayoutWrapper>
      <div className="flex w-full flex-col gap-6">
        <FolderDetailsContent folderId={folderId} />
      </div>
    </LayoutWrapper>
  );
}
