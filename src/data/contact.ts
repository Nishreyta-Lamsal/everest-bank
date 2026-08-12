export type ContactHelpTopic = {
  title: string;
  description: string;
  linkLabel: string;
  href: string;
};

export const contactHelpTopics: ContactHelpTopic[] = [
  {
    title: 'Need help with your account?',
    description:
      'Our customer support team is available to assist you with banking services, account access, digital banking, and everyday financial needs.',
    linkLabel: 'Call for support',
    href: 'tel:+9779851074410',
  },
  {
    title: 'Looking for quick answers?',
    description:
      'Browse frequently asked questions, banking guides, and helpful resources to quickly find information and support online.',
    linkLabel: 'See FAQs',
    href: '#',
  },
];
