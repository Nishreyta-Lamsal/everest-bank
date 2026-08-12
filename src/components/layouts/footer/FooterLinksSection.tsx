import FooterBrand from './FooterBrand';
import FooterLinkColumn from './FooterLinkColumn';
import FooterSocialColumn from './FooterSocialColumn';

import { footerLinkColumns } from '@/data';

export default function FooterLinksSection() {
  return (
    <div className="flex w-full items-start gap-33.5">
      <FooterBrand />
      <div className="flex items-start gap-17.5">
        <FooterLinkColumn column={footerLinkColumns[0]} className="w-38" />
        <FooterLinkColumn column={footerLinkColumns[1]} className="w-36" />
        <FooterLinkColumn column={footerLinkColumns[2]} className="w-44.5" />
        <FooterSocialColumn className="w-38.25" />
      </div>
    </div>
  );
}
