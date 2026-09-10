import LayoutWrapper from '@/components/layouts/wrapper/LayoutWrapper';
import FooterBottomBar from './FooterBottomBar';
import FooterLinksSection from './FooterLinksSection';
import FooterLinksSectionMobile from './FooterLinksSectionMobile';
import FooterMountainBanner from './FooterMountainBanner';
import FooterSupportSection from './FooterSupportSection';

import { footerService } from '@/api/services/footer.service';

import { toFooterColumns, toFooterSocialLinks } from '@/lib/map-footer';
import { getQueryClient } from '@/lib/get-query-client';

import {
  footerBrandContent,
  footerLinkColumns,
  footerSocialLinks,
  footerSupportContent,
} from '@/data';

import type { FooterData } from '@/api/services/footer.service';

export const footerQueryKey = ['footer'] as const;

export default async function Footer() {
  const queryClient = getQueryClient();

  let footer: FooterData | undefined;

  try {
    const { data } = await queryClient.fetchQuery({
      queryKey: footerQueryKey,
      queryFn: () => footerService.getFooter(),
    });
    footer = data;
  } catch {
    footer = undefined;
  }

  const columns = footer ? toFooterColumns(footer) : footerLinkColumns;
  const socials = footer ? toFooterSocialLinks(footer) : footerSocialLinks;

  const support = footer
    ? {
        title: footer.support.title,
        description: footer.support.description,
        swiftCode: footer.support.swift_code,
        tollFreeNumber: footer.support.toll_free_number,
        callHref: footer.support.call_button_href ?? undefined,
        enquireHref: footer.support.enquire_button_href ?? undefined,
      }
    : footerSupportContent;

  const brand = footer
    ? {
        logoUrl: footer.brand.logo_url ?? undefined,
        appQrUrl: footer.brand.app_qr_url ?? undefined,
        appPromoLabel:
          footer.brand.app_promo_label || footerBrandContent.appPromoLabel,
      }
    : footerBrandContent;

  return (
    <footer className="flex w-full flex-col items-start bg-white pt-15">
      <LayoutWrapper>
        <div className="flex w-full flex-col items-start gap-30">
          <FooterSupportSection support={support} />
          <FooterLinksSectionMobile
            columns={columns}
            socials={socials}
            brand={brand}
          />
          <div className="hidden w-full flex-col items-start gap-12 xl:flex">
            <FooterLinksSection
              columns={columns}
              socials={socials}
              brand={brand}
            />
            <FooterBottomBar />
          </div>
        </div>
      </LayoutWrapper>
      <FooterMountainBanner imageUrl={footer?.banner.image_url ?? undefined} />
    </footer>
  );
}
