// ProductDescription.tsx
import { getData } from "@/lib/fetch/getData";
import RatingAndReview from "../ratings/RatingsAndReview";
import { IGameRes } from "@/types/productsDataType/SingleProductType";

export default async function ProductDescription({
  slug,
  pageNumber,
}: {
  slug: string;
  pageNumber: string | undefined;
}) {
  const { data: singleProduct } = await getData<IGameRes>(`/product/${slug}`);

  return (
    <div className="mt-5 border-t px-3 pb-5">
      <RatingAndReview slug={slug} pageNumber={pageNumber} />
      <div className="md:w-2/3 w-full">
        <h6 className="font-medium mt-5 text-[20px] mb-3">Game Description</h6>
        <div
          dangerouslySetInnerHTML={{ __html: singleProduct.description }}
        ></div>
      </div>
    </div>
  );
}
