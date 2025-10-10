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

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { data: singleProduct } = await getData<IGameRes>(
    `/product/${params.slug}`
  );

  // ✅ Common keyword (use this for both title & description)
  const fallbackKeyword = "Free Fire Diamond Top Up BD";

  // ✅ Build Title — includes the keyword naturally
  const title =
    singleProduct?.seo_title ||
    `${
      singleProduct?.name || fallbackKeyword
    } - ${fallbackKeyword} | Buy & Recharge Instantly`;

  // ✅ Build Description — repeats main keyword once naturally
  const description =
    singleProduct?.seo_description ||
    `Buy ${
      singleProduct?.name || fallbackKeyword
    } safely in Bangladesh. ${fallbackKeyword} offers cheap and fast UID recharge 24/7.`; // <-- keyword repeated

  // ✅ Open Graph Image fallback
  const ogImage = singleProduct?.image
    ? `${process.env.NEXT_PUBLIC_MAIN_BASE}/${singleProduct.image}`
    : "/og_image.jpg";

  return {
    metadataBase: new URL(process.env.NEXTAUTH_URL ?? ""),
    title,
    description,
    alternates: {
      canonical: `${process.env.NEXTAUTH_URL}/product/${params.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `${process.env.NEXTAUTH_URL}/product/${params.slug}`,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${singleProduct?.name || fallbackKeyword} Banner`,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}
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
