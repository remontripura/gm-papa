import MainContainer from "@/components/container/MainContainer";
import Banner from "@/components/homeComponents/Banner/Banner";
import Heading from "@/components/homeComponents/heading/Heading";
import HomaPageComponents from "@/components/homeComponents/HomePageComponents/HomePageComponents";
import WhyChooseUsPage from "@/components/homeComponents/whyChooseUs/WhyChooseUs";
import MobileWarning from "@/components/pwa/PwaPopup";
import CustomSkeleton from "@/components/shared/skelton/Skelton";
import { getData } from "@/lib/fetch/getData";
import { SliderResponse } from "@/types/bannerType/bannerType";
import type { Metadata } from "next";
import { Suspense } from "react";
import Script from "next/script"; // ✅ Needed for Schema injection

export async function generateMetadata(): Promise<Metadata> {
  return {
    title:
      "Free Fire Diamond Top Up BD: কমদামে দ্রুত UID রিচার্জ (Recharge) 24/7",
    description:
      "বাংলাদেশে Free Fire Diamond Top Up BD - কমদামে দ্রুত UID রিচার্জ 24/7। 100% Trusted, Secure ও Instant Delivery | FreeFireBD.com",
    openGraph: {
      title: "Free Fire Diamond Top Up BD - কমদামে দ্রুত UID রিচার্জ",
      description:
        "Instant Free Fire Diamond রিচার্জ করুন বাংলাদেশে। Trusted, Fast & Secure service 24/7।",
      url: "https://freefirebd.com/",
      siteName: "FreeFireBD.com",
      images: [
        {
          url: "/og_image.jpg",
          width: 1200,
          height: 630,
          alt: "Free Fire Diamond Top Up BD Banner",
        },
      ],
      locale: "bn_BD",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title:
        "Free Fire Diamond Top Up BD: কমদামে দ্রুত UID রিচার্জ (Recharge) 24/7",
      description:
        "বাংলাদেশে Free Fire Diamond Top Up BD - কমদামে দ্রুত UID রিচার্জ 24/7। 100% Trusted, Secure ও Instant Delivery | FreeFireBD.com",
      images: [
        {
          url: "/og_image.jpg",
          width: 1200,
          height: 630,
          alt: "Free Fire Diamond Top Up BD Banner",
        },
      ],
    },
  };
}

const HomePage = async () => {
  const bannerImage: SliderResponse = await getData("/slider-image", {
    next: { revalidate: 60 * 5 },
  });

  // ✅ Store Schema (your version, correctly formatted for JSON-LD)
  const schemaData = {
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
  };

  return (
    <>
      <Heading />
      <Banner bannerImage={bannerImage} />

      <Suspense
        fallback={
          <MainContainer className="grid md:grid-cols-6 grid-cols-3 gap-5 mt-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <CustomSkeleton
                key={index}
                count={1}
                height={230}
                width="full"
                color="#363559"
                highlightColor="#272640"
              />
            ))}
          </MainContainer>
        }
      >
        <HomaPageComponents />
      </Suspense>

      <WhyChooseUsPage />
      <MobileWarning />

      {/* ✅ Schema.org JSON-LD */}
      <Script
        id="store-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
    </>
  );
};

export default HomePage;
