"use client";

import RatingsLine from "./RatingLine";
import ReviewLine from "./ReviewLine";
import Image from "next/image";
import { Star, User } from "lucide-react";
import { useGetData } from "@/lib/fetch/useGetData";
import { addReview, ReviewResponse } from "@/types/review_type/reviewType";
import StarRating from "./StarRatings";
import { timeAgo } from "@/lib/time_count/time_count";
import { GenericForm, GenericFormRef } from "@/components/Form/GenericForm";
import { reviewSchema } from "@/schema/reviewSchema/reviewSchema";
import z from "zod";
import { useRef, useState } from "react";
import { LoadingButton } from "@/components/shared/submitButton/submitButton";
import { cn } from "@/lib/utils";
import { TextareaField } from "@/components/Form/fields/TextAreaField";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios/AxiosInstance";
import { AxiosError } from "axios";
import {
  showErrorAlert,
  showSuccessAlert,
} from "@/components/shared/toast/ToastModal";
import Cookies from "js-cookie";
import Pagination from "@/components/shared/Pagination/Pagination";

type FormType = z.infer<typeof reviewSchema>;

const initialValues: FormType = {
  review: "",
};

const RatingAndReview = ({
  slug,
  pageNumber,
}: {
  slug: string;
  pageNumber: string | undefined;
}) => {
  const decodedSlug = decodeURIComponent(slug);
  const formRef = useRef<GenericFormRef<FormType>>(null);
  const [selectedRating, setSelectedRating] = useState<number>(0);
  const token = Cookies.get("GM_T");
  console.log(pageNumber);
  const { data: review, refetch } = useGetData<ReviewResponse>(
    ["review", pageNumber],
    `/review/${decodedSlug}?page=${pageNumber}`
  );
  const { mutate, isPending } = useMutation({
    mutationFn: async (data: FormType) => {
      const finalData = {
        ...data,
        product_id: decodedSlug,
        rating: selectedRating,
      };
      const response = await axiosInstance.post<addReview>(
        `/add-review`,
        finalData
      );
      return response.data;
    },
    onSuccess: (data: addReview) => {
      if (data.success === true) {
        showSuccessAlert(data.message);
        refetch();
        setSelectedRating(0);
        formRef.current?.reset();
      } else {
        showErrorAlert(data.message);
      }
    },
    onError: (
      err: AxiosError<{ message: { message: string } }> & {
        message: { message: string };
      }
    ) => {
      showErrorAlert(err.message.message || "Something went wrong!");
    },
  });
  const totalReviews = Object.values(review?.rating_breakdown ?? {}).reduce(
    (sum, val) => sum + val,
    0
  );

  const handleSubmit = (data: FormType | React.FormEvent<HTMLFormElement>) => {
    if (selectedRating === 0) {
      showErrorAlert("Please select a rating before submitting.");
      return;
    }
    mutate(data as FormType);
  };

  return (
    <>
      {/* Only show form if user is logged in */}
      {token && (
        <div className="mt-5">
          <h6 className="font-medium text-[18px]">Rate this product</h6>
          <p className="text-[14px]">Tell others what you think.</p>
          <GenericForm
            schema={reviewSchema}
            initialValues={initialValues}
            onSubmit={handleSubmit}
            ref={formRef}
          >
            {/* Star Ratings */}
            <div className="flex items-center gap-2 mt-5">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={32}
                  className={`cursor-pointer ${
                    star <= selectedRating
                      ? "text-[#A46BFF] fill-[#A46BFF]"
                      : "text-gray-400"
                  }`}
                  onClick={() => setSelectedRating(star)}
                />
              ))}
            </div>

            {/* Message Input */}
            <div className="mt-5">
              <TextareaField
                label="Message"
                name="review"
                placeholder="Write message"
                inputClassName="form-input"
              />
            </div>

            {/* Submit Button */}
            <LoadingButton
              disabled={isPending}
              className={cn("button-color w-full mt-3")}
              type="submit"
            >
              {isPending ? "Processing..." : "Review"}
            </LoadingButton>
          </GenericForm>
        </div>
      )}

      {/* Reviews List */}
      <div className="mt-5 p-3 bg-mainlight rounded-lg">
        <h6 className="text-2xl mb-2 font-semibold">Reviews</h6>
        <div className="flex md:flex-row flex-col items-start gap-4">
          <div className="flex md:flex-col flex-row items-center justify-center md:gap-0 gap-5">
            <h6 className="text-[44px] font-semibold">
              {review?.average_rating}
            </h6>
            <div className="flex flex-col justify-center items-center">
              <RatingsLine ratingsNumber={review?.average_rating ?? 0} />
              <p>{review?.total_reviews} Ratings</p>
            </div>
          </div>
          <div>
            <div>
              {([5, 4, 3, 2, 1] as const).map((num) => (
                <ReviewLine
                  key={num}
                  rate={
                    totalReviews > 0
                      ? ((review?.rating_breakdown[num] ?? 0) / totalReviews) *
                        100
                      : 0
                  }
                  number={num}
                  people={(review?.rating_breakdown[num] ?? 0).toString()}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Review Cards */}
        {review?.reviews.data.map((item) => (
          <div
            key={item.id}
            className="mt-6 p-3 shadow-sm border-b border-[#ffffff3a]"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {item.user.image ? (
                  <div className="size-10 p-1 border border-gray-400 rounded-full flex justify-center items-center">
                    <Image
                      src={item?.user?.image}
                      alt="profile"
                      width={40}
                      height={40}
                      className="rounded-full size-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="size-10 p-1 border border-gray-400 rounded-full flex justify-center items-center">
                    <User className="size-full" />
                  </div>
                )}

                <div>
                  <h6 className="font-semibold">{item.user.name}</h6>
                  <p className="text-sm">{timeAgo(item.created_at)}</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <span className="font-bold text-lg">{item.rating}</span>
                <StarRating rating={item.rating} />
              </div>
            </div>
            <p className="mt-3 leading-relaxed font-light text-[12px]">
              {item?.review}
            </p>
          </div>
        ))}
      </div>

      {review && Number(review.reviews.total) > 19 && (
        <Pagination
          route={`/product/${slug}`}
          total={Number(review.reviews.total)}
          perPage={Number(review.reviews.per_page)}
          currentPage={parseInt(pageNumber || "1")}
        />
      )}
    </>
  );
};

export default RatingAndReview;
