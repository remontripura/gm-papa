"use client";

import { usePurchaseStore } from "@/lib/store/checkoutStore/checkoutStore";
import { useProductSelectionStore } from "@/lib/store/productSelectStore/productSelectStore";
import React from "react";
import { RxCross2 } from "react-icons/rx";

export default function SectionOne() {
  const { count, balance, formData, name } = usePurchaseStore();
  const { selectedItem } = useProductSelectionStore();
  console.log(selectedItem);
  const entries = Object.entries(formData);
  const raw = entries[0]?.[1];
  const playerId = raw == null ? "" : String(raw);
  return (
    <>
      <h6 className="font-semibold text-[18px] text-white">
        Product details{" "}
        <span className="text-orange-500 font-normal">(Please confirm)</span>{" "}
      </h6>
      <div className="bg-mainlight rounded-lg p-4 mt-3 space-y-2">
        <div className="flex items-start justify-between ">
          <p className="flex-1">Product</p>
          <p className="flex-1">{name}</p>
        </div>
        <div className="flex items-start justify-between ">
          <p className="flex items-center gap-2 flex-1">Items</p>
          <p className="flex-1">{selectedItem?.name}</p>
        </div>
        <div className="flex items-center justify-between ">
          <p className="flex items-center gap-2 flex-1">
            {" "}
            Price ({count} <RxCross2 className="size-3" /> {balance})
          </p>
          <p className="flex-1">৳{(balance * count).toLocaleString()}</p>
        </div>
        <div className="flex items-center justify-between ">
          <p className="flex-1">Player Id</p>
          <p className="flex-1">{playerId}</p>
        </div>
      </div>
    </>
  );
}
