"use client";

import { usePurchaseStore } from "@/lib/store/checkoutStore/checkoutStore";
import React from "react";
import { RxCross2 } from "react-icons/rx";

export default function SectionOne() {
  const { count, balance, formData, name } = usePurchaseStore();
  const entries = Object.entries(formData);
  const raw = entries[0]?.[1];
  const playerId = raw == null ? "" : String(raw);
  return (
    <>
      <h6 className="font-semibold text-[18px] text-white">
        Product details{" "}
        <span className="text-orange-500 font-normal">(Please confirm)</span>{" "}
      </h6>
      <div className="bg-mainlight rounded-lg p-4 mt-3">
        <div className="flex items-start justify-between ">
          <p className="flex items-center gap-2 flex-1">
            Product ({count} <RxCross2 className="size-3" /> {balance})
          </p>
          <p className="flex-1">{name}</p>
        </div>
        <div className="flex items-center justify-between ">
          <p className="flex-1">Selected Amount</p>
          <p className="flex-1">{(balance * count).toLocaleString()}৳</p>
        </div>
        <div className="flex items-center justify-between ">
          <p className="flex-1">Player Id</p>
          <p className="flex-1">{playerId}</p>
        </div>
      </div>
    </>
  );
}
