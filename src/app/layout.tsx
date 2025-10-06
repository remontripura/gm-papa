import "./globals.css";
import { ThemeProvider } from "@/components/context/ThemeContext";
import ProgressBar from "@/lib/progress/Progressbar";
import { Suspense } from "react";
import { AuthProvider } from "@/components/provider/MainProvider";
import { getData } from "@/lib/fetch/getData";
import type { Metadata, Viewport } from "next";
import { SocialLinkResponse } from "@/types/helpline/helpline";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title:
    "Free Fire Diamond Top Up BD: কমদামে দ্রুত UID রিচার্জ (Recharge) 24/7",
  description:
    "বাংলাদেশে Free Fire Diamond Top Up BD - কমদামে দ্রুত UID রিচার্জ 24/7। 100% Trusted, Secure ও Instant Delivery | FreeFireBD.com",
  manifest: "/manifest.json",
  icons: {
    icon: "./og_image.jpg",
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
