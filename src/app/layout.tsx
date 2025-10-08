// import "./globals.css";
// import { ThemeProvider } from "@/components/context/ThemeContext";
// import ProgressBar from "@/lib/progress/Progressbar";
// import { Suspense } from "react";
// import { AuthProvider } from "@/components/provider/MainProvider";
// import { getData } from "@/lib/fetch/getData";
// import type { Metadata, Viewport } from "next";
// import { SocialLinkResponse } from "@/types/helpline/helpline";

// export const metadata: Metadata = {
//   title:
//     "Free Fire Diamond Top Up BD: কমদামে দ্রুত UID রিচার্জ (Recharge) 24/7",
//   description:
//     "বাংলাদেশে Free Fire Diamond Top Up BD - কমদামে দ্রুত UID রিচার্জ 24/7। 100% Trusted, Secure ও Instant Delivery | FreeFireBD.com",
//   manifest: "/manifest.json",
//   alternates: {
//     canonical: `${process.env.NEXTAUTH_URL}`,
//   },
//   icons: {
//     icon: "/icon_favicon.png",
//   },
// };

// export const viewport: Viewport = {
//   themeColor: [
//     { media: "(prefers-color-scheme: light)", color: "#1E2131" },
//     { media: "(prefers-color-scheme: dark)", color: "#1E2131" },
//   ],
// };

// export default async function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   const { data: helpLine } = await getData<SocialLinkResponse>(`/help-line`);

//   return (
//     <html lang="en" suppressHydrationWarning>
//       <head>
//         <script />
//         <link rel="manifest" href="/manifest.json" />
//       </head>
//       <body className={`antialiased`}>
//         <ThemeProvider helpLine={helpLine}>
//           <Suspense fallback={null}>
//             <ProgressBar />
//           </Suspense>
//           <AuthProvider>{children}</AuthProvider>
//         </ThemeProvider>
//       </body>
//     </html>
//   );
// }



import "./globals.css";
import { ThemeProvider } from "@/components/context/ThemeContext";
import ProgressBar from "@/lib/progress/Progressbar";
import { Suspense } from "react";
import { AuthProvider } from "@/components/provider/MainProvider";
import { getData } from "@/lib/fetch/getData";
import type { Metadata, Viewport } from "next";
import { SocialLinkResponse } from "@/types/helpline/helpline";
import Script from "next/script"; // ✅ add this import

export const metadata: Metadata = {
  title:
    "Free Fire Diamond Top Up BD: কমদামে দ্রুত UID রিচার্জ (Recharge) 24/7",
  description:
    "বাংলাদেশে Free Fire Diamond Top Up BD - কমদামে দ্রুত UID রিচার্জ 24/7। 100% Trusted, Secure ও Instant Delivery | FreeFireBD.com",
  manifest: "/manifest.json",
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
        <link rel="manifest" href="/manifest.json" />

        {/* ✅ Structured Data JSON-LD Schema */}
        <Script
          id="store-schema"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Store",
              "name": "Free Fire BD",
              "url": "https://freefirebd.com",
              "logo": "https://freefirebd.com/logo.png",
              "image": "https://freefirebd.com/assets/banner.webp",
              "description":
                "FreeFireBD.com is Bangladesh's most trusted online gaming top-up store for Free Fire, PUBG UC, Mobile Legends, and other games. Enjoy instant delivery, safe payments, and 24/7 customer support.",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Mirpur 2",
                "addressLocality": "Dhaka",
                "postalCode": "1216",
                "addressCountry": "Bangladesh",
              },
              "telephone": "+8801700000000",
              "email": "support@freefirebd.com",
              "sameAs": [
                "https://facebook.com/freefirebd",
                "https://instagram.com/freefirebd",
                "https://www.youtube.com/@freefirebd",
              ],
              "priceRange": "৳৳",
              "openingHours": "Mo-Su 00:00-23:59",
              "makesOffer": [
                {
                  "@type": "Offer",
                  "priceCurrency": "BDT",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Free Fire Diamond Top-Up",
                    "description":
                      "Instant Free Fire diamond recharge in Bangladesh at the lowest price.",
                    "url": "https://freefirebd.com/free-fire-diamond-top-up",
                  },
                },
                {
                  "@type": "Offer",
                  "priceCurrency": "BDT",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "PUBG UC Top-Up",
                    "description":
                      "Buy PUBG Mobile UC quickly and securely from Free Fire BD.",
                    "url": "https://freefirebd.com/pubg-uc-top-up",
                  },
                },
                {
                  "@type": "Offer",
                  "priceCurrency": "BDT",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Mobile Legends Diamond Top-Up",
                    "description":
                      "Instant MLBB diamond recharge with fast delivery in Bangladesh.",
                    "url": "https://freefirebd.com/mlbb-top-up",
                  },
                },
              ],
            }),
          }}
        />
      </head>
      <body className="antialiased">
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
