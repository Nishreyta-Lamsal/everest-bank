import AboutLinkList from './AboutLinkList';

import { aboutLinkCards } from '../../_data';

export default function AboutLinksSection() {
  return (
    <section className="bg-grey-bluish-grey w-full py-16 lg:pt-[120px] lg:pb-[60px]">
      <AboutLinkList cards={aboutLinkCards} />
    </section>
  );
}
