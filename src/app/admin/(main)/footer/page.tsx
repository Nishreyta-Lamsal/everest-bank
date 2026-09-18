import LayoutWrapper from '@/components/admin/layouts/wrapper/LayoutWrapper';
import { FooterDraftProvider } from './_components/FooterDraftContext';
import FooterSettingsCard from './_components/FooterSettingsCard';
import FooterColumnsCard from './_components/FooterColumnsCard';
import FooterSocialCard from './_components/FooterSocialCard';
import FooterSaveBar from './_components/FooterSaveBar';

export default function FooterPage() {
  return (
    <LayoutWrapper>
      <FooterDraftProvider>
        <div className="flex w-full flex-col gap-6">
          <section className="flex w-full items-center justify-between">
            <div className="flex flex-col gap-1">
              <p className="text-heading-3 text-neutral-900">Footer</p>
              <p className="text-paragraph-sm text-neutral-700">
                The link columns, social links and brand details shown at the
                bottom of every page. Changes apply once saved.
              </p>
            </div>
          </section>

          <FooterSettingsCard />
          <FooterColumnsCard />
          <FooterSocialCard />
          <FooterSaveBar />
        </div>
      </FooterDraftProvider>
    </LayoutWrapper>
  );
}
