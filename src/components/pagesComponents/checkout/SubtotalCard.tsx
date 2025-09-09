import { usePurchaseStore } from "@/lib/store/checkoutStore/checkoutStore";
import { X } from "lucide-react";

const Subtotal = () => {
  const { count, balance, formData, name } = usePurchaseStore();
  const entries = Object.entries(formData);
  const raw = entries[0]?.[1];
  const playerId = raw == null ? "" : String(raw);

  return (
    <div className="p-3 rounded mb-5 bg-mainlight">
      <h6 className="font-medium uppercase text-primary">
        Checkout Order
      </h6>
      <div className="flex w-full  justify-between border-b border-b-gray-300 py-2">
        <h6 className="font-medium text-[18px]">Product</h6>
        <h6 className="font-medium text-[18px]">Subtotal</h6>
      </div>
      <div className="flex w-full items-center justify-between border-b border-b-gray-300 py-2">
        <div className="text-[14px] text-white">
          <div className="">
            <span> Name : {name}</span>
          </div>
          <p className="flex items-center gap-1">
            Selected Amount: {count} <X className="size-4" /> {balance}৳
          </p>
          <p className="text-[14px]">Player Id: {playerId}</p>
        </div>
        <h6 className="">{(balance * count).toLocaleString()}৳</h6>
      </div>
      <div className="flex w-full  justify-between border-b border-b-gray-300 py-2">
        <h6 className="font-medium text-[18px]">Subtotal</h6>
        <h6 className="font-medium text-[var(--custom-orange)]">
          {(balance * count).toLocaleString()}৳
        </h6>
      </div>
      <div className="flex w-full  justify-between border-b border-b-gray-300 py-2">
        <h6 className="font-medium text-[18px]">Total</h6>
        <h6 className="font-medium text-[var(--custom-orange)]">
          {(balance * count).toLocaleString()}৳
        </h6>
      </div>
    </div>
  );
};
export default Subtotal;
