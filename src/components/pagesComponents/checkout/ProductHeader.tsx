"use client";

import Image from "next/image";
import { GoShieldCheck } from "react-icons/go";
import { FaChevronLeft } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Images } from "@/lib/store/images";
import { IGameData } from "@/types/productsDataType/SingleProductType";

export default function ProductHeader({
  singleProduct,
}: {
  singleProduct: IGameData;
}) {
  const router = useRouter();
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <div className="w-full p-3 rounded-lg bg-mainlight ">
        <div className="w-full flex items-center md:items-center gap-4">
          <div className="flex-shrink-0">
            <Image
              className="w-24 h-24 md:w-32 md:h-32 rounded-lg object-cover"
              src={`${process.env.NEXT_PUBLIC_MAIN_BASE}/${singleProduct.image}`}
              alt="Product image"
              width={300}
              height={300}
            />
          </div>

          <div className="flex-grow w-full">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div className="flex-grow">
                <h3 className="font-bold text-lg md:text-xl">
                  {singleProduct.name}
                </h3>

                <div className="flex flex-wrap items-center gap-3 mt-1">
                  <p className="text-sm flex items-center gap-1">
                    <GoShieldCheck className="text-green-500" />
                    {singleProduct.delivery_system || "N/A"}
                  </p>
                  <div className="text-sm flex items-center gap-1">
                    <Image
                      className="rounded-full object-cover w-5 h-5"
                      src={
                        singleProduct.support_country === "BD"
                          ? Images.bd
                          : singleProduct.support_country === "IN"
                          ? Images.ind
                          : singleProduct.support_country === "MY"
                          ? Images.myl
                          : singleProduct.support_country === "SG"
                          ? Images.sig
                          : singleProduct.support_country === "ID"
                          ? Images.indn
                          : ""
                      }
                      alt="img"
                      width={20}
                      height={20}
                    />
                    <p>{singleProduct.support_country || "N/A"}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:block hidden mt-2 p-2 rounded bg-gradient-to-r from-[#E377FF] to-[#9477FF] text-white font-semibold text-sm md:text-base">
              <p>{singleProduct.short_description}</p>
            </div>
          </div>
        </div>
        <div className="mt-2 p-2 rounded md:hidden block bg-gradient-to-r from-[#E377FF] to-[#9477FF] text-white font-semibold text-sm md:text-base">
          <p className={expanded ? "line-clamp-none" : "line-clamp-1"}>
            {singleProduct.short_description}
          </p>
          {singleProduct.short_description?.length > 40 && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="mt-1 text-xs underline text-white"
            >
              {expanded ? "See less" : "See more"}
            </button>
          )}
        </div>
      </div>
    </>
  );
}
