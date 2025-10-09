import "./globals.css";
import { ThemeProvider } from "@/components/context/ThemeContext";
import ProgressBar from "@/lib/progress/Progressbar";
import { Suspense } from "react";
import { AuthProvider } from "@/components/provider/MainProvider";
import { getData } from "@/lib/fetch/getData";
import type { Metadata, Viewport } from "next";
import { SocialLinkResponse } from "@/types/helpline/helpline";

export const metadata: Metadata = {
  title:
    "Free Fire Diamond Top Up BD: কমদামে দ্রুত UID রিচার্জ (Recharge) 24/7",
  description:
    "বাংলাদেশে Free Fire Diamond Top Up BD - কমদামে দ্রুত UID রিচার্জ 24/7। 100% Trusted, Secure ও Instant Delivery | FreeFireBD.com",
  manifest: "/manifest.json",
  keywords:
    "Free Fire top up Bangladesh, freefirebd, cheap diamond top up, gaming offers",
  alternates: {
    canonical: `${process.env.NEXTAUTH_URL}`,
  },
  icons: {
    icon: "/icon_favicon.png",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#1E2131" },
    { media: "(prefers-color-scheme: dark)", color: "#1E2131" },
  ],
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
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={`antialiased`}>
        <ThemeProvider helpLine={helpLine}>
          <Suspense fallback={null}>
            <ProgressBar />
          </Suspense>
          <AuthProvider>{children}</AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
