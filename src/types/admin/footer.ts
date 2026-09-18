export type FooterColumnRead = {
  id: number;
  slug: string;
  label: string;
  label_ne?: string;
  position?: number;
  is_active?: boolean;
  links: FooterLinkRead[];
};

export type FooterLinkRead = {
  id: number;
  slug: string;
  label: string;
  label_ne?: string;
  href: string;
  opens_in_new_tab?: boolean;
  position?: number;
  is_visible?: boolean;
};

export type FooterSocialLinkRead = {
  id: number;
  slug: string;
  label: string;
  label_ne?: string;
  href: string;
  position?: number;
  is_visible?: boolean;
};

/** `slug` is derived from `label` when left out. */
export type FooterColumnWrite = {
  slug?: string;
  label: string;
  label_ne?: string;
  position?: number;
  is_active?: boolean;
};

export type FooterLinkWrite = {
  slug?: string;
  label: string;
  label_ne?: string;
  href: string;
  opens_in_new_tab?: boolean;
  position?: number;
  is_visible?: boolean;
};

export type FooterSocialLinkWrite = {
  slug?: string;
  label: string;
  label_ne?: string;
  href: string;
  position?: number;
  is_visible?: boolean;
};

/** Reads expose resolved `*_url`s; writes take media ids instead. */
export type FooterSettingsRead = {
  logo_url: string | null;
  app_qr_url: string | null;
  mountain_banner_url: string | null;
  app_promo_label: string;
  app_promo_label_ne?: string;
  support_title: string;
  support_title_ne?: string;
  support_description: string;
  support_description_ne?: string;
  swift_code: string;
  toll_free_number: string;
  call_button_href: string | null;
  enquire_button_href: string | null;
  updated_at: string;
};

export type FooterSettingsWrite = {
  logo_media?: number;
  app_qr_media?: number;
  mountain_banner_media?: number;
  app_promo_label?: string;
  app_promo_label_ne?: string;
  support_title?: string;
  support_title_ne?: string;
  support_description?: string;
  support_description_ne?: string;
  swift_code?: string;
  toll_free_number?: string;
  call_button_href?: string;
  enquire_button_href?: string;
};
