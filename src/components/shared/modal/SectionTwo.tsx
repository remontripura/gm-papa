"use client";

import { usePurchaseStore } from "@/lib/store/checkoutStore/checkoutStore";
import React from "react";
import { RxCross2 } from "react-icons/rx";

export default function SectionTwo({ setOpen }) {
  return (
    <div className="mt-6">
      <h6 className="font-semibold text-[18px]">Offer details </h6>
      <div className=" bg-mainlight rounded p-2 mt-2">
        <div className="flex items-center justify-between ">
          <p className="flex items-center gap-2">
            Coupon{" "}
            <span
              className="text-orange-500 cursor-pointer hover:text-orange-700"
              onClick={setOpen}
            >
              (Use Coupon)
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
