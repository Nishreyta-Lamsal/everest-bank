import LayoutWrapper from '@/components/layouts/wrapper/LayoutWrapper';
import FooterBottomBar from './FooterBottomBar';
import FooterLinksSection from './FooterLinksSection';
import FooterLinksSectionMobile from './FooterLinksSectionMobile';
import FooterMountainBanner from './FooterMountainBanner';
import FooterSupportSection from './FooterSupportSection';

export default function Footer() {
  return (
    <footer className="flex w-full flex-col items-start bg-white pt-15">
      <LayoutWrapper>
        <div className="flex w-full flex-col items-start gap-30">
          <FooterSupportSection />
          <FooterLinksSectionMobile />
          <div className="hidden w-full flex-col items-start gap-12 xl:flex">
            <FooterLinksSection />
            <FooterBottomBar />
          </div>
        </div>
      </LayoutWrapper>
      <FooterMountainBanner />
    </footer>
  );
}
