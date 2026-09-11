export type PageSectionSlide = {
  id: string;
  label: string;
  active?: boolean;
};

export type PageSectionAction = {
  id: string;
  label: string;
  icon: 'plus' | 'video';
};

export type PageSection = {
  id: string;
  label: string;
  slides?: PageSectionSlide[];
  actions?: PageSectionAction[];
};

export const pageSectionsBySlug: Record<string, PageSection[]> = {
  'personal-banking': [
    {
      id: 'hero',
      label: 'Hero',
      slides: [
        { id: 'slide-1', label: 'Consistent, Dependable', active: true },
        { id: 'slide-2', label: 'Financial Banking Made Simple' },
      ],
      actions: [
        { id: 'add-slide', label: 'Add new slide', icon: 'plus' },
        { id: 'video', label: 'Video', icon: 'video' },
      ],
    },
    { id: 'quick-actions', label: 'Quick Actions' },
    { id: 'product-card', label: 'Product Card' },
    { id: 'cards', label: 'Cards' },
    { id: 'app-promo', label: 'App Promo' },
    { id: 'csr-highlights', label: 'CSR Highlights' },
    { id: 'stat-band', label: 'Stat Band' },
    { id: 'news-updates', label: 'News & Updates' },
    { id: 'contact-band', label: 'Contact Band' },
    { id: 'footer', label: 'Footer' },
  ],
};
