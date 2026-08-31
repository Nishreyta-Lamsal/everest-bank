import type { Metadata } from 'next';
import { Inter, Anek_Devanagari } from 'next/font/google';

import Providers from '@/providers/providers';
import SiteChrome from '@/components/layouts/SiteChrome';
import Footer from '@/components/layouts/footer/Footer';
import Navbar from '@/components/layouts/navbar/Navbar';
import BottomNavigationBar from '@/components/layouts/navbar/BottomNavigationBar';
import SideFixedMenu from '@/components/shared/SideFixedMenu';

import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

const anekDevanagari = Anek_Devanagari({
  variable: '--font-anek-devanagari',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://everestbankltd.com'),
  title:
    'Everest Bank - Joint-venture Partner of Punjab National Bank (PNB) | One of the Best Commercial Bank in Nepal',
  description:
    'Catering to more than 14 lacs customers, Everest Bank Limited (EBL) is a name you can depend on for professionalized & efficient banking services. Founded in 1994, the Bank has been one of the leading banks of the country and has been catering its services to various segments of the society.',
  alternates: {
    canonical: 'https://everestbankltd.com/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://everestbankltd.com/',
    siteName: 'Everest Bank',
    title:
      'Everest Bank - Joint-venture Partner of Punjab National Bank (PNB) | One of the Best Commercial Bank in Nepal',
    description:
      'Catering to more than 14 lacs customers, Everest Bank Limited (EBL) is a name you can depend on for professionalized & efficient banking services. Founded in 1994, the Bank has been one of the leading banks of the country and has been catering its services to various segments of the society.',
  },
  twitter: {
    card: 'summary_large_image',
    title:
      'Everest Bank - Joint-venture Partner of Punjab National Bank (PNB) | One of the Best Commercial Bank in Nepal',
    description:
      'Catering to more than 14 lacs customers, Everest Bank Limited (EBL) is a name you can depend on for professionalized & efficient banking services. Founded in 1994, the Bank has been one of the leading banks of the country and has been catering its services to various segments of the society.',
  },
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${anekDevanagari.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col pb-14.5 lg:pb-0">
        <Providers>
          <SiteChrome>
            <Navbar />
          </SiteChrome>

          {children}

          <SiteChrome>
            <Footer />
            <SideFixedMenu />
            <BottomNavigationBar />
          </SiteChrome>
        </Providers>
      </body>
    </html>
  );
}
