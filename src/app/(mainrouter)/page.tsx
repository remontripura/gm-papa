import type { Metadata } from "next";
import { getData } from "@/lib/fetch/getData";
import Banner from "@/components/homeComponents/Banner/Banner";
import WhyChooseUsPage from "@/components/homeComponents/whyChooseUs/WhyChooseUs";
import { Suspense } from "react";
import MainContainer from "@/components/container/MainContainer";
import CustomSkeleton from "@/components/shared/skelton/Skelton";
import { SliderResponse } from "@/types/bannerType/bannerType";
import Heading from "@/components/homeComponents/heading/Heading";
import { ICategory } from "@/types/productsDataType/productsDataType";
import HomaPageComponents from "@/components/homeComponents/HomePageComponents/HomePageComponents";

export async function generateMetadata(): Promise<Metadata> {
  const { data }: { data: ICategory[] } = await getData("/products");
  const categoryNames = data.map((cat) => cat.name).join(", ");
  const productNames = data.flatMap((cat) => cat.products.map((p) => p.name));

  const firstImage =
    data.length > 0 && data[0].products.length > 0
      ? data[0].products[0].image
      : "/default-image.png";

  return {
    title: "Buy Popular Gaming Products | Gmpapa",
    description: `Explore gaming categories: ${categoryNames}. Top games: ${productNames.join(
      ", "
    )}.`,
    openGraph: {
      title: "Gaming Products | Gmpapa",
      description: `Shop items for games like ${productNames.join(", ")}.`,
      images: [firstImage],
    },
    twitter: {
      card: "summary_large_image",
      title: "Buy Gaming Products Online",
      description: `Top-up products available for ${productNames.join(", ")}.`,
      images: [firstImage],
    },
  };
}
const HomePage = async () => {
  // const { data }: { data: ICategory[] } = await getData("/products", {
  //   next: { revalidate: 60 },
  // });
  const bannerImage: SliderResponse = await getData("/slider-image", {
    cache: "force-cache",
  });
  // console.log(bannerImage)
  // const cookieStore = await cookies();
  // const token = cookieStore.get("gmpapa_token")?.value;
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
    </>
  );
};

export default HomePage;
