import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Head from "next/head";
import { GSAPWrapper } from '@/components/providers/gsap-wrapper';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vignesh Raj R | UX Engineer",
  description: "Interactive cinematic experience of a UX Engineer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased selection:bg-cyan-500/20 selection:text-cyan-200`}
      suppressHydrationWarning
    >
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap" rel="stylesheet" />
      </Head>
      <body className="bg-black text-white" suppressHydrationWarning>
        <a href="#main-content" className="skip-link">Skip to main content</a>
        <GSAPWrapper>
          {children}
        </GSAPWrapper>
      </body>
    </html>
  );
}
