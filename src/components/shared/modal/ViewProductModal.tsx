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
          className="absolute -top-2 -right-2 size-8 p-1 rounded-full bg-green-500 hover:bg-green-500/60 cursor-pointer z-50"
        >
          <RxCross2 className="size-full" />
        </button>

        {/* Scrollable content */}
        <div className="overflow-y-auto max-h-[90vh] p-6 space-y-6">
          {/* Product Details */}
          <div>
            <h3 className="text-base md:text-lg font-semibold mb-2 text-indigo-400">
              🛍️ Product Details
            </h3>
            <div className="bg-gray-800 rounded-xl p-4 space-y-2 border border-gray-700">
              <p>
                <span className="font-medium">Product:</span>{" "}
                {order.item !== null
                  ? order.product?.name
                  : order.customer_data}
              </p>
              {order.item !== null && (
                <p>
                  <span className="font-medium">Quantity:</span>{" "}
                  {order.item.name}
                </p>
              )}

              <p>
                <span className="font-medium">Quantity:</span> {order.quantity}
              </p>
              {order.item !== null && (
                <p>
                  <span className="font-medium">Amount:</span> ৳
                  {order.item?.price}
                </p>
              )}
              <p>
                <span className="font-medium">Total Amount:</span> ৳
                {Number(order.total).toLocaleString()}
              </p>
              <p>
                <span className="font-medium">Player Id:</span>{" "}
                {order.customer_data}
              </p>
              <p>
                <span className="font-medium">Date:</span>{" "}
                {formatDate(order.created_at)}
              </p>
            </div>
          </div>

          {/* Payment Info */}
          <div>
            <h3 className="text-base md:text-lg font-semibold mb-2 text-yellow-400">
              💳 Payment Info
            </h3>
            <div className="bg-gray-800 rounded-xl p-4 space-y-2 border border-gray-700">
              <p className="flex items-center gap-2">
                <span className="font-medium">Method:</span>
                <img
                  src={order.payment_method.icon}
                  alt={order.payment_method.method}
                  className="w-6 h-6 rounded"
                />
                {order.payment_method.method}
              </p>
              {order.number && (
                <p>
                  <span className="font-medium">Number:</span> {order.number}
                </p>
              )}
              {order.transaction_id && (
                <p>
                  <span className="font-medium">Transaction ID:</span>{" "}
                  {order.transaction_id}
                </p>
              )}
            </div>
          </div>

          {/* Status & Note */}
          <div>
            <h3 className="text-base md:text-lg font-semibold mb-2 text-green-400">
              📦 Order Status
            </h3>
            <div className="bg-gray-800 rounded-xl p-4 space-y-2 border border-gray-700">
              <p>
                <span className="font-medium">Status:</span>{" "}
                <span
                  className={cn(
                    "px-2 py-1 rounded-lg font-semibold",
                    "text-xs md:text-sm",
                    statusColors[order.status] || "text-white"
                  )}
                >
                  {order.status}
                </span>
              </p>
              {order.order_note && (
                <p>
                  <span className="font-medium">Order Note:</span>{" "}
                  {order.order_note}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
