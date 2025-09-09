"use client";

import MainContainer from "@/components/container/MainContainer";
import { useGetData } from "@/lib/fetch/useGetData";
import { cn } from "@/lib/utils";
import { OrderListResponse } from "@/types/myOrderHistory/myOrderHistory";
import { format } from "date-fns";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const MyOrderComponents = () => {
  const { data: myorder, isLoading } = useGetData<OrderListResponse>(
    ["myorder"],
    "/my-orders"
  );

  return (
    <div className="w-full px-3 py-8">
      <MainContainer>
        <div className="mb-8 border-b pb-5">
          <h1 className="text-2xl font-bold">My Orders</h1>
          <p>View details of your completed and pending orders.</p>
        </div>

        {isLoading ? (
          <ProfileLoading />
        ) : (
          <div className="mx-auto space-y-6">
            {myorder?.data?.length ? (
              myorder.data.map((order) => (
                <div
                  key={order.id}
                  className="border rounded-2xl p-5 shadow-md space-y-4 grid md:grid-cols-2 grid-cols-1"
                >
                  {/* Header Info */}
                  <div className="flex flex-col md:flex-row justify-between gap-4">
                    <div className="space-y-1">
                      <h2 className="text-lg font-semibold text-white">
                        {order.items}
                      </h2>
                      <p className="text-sm text-white">
                        Order ID: {order.id}
                      </p>
                      <p className="text-sm text-white">
                        Status:{" "}
                        <span
                          className={cn(
                            "font-medium",
                            order.status === "hold"
                              ? "text-yellow-500"
                              : order.status === "success"
                              ? "text-green-500"
                              : ""
                          )}
                        >
                          {order.status}
                        </span>
                      </p>
                      <p className="text-sm text-white">
                        Player ID: {order.customer_data}
                      </p>
                      <p>
                        <span className="font-medium">Quantity:</span>{" "}
                        {order.quantity}
                      </p>
                      <p>
                        <span className="font-medium">Price:</span> ৳
                        {order.total}
                      </p>
                      {order.discount > 0 && (
                        <p>
                          <span className="font-medium">Discount:</span> ৳
                          {order.discount}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Order Summary */}
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div className="space-y-1">
                      <p>
                        <span className="font-medium">Payment Method:</span>{" "}
                        {order.payment_method}
                      </p>
                      <p>
                        <span className="font-medium">Payment Number:</span>{" "}
                        {order.number}
                      </p>
                      <p>
                        <span className="font-medium">Transaction ID:</span>{" "}
                        {order.transaction_id}
                      </p>
                      <p>
                        <span className="font-medium">Order Date:</span>{" "}
                        {format(
                          new Date(order.created_at),
                          "dd MMM yyyy, hh:mm a"
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-white">No orders found.</div>
            )}
          </div>
        )}
      </MainContainer>
    </div>
  );
};

export default MyOrderComponents;

const ProfileLoading = () => {
  return (
    <div className="space-y-4">
      {[...Array(3)].map((_, i) => (
        <Skeleton
          key={i}
          duration={2}
          height={130}
          baseColor="#3d3d3d"
          highlightColor="#545454"
        />
      ))}
    </div>
  );
};
