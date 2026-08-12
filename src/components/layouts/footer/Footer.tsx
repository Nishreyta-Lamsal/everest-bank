import LayoutWrapper from '@/components/layouts/wrapper/LayoutWrapper';
import FooterBottomBar from './FooterBottomBar';
import FooterLinksSection from './FooterLinksSection';
import FooterMountainBanner from './FooterMountainBanner';
import FooterSupportSection from './FooterSupportSection';

export default function Footer() {
  return (
    <footer className="bg-white flex w-full flex-col items-start pt-15">
      <LayoutWrapper>
        <div className="flex w-full flex-col items-start gap-30">
          <FooterSupportSection />
          <div className="flex w-full flex-col items-start gap-12">
            <FooterLinksSection />
            <FooterBottomBar />
          </div>
        </div>
        <FooterMountainBanner />
      </LayoutWrapper>
    </footer>
  );
}
