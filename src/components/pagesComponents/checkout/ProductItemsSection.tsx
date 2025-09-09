// ProductItemsSection.tsx
import SingleProductComponents from "@/components/pagesComponent/checkout/SingleProductComponents";
import { getData } from "@/lib/fetch/getData";

export default async function ProductItemsSection({ slug }: { slug: string }) {
  const { data: singleProduct } = await getData(`/product/${slug}`);

  // Client Component-এ props পাঠাচ্ছি
  return <SingleProductComponents singleProduct={singleProduct} />;
}
