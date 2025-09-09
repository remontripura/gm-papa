"use client";

import { Star } from "lucide-react";
import Image from "next/image";

export default function RatingList() {
  return (
    <div className="space-y-4">
      {ratingsData.map((item) => (
        <div key={item.id} className="bg-white rounded-2xl p-4">
          <div className="">
            <div className="flex items-center gap-5">
              <h3 className="font-semibold text-gray-800">
                {item.user?.name ?? "Anonymous"}
              </h3>{" "}
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className={`${
                      i < item.rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>{" "}
            <p className="text-sm text-gray-500">
              {new Date(item.created_at).toLocaleDateString()}
            </p>
          </div>

          {/* Description */}
          <p className="mt-3 text-gray-700">{item.description}</p>
          {item.images?.length > 0 && (
            <div className="mt-3 gap-2 flex items-start">
              {item.images.map((img) => (
                <div key={img.id} className="relative w-28 h-28">
                  <Image
                    src={img.image_path}
                    alt="review"
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
