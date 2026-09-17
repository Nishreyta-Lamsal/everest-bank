import FolderCard from './FolderCard';

import type { MediaFolder } from '@/types/admin';

type FolderListProps = {
  folders: MediaFolder[];
};

export default function FolderList({ folders }: FolderListProps) {
  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
      {folders.map((folder) => (
        <FolderCard key={folder.id} folder={folder} />
      ))}
    </div>
  );
}
