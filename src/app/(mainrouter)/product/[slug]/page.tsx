// app/product/[slug]/page.tsx
import { Suspense } from "react";
import { getData } from "@/lib/fetch/getData";
import MainContainer from "@/components/container/MainContainer";
import SingleProductComponents from "@/components/pagesComponents/checkout/SingleProductComponents";
import ProductHeader from "@/components/pagesComponents/checkout/ProductHeader";
import PriceAction from "@/components/pagesComponents/checkout/PriceAction";
import ProductDescription from "@/components/pagesComponents/checkout/ProductDescription";
import CustomSkeleton from "@/components/shared/skelton/Skelton";
import { Metadata } from "next";
import { IGameRes } from "@/types/productsDataType/SingleProductType";

interface PageProps {
  params: { slug: string };
  searchParams: Promise<{ page?: string }>;
}

// Dynamic metadata

// export async function generateMetadata({
//   params,
// }: PageProps): Promise<Metadata> {
//   const { data: singleProduct } = await getData<IGameRes>(
//     `/product/${params.slug}`
//   );

//   // 🔑 Common SEO keyword (use in both title & description)
//   const fallbackKeyword = "Free Fire Diamond Top Up BD";

//   // 🧩 Helper function to ensure keyword presence
//   const ensureKeyword = (text: string | undefined, keyword: string) => {
//     if (!text) return keyword;
//     return text.toLowerCase().includes(keyword.toLowerCase())
//       ? text
//       : `${text} | ${keyword}`;
//   };

//   // 🏷️ Title: make sure keyword always exists
//   const title = ensureKeyword(
//     singleProduct?.seo_title ||
//       `${singleProduct?.name || fallbackKeyword} - Buy & Recharge Instantly`,
//     fallbackKeyword
//   );

//   // 📝 Description: ensure keyword presence too
//   const description = ensureKeyword(
//     singleProduct?.seo_description ||
//       `Buy ${singleProduct?.name || fallbackKeyword} safely in Bangladesh. ${fallbackKeyword} offers cheap and fast UID recharge 24/7.`,
//     fallbackKeyword
//   );

//   // 🖼️ OG Image (fallback safe)
//   const ogImage = singleProduct?.image
//     ? `${process.env.NEXT_PUBLIC_MAIN_BASE}/${singleProduct.image}`
//     : "/og_image.jpg";

//   // 🌐 Base URL fallback (prevent undefined)
//   const baseUrl = process.env.NEXTAUTH_URL || "https://freefirebd.com";

//   return {
//     metadataBase: new URL(baseUrl),
//     title,
//     description,
//     alternates: {
//       canonical: `${baseUrl}/product/${params.slug}`,
//     },
//     openGraph: {
//       title,
//       description,
//       url: `${baseUrl}/product/${params.slug}`,
//       siteName: "FreeFireBD.com",
//       images: [
//         {
//           url: ogImage,
//           width: 1200,
//           height: 630,
//           alt: `${singleProduct?.name || fallbackKeyword} Banner`,
//         },
//       ],
//       locale: "bn_BD",
//       type: "website",
//     },
//     twitter: {
//       card: "summary_large_image",
//       title,
//       description,
//       images: [ogImage],
//     },
//   };
// }

export const metadata: Metadata = {
  title:
    "Free Fire Diamond Top Up BD: কমদামে দ্রুত UID রিচার্জ (Recharge) 24/7",
  description:
    "বাংলাদেশে Free Fire Diamond Top Up BD - কমদামে দ্রুত UID রিচার্জ 24/7 । 100% Trusted, Secure ও Instant Delivery | FreeFireBD.com",
  manifest: "/manifest.json",
  keywords:
    "Free Fire Diamond Top Up BD, Free Fire Top Up Bangladesh, cheap Free Fire diamond, FreeFireBD, UID recharge",
  alternates: {
    canonical: `${process.env.NEXTAUTH_URL}`,
  },
  icons: {
    icon: "/icon_favicon.png",
  },
};

export default async function ProductSlug({ params, searchParams }: PageProps) {
  const { data: singleProduct } = await getData<IGameRes>(
    `/product/${params.slug}`
  );
  const { page } = (await searchParams) ?? { page: "1" };

  return (
    <div>
      <MainContainer>
        <div className="grid grid-cols-12 gap-3 px-3 md:pt-6">
          <div className="md:col-span-8 col-span-12">
            <Suspense
              fallback={
                <CustomSkeleton
                  count={3}
                  height={30}
                  width="full"
                  color="#45556C"
                />
              }
            >
              <ProductHeader singleProduct={singleProduct} />
            </Suspense>
            <Suspense
              fallback={
                <CustomSkeleton
                  count={3}
                  height={30}
                  width="full"
                  color="#45556C"
                />
              }
            >
              <PriceAction singleProduct={singleProduct} />
            </Suspense>
          </div>
          <Suspense
            fallback={
              <CustomSkeleton
                count={3}
                height={30}
                width="full"
                color="#45556C"
              />
            }
          >
            <SingleProductComponents singleProduct={singleProduct} />
          </Suspense>
        </div>
        <Suspense
          fallback={
            <CustomSkeleton
              count={3}
              height={30}
              width="full"
              color="#45556C"
            />
          }
        >
          <ProductDescription slug={params.slug} pageNumber={page} />
        </Suspense>
      </MainContainer>
    </div>
  );
}
