// ProductItemsSection.tsx
import { getData } from "@/lib/fetch/getData";
import SingleProductComponents from "./SingleProductComponents";
import { IGameRes } from "@/types/productsDataType/SingleProductType";

export default async function ProductItemsSection({ slug }: { slug: string }) {
  const { data: singleProduct } = await getData<IGameRes>(`/product/${slug}`);

  // Client Component-এ props পাঠাচ্ছি
  return <SingleProductComponents singleProduct={singleProduct} />;
}
