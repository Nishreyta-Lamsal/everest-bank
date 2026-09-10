import FooterBrand from './FooterBrand';
import FooterLinkColumn from './FooterLinkColumn';
import FooterSocialColumn from './FooterSocialColumn';

import type { FooterSectionProps } from '@/types';

const columnWidths = ['w-[152px]', 'w-[144px]', 'w-[178px]'];

export default function FooterLinksSection({
  columns,
  socials,
  brand,
}: FooterSectionProps) {
  return (
    <div className="flex w-full items-start gap-33.5">
      <FooterBrand content={brand} />
      <div className="flex items-start gap-17.5">
        {columns.map((column, index) => (
          <FooterLinkColumn
            key={column.title}
            column={column}
            className={columnWidths[index] ?? 'w-[152px]'}
          />
        ))}
        <FooterSocialColumn links={socials} className="w-[153px]" />
      </div>
    </div>
  );
}
