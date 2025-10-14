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

  const productName = singleProduct?.name || "Free Fire Diamond Top Up BD";
  const seoTitle =
    singleProduct?.seo_title || `${productName} - Free Fire Diamond Top Up BD`;
  const seoDescription =
    singleProduct?.seo_description ||
    `Buy ${productName} at the best price in Bangladesh. Instant Free Fire Diamond Top Up available 24/7.`;
  const seoKeywords =
    singleProduct?.seo_keywords ||
    "Free Fire Diamond Top Up BD, FF Diamond Recharge Bangladesh, Instant UID Top Up";

  return {
    title: seoTitle,
    description: seoDescription,
    alternates: {
      canonical: `${process.env.NEXTAUTH_URL}/product/${params.slug}`,
    },
    keywords: seoKeywords,
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_MAIN_BASE}/${singleProduct?.image}`,
          width: 1200,
          height: 630,
          alt: `${productName} - Free Fire Diamond Top Up BD`,
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

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: singleProduct?.name,
    image: `${process.env.NEXT_PUBLIC_MAIN_BASE}/${singleProduct?.image}`,
    description:
      singleProduct?.seo_description ||
      `Buy ${singleProduct?.name} at the best price in Bangladesh.`,
    sku: singleProduct?.slug,
    brand: {
      "@type": "Brand",
      name: "Free Fire BD",
    },
    offers: {
      "@type": "Offer",
      url: `${process.env.NEXTAUTH_URL}/product/${singleProduct?.slug}`,
      priceCurrency: "BDT",
      price: singleProduct?.items[0],
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
    },
  };

  return (
    <>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(productSchema),
          }}
        />
      </head>

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
    </>
  );
}
