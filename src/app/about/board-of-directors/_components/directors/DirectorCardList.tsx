import DirectorCard from './DirectorCard';

import type { Director } from '../../_data/directors';

type DirectorCardListProps = {
  rows: Director[][];
};

export default function DirectorCardList({ rows }: DirectorCardListProps) {
  return (
    <div className="flex w-full flex-col items-start gap-4">
      {rows.map((row) => (
        <DirectorCard key={row[0].id} directors={row} />
      ))}
    </div>
  );
}
