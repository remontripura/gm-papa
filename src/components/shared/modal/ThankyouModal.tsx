"use client";

import { RxCross2 } from "react-icons/rx";
import { CheckCircle2 } from "lucide-react";
import { useScrollLock } from "@/lib/useScrollLock/useScrollLock";

export default function ThankyouModal({ isOpen, onClose, OrderData }: any) {
  useScrollLock(isOpen);
  if (!isOpen) return null;

  const order = OrderData?.order;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/50 backdrop-blur-[4px] flex items-center justify-center z-[60]"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative rounded-2xl p-6 md:w-[450px] w-[95%] h-fit max-h-[90vh] overflow-hidden shadow-2xl bg-white"
      >
        {/* Close Button */}
        <div
          onClick={onClose}
          className="absolute right-4 top-4 size-8 flex items-center justify-center text-white rounded-full bg-gray-400 hover:bg-gray-500 cursor-pointer z-20"
        >
          <RxCross2 />
        </div>

        {/* Success Icon */}
        <div className="flex flex-col items-center text-center space-y-3">
          <CheckCircle2 className="w-14 h-14 text-green-500" />
          <h2 className="text-xl font-semibold text-gray-800">
            {OrderData?.message || "Order placed successfully!"}
          </h2>
        </div>

        {/* Order Details */}
        <div className="mt-6 space-y-3 text-sm text-gray-700">
          <div className="flex justify-between">
            <span className="font-medium">Product</span>
            <span>{order?.product?.name}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium">Transaction ID</span>
            <span className="font-mono">{order?.transaction_id}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium">Quantity</span>
            <span>{order?.quantity}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium">Total</span>
            <span className="text-green-600 font-semibold">
              Tk {order?.total?.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Divider */}
        <div className="my-5 border-t border-gray-200" />

        {/* Customer Info */}
        <div className="space-y-1 text-xs text-gray-600">
          <p>
            <span className="font-medium">Name:</span> {order?.name}
          </p>
          <p>
            <span className="font-medium">Phone:</span> {order?.phone}
          </p>
          <p>
            <span className="font-medium">Email:</span> {order?.email}
          </p>
        </div>
      </div>
    </div>
  );
}
