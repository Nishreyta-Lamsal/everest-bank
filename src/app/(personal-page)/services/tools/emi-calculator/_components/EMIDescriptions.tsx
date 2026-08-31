import EMIDescriptionItem from './EMIDescriptionItem';

import { emiDescriptions } from '../_data/emi-descriptions';

export default function EMIDescriptions() {
  return (
    <div className="flex w-full flex-col items-start gap-10 lg:gap-13">
      {emiDescriptions.map((section) => (
        <EMIDescriptionItem key={section.title} section={section} />
      ))}
    </div>
  );
}
