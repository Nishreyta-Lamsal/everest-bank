'use client';

import FolderDetailsHeader from './FolderDetailsHeader';
import FolderMediaCard from './FolderMediaCard';

import {
  useMediaFolder,
  useMediaList,
} from '@/hooks/api/admin/use-media-library';

type FolderDetailsContentProps = {
  folderId: number;
};

export default function FolderDetailsContent({
  folderId,
}: FolderDetailsContentProps) {
  const folderQuery = useMediaFolder(folderId);

  // Just the newest item, for the "last upload" line in the header.
  const latestQuery = useMediaList({
    folder: folderId,
    ordering: '-created_at',
    page_size: 1,
  });

  if (folderQuery.isPending) {
    return (
      <div className="h-[120px] w-full animate-pulse rounded-[8px] bg-slate-100" />
    );
  }

  if (folderQuery.isError || !folderQuery.data) {
    return (
      <p className="py-10 text-center text-[13px] text-neutral-700/68">
        Could not load this folder.
      </p>
    );
  }

  return (
    <>
      <FolderDetailsHeader
        folder={folderQuery.data}
        lastUploadAt={latestQuery.data?.results[0]?.created_at}
      />

      <FolderMediaCard folderId={folderId} />
    </>
  );
}
