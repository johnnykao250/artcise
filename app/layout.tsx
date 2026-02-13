import type { Metadata } from 'next';
import { DM_Sans, Libre_Baskerville } from 'next/font/google';
import './globals.css';

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
});

const libreBaskerville = Libre_Baskerville({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-libre',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Artcise — Precise Art & Antiques Search',
  description: 'Precise, curated search for art, antiques, and collectibles. Results from top auction platforms.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${libreBaskerville.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
