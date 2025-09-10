import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/context/ThemeContext";
import ProgressBar from "@/lib/progress/Progressbar";
import { Suspense } from "react";
import { AuthProvider } from "@/components/provider/MainProvider";
import { getData } from "@/lib/fetch/getData";
import type { Metadata, Viewport } from "next";
import MobileWarning from "@/components/pwa/PwaPopup";
import { SocialLinkResponse } from "@/types/helpline/helpline";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GM-Papa | Home",
  description: "Gaming topup",
  manifest: "/manifest.json",
  icons: {
    icon: "https://png.pngtree.com/element_our/png/20181227/buildequipmentfablabtools-white-glyph-icon-in-circle--ve-png_287050.jpg",
  },
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data: helpLine } = await getData<SocialLinkResponse>(`/help-line`);

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider helpLine={helpLine}>
          <Suspense fallback={null}>
            <ProgressBar />
          </Suspense>
          <AuthProvider>{children}</AuthProvider>
          <MobileWarning />
        </ThemeProvider>
      </body>
    </html>
  );
}
