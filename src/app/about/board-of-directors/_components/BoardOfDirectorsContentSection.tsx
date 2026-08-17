import LayoutWrapper from '@/components/layouts/wrapper/LayoutWrapper';
import ContentSidebar from '@/components/shared/content/ContentSidebar';
import ContentQuote from '@/components/shared/content/ContentQuote';
import DirectorCardList from './directors/DirectorCardList';

import { directorCardRows } from '../_data/directors';
import { relatedPages } from '../_data/related-pages';
import { boardOfDirectorsSocialLinks } from '../_data/social-links';

export default function BoardOfDirectorsContentSection() {
  return (
    <section className="w-full py-16 lg:py-24">
      <LayoutWrapper>
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between">
          <article className="flex w-full max-w-[750px] flex-col items-start gap-10 lg:gap-13.5">
            <DirectorCardList rows={directorCardRows} />

            <ContentQuote title="“Consistent, strong and dependable: दिगो, दरिलो, विश्वासिलो.”" />
          </article>

          <ContentSidebar
            links={relatedPages}
            socialLinks={boardOfDirectorsSocialLinks}
          />
        </div>
      </LayoutWrapper>
    </section>
  );
}
