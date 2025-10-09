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

  // Default fallback keyword for SEO
  const fallbackKeyword = "Free Fire Diamond Top Up BD";

  // Build safe title
  const title =
    singleProduct?.seo_title ||
    `${singleProduct?.name || fallbackKeyword} | ${fallbackKeyword}`;

  // Build safe description
  const description =
    singleProduct?.seo_description ||
    `${fallbackKeyword} - বাংলাদেশে কমদামে দ্রুত UID রিচার্জ করুন 24/7।`;

  // Build safe keywords
  const keywords = singleProduct?.seo_keywords
    ? `${singleProduct.seo_keywords}, ${fallbackKeyword}`
    : `${fallbackKeyword}, Free Fire top up Bangladesh, cheap diamond top up`;

  return {
    title,
    description,
    alternates: {
      canonical: `${process.env.NEXTAUTH_URL}/product/${params.slug}`,
    },
    keywords,
    openGraph: {
      title,
      description,
      images: [
        {
          url: singleProduct?.image
            ? `${process.env.NEXT_PUBLIC_MAIN_BASE}/${singleProduct.image}`
            : "/og_image.jpg",
          width: 1200,
          height: 630,
          alt: `${fallbackKeyword} Banner`,
        },
      ],
      type: "website",
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
