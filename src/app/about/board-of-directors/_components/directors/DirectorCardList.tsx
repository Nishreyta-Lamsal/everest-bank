import DirectorCard from './DirectorCard';

import type { Director } from '../../_data/directors';

type DirectorCardListProps = {
  directors: Director[];
};

function groupByPosition(directors: Director[]) {
  const groups = directors.reduce<Record<number, Director[]>>((acc, item) => {
    const key = item.position;

    if (!acc[key]) acc[key] = [];

    acc[key].push(item);

    return acc;
  }, {});

  return Object.values(groups);
}

export default function DirectorCardList({ directors }: DirectorCardListProps) {
  const rows = groupByPosition(directors);

  return (
    <div className="flex w-full flex-col items-start gap-4">
      {rows.map((row) => (
        <DirectorCard key={row[0].id} directors={row} />
      ))}
    </div>
  );
}
