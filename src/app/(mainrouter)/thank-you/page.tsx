"use client";

import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { useOrderStore } from "@/lib/store/orderStore/orderStore";
import Image from "next/image";
import { usePurchaseStore } from "@/lib/store/checkoutStore/checkoutStore";
import { useEffect } from "react";

export default function ThankYouPage() {
  const { reset } = usePurchaseStore();
  const order = useOrderStore((state) => state.order);
  if (!order) {
    return (
      <div className="flex min-h-screen items-center justify-center text-white">
        <p className="text-lg font-semibold">No order found.</p>
      </div>
    );
  }

  const {
    name,
    phone,
    email,
    transaction_id,
    payment_method,
    items,
    total,
    product,
    quantity,
    id,
    customer_data,
  } = order;
  useEffect(() => {
    reset();
  }, []);
  return (
    <div className="flex items-center justify-center bg-gray-950 px-3 pt-5 pb-3 text-white">
      <Card className="w-full max-w-2xl text-center shadow-2xl">
        <CardHeader>
          <div className="flex justify-center">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <h1 className="mt- text-3xl font-bold">Thank You!</h1>
          <h1 className="mt- text-[18px] font-bold text-green-500">
            Order Id : {id}{" "}
          </h1>
          <h1 className="mt- text-[18px] font-bold text-green-500">
            Player Id : {customer_data}{" "}
          </h1>
          <p className="text-lg text-green-500">Order successfully.</p>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="flex items-start w-full gap-4">
            <div className="text-left">
              <h2 className="text-xl font-semibold">{product?.name}</h2>

              <p className="text-sm text-muted-foreground">{items}</p>
              <p className="text-sm text-muted-foreground">
                <span className="font-medium text-white">Total:</span>{" "}
                {quantity}
              </p>
              <p className="text-sm text-muted-foreground">
                {" "}
                <span className="font-medium text-white">Price: </span> ৳{total}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 text-left sm:grid-cols-2">
            <div>
              <h3 className="text-sm font-semibold text-gray-400">
                Customer Info
              </h3>
              <p>{name}</p>
              <p>{email}</p>
              <p>{phone}</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400">
                Payment Info
              </h3>
              <p>Method: {payment_method}</p>
              <p className="break-words">Transaction ID: {transaction_id}</p>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-4">
          <Button asChild className="w-full text-white">
            <Link href="/">Return to Home</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
