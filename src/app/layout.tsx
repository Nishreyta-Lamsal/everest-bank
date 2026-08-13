import type { Metadata } from 'next';
import { Inter, Anek_Devanagari } from 'next/font/google';

import Footer from '@/components/layouts/footer/Footer';
import Navbar from '@/components/layouts/navbar/Navbar';
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
  title: 'Everest bank',
  description: '',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${anekDevanagari.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <Navbar />
        {children}
        <Footer />
        <SideFixedMenu />
      </body>
    </html>
  );
}
