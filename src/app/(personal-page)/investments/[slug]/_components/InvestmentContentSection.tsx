import LayoutWrapper from '@/components/layouts/wrapper/LayoutWrapper';
import ContentSidebar from '@/components/shared/content/ContentSidebar';
import InvestmentBodyBlock from './InvestmentBodyBlock';

import { investmentBodyBlocks, relatedPages } from '../_data';

export default function InvestmentContentSection() {
  return (
    <section className="w-full py-12 lg:py-[88px]">
      <LayoutWrapper>
        <div className="flex w-full flex-col items-start gap-12 lg:flex-row lg:gap-[108px]">
          <div className="flex w-full flex-col items-start gap-8 lg:max-w-[751px] lg:gap-[54px]">
            {investmentBodyBlocks.map((block) => (
              <InvestmentBodyBlock key={block.heading} block={block} />
            ))}
          </div>

          <ContentSidebar links={relatedPages} />
        </div>
      </LayoutWrapper>
    </section>
  );
}
