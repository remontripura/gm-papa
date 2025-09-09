"use client";

import RatingsLine from "./RatingLine";
import ReviewLine from "./ReviewLine";
import Image from "next/image";
import { Star } from "lucide-react";

const RatingAndReview = () => {
  return (
    <>
      <div className="mt-5 p-3 bg-mainlight rounded-lg">
        <h6 className="text-2xl mb-2 font-semibold">Reviews</h6>
        <div className="flex md:flex-row flex-col items-start gap-4">
          <div className="flex md:flex-col flex-row items-center justify-center md:gap-0 gap-5">
            <h6 className="text-[44px] font-semibold">{0}</h6>
            <div className="flex flex-col justify-center items-center">
              <RatingsLine ratingsNumber={0} />
              <p>{5} Ratings</p>
            </div>
          </div>
          <div>
            <ReviewLine rate={0} number={5} people="0" />
            <ReviewLine rate={0} number={4} people="0" />
            <ReviewLine rate={0} number={3} people="0" />
            <ReviewLine rate={0} number={2} people="0" />
            <ReviewLine rate={0} number={1} people="0" />
          </div>
        </div>

        <div className="mt-6 p-3 shadow-sm border-b border-[#ffffff3a]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Image
                src="https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg"
                alt="profile"
                width={40}
                height={40}
                className="rounded-full w-12 h-12 object-cover"
              />
              <div>
                <h6 className="font-semibold">Alexander Rity</h6>
                <p className="text-sm">4 months ago</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <span className="font-bold text-lg">5.0</span>
              <div className="flex text-[#A46BFF]">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className={i < 4 ? "fill-[#A46BFF]" : "fill-none"}
                  />
                ))}
              </div>
            </div>
          </div>
          <p className="mt-3 leading-relaxed">
            Easy booking, great value! Cozy rooms at a reasonable price in
            Sheffield's vibrant center. Surprisingly quiet with nearby
            Traveller’s accommodations. Highly recommended!
          </p>
        </div>
      </div>
    </>
  );
};

export default RatingAndReview;
