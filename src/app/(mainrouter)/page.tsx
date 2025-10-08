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
    </>
  );
};

export default HomePage;
