"use client";

import { useEffect } from "react";
import { Order } from "@/types/myOrderHistory/myOrderHistory";
import { formatDate } from "../DateFormate/DateFormate";
import { cn } from "@/lib/utils";
import { RxCross2 } from "react-icons/rx";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: Order | undefined;
}

const statusColors: Record<string, string> = {
  hold: "text-yellow-500",
  processing: "text-blue-500",
  "Delivery Running": "text-indigo-500",
  delivered: "text-green-500",
  cancelled: "text-red-500",
  refunded: "text-gray-400",
};

export default function ViewProductModal({
  isOpen,
  onClose,
  order,
}: ModalProps) {
  // background scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen || !order) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative bg-gray-900 text-white rounded-2xl w-full max-w-2xl shadow-2xl border border-gray-700 text-xs md:text-sm"
        style={{ maxHeight: "90vh" }}
      >
        {/* Cross Button */}
        <button
          onClick={onClose}
          className="absolute -top-2 -right-2 size-8 p-1 rounded-full bg-green-500 hover:bg-green-500/80 cursor-pointer z-50"
        >
          <RxCross2 className="size-full" />
        </button>
        <div className="overflow-y-auto max-h-[90vh] p-3 space-y-3">
          <div>
            <h3 className="text-base md:text-lg font-semibold text-indigo-400">
              Product Details
            </h3>
            <div className="bg-gray-800 rounded-xl p-3 border border-gray-700 divide-y divide-gray-700">
              <div className="flex justify-between py-2">
                <span className="font-semibold">Product:</span>
                <span>
                  {order.item !== null
                    ? order.product?.name
                    : order.customer_data}
                </span>
              </div>
              {order.item !== null && (
                <div className="flex justify-between py-2">
                  <span className="font-semibold">Item:</span>
                  <span>{order.item.name}</span>
                </div>
              )}
              <div className="flex justify-between py-2">
                <span className="font-semibold">Order Id:</span>
                <span>{order.id}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="font-semibold">Quantity:</span>
                <span>{order.quantity}</span>
              </div>
              {order.item !== null && (
                <div className="flex justify-between py-2">
                  <span className="font-semibold">Amount:</span>
                  <span>৳ {order.item?.price}</span>
                </div>
              )}
              <div className="flex justify-between py-2">
                <span className="font-semibold">Total Amount:</span>
                <span>৳ {Number(order.total).toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="font-semibold">Player Id:</span>
                <span>{order.customer_data}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="font-semibold">Date:</span>
                <span>{formatDate(order.created_at)}</span>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-base md:text-lg font-semibold text-yellow-400">
               Payment Info
            </h3>
            <div className="bg-gray-800 rounded-xl p-4 border border-gray-700 divide-y divide-gray-700">
              <div className="flex justify-between items-center py-2">
                <span className="font-semibold">Method:</span>
                <span className="flex items-center gap-2">
                  <img
                    src={order.payment_method.icon}
                    alt={order.payment_method.method}
                    className="w-6 h-6 rounded"
                  />
                  {order.payment_method.method}
                </span>
              </div>
              {order.number && (
                <div className="flex justify-between py-2">
                  <span className="font-semibold">Number:</span>
                  <span>{order.number}</span>
                </div>
              )}
              {order.transaction_id && (
                <div className="flex justify-between py-2">
                  <span className="font-semibold">Transaction ID:</span>
                  <span>{order.transaction_id}</span>
                </div>
              )}
            </div>
          </div>
          <div>
            <h3 className="text-base md:text-lg font-semibold text-green-400">
              Order Status
            </h3>
            <div className="bg-gray-800 rounded-xl p-4 border border-gray-700 divide-y divide-gray-700">
              <div className="flex justify-between py-2">
                <span className="font-semibold">Status:</span>
                <span
                  className={cn(
                    "px-2 py-1 rounded-lg font-semibold",
                    "text-xs md:text-sm",
                    statusColors[order.status] || "text-white"
                  )}
                >
                  {order.status}
                </span>
              </div>
              {order.order_note && (
                <div className="flex justify-between py-2">
                  <span className="font-semibold">Order Note:</span>
                  <span>{order.order_note}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


// update