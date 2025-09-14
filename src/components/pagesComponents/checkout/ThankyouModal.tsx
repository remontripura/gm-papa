import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  CheckCircle2,
  Package,
  CreditCard,
  Hash,
  Home,
  ShoppingBag,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

interface OrderSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderData: {
    message: string;
    total: number;
    transaction_id: string;
    product: {
      name: string;
    };
    order_id?: string;
  };
}

export default function OrderSuccessModal({
  orderData,
}: OrderSuccessModalProps) {
  const { message, total, transaction_id, product, order_id } = orderData;

  return (
    <Dialog>
      <DialogContent className="sm:max-w-md bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
        <DialogHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle2 className="w-8 h-8 text-green-600" />
          </div>

          <DialogTitle className="text-2xl font-bold text-green-800">
            Order Confirmed!
          </DialogTitle>

          <DialogDescription className="text-green-700 text-base">
            {message ||
              "Thank you for your purchase. Your order has been successfully placed."}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Order Details Card */}
          <div className="bg-white rounded-lg p-4 border border-green-200 shadow-sm">
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <Package className="w-4 h-4" />
              Order Details
            </h3>

            <div className="space-y-3">
              {/* Product Name */}
              <div className="flex justify-between items-start">
                <span className="text-gray-600 flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4" />
                  Product:
                </span>
                <span className="font-medium text-gray-800 text-right max-w-48">
                  {product?.name}
                </span>
              </div>

              <Separator />

              {/* Total Amount */}
              <div className="flex justify-between items-center">
                <span className="text-gray-600 flex items-center gap-2">
                  <CreditCard className="w-4 h-4" />
                  Total Amount:
                </span>
                <span className="font-bold text-lg text-green-600">
                  ৳{total?.toLocaleString() || "0"}
                </span>
              </div>

              <Separator />

              {/* Transaction ID */}
              <div className="flex justify-between items-start">
                <span className="text-gray-600 flex items-center gap-2">
                  <Hash className="w-4 h-4" />
                  Transaction ID:
                </span>
                <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded text-gray-800">
                  {transaction_id}
                </span>
              </div>

              {/* Order ID if available */}
              {order_id && (
                <>
                  <Separator />
                  <div className="flex justify-between items-start">
                    <span className="text-gray-600 flex items-center gap-2">
                      <Hash className="w-4 h-4" />
                      Order ID:
                    </span>
                    <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded text-gray-800">
                      {order_id}
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Success Message */}
          <div className="bg-green-100 border border-green-300 rounded-lg p-4 text-center">
            <p className="text-green-800 text-sm">
              🎉 Your order is being processed and {`you'll`} receive a confirmation
              shortly.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-2 pt-4">
          <Link href="/" className="flex-1">
            <Button
              variant="outline"
              className="w-full border-green-300 text-green-700 hover:bg-green-50"
            >
              <Home className="w-4 h-4 mr-2" />
              Continue Shopping
            </Button>
          </Link>

          <Button className="flex-1 bg-green-600 hover:bg-green-700 text-white">
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
