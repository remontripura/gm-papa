// ProductDescription.tsx
import { getData } from "@/lib/fetch/getData";
import { IGameRes } from "@/types/procutsDataType/SingleProductType";
import RatingAndReview from "../ratings/RatingsAndReview";

export default async function ProductDescription({ slug }: { slug: string }) {
  const { data: singleProduct } = await getData<IGameRes>(`/product/${slug}`);

  return (
    <div className="mt-5 border-t px-3 pb-5">
      <RatingAndReview />
      <div className="md:w-2/3 w-full">
        <h6 className="font-medium mt-5 text-[20px] mb-3">Game Description</h6>
        <div
          dangerouslySetInnerHTML={{ __html: singleProduct.description }}
        ></div>
      </div>
    </div>
  );
}
