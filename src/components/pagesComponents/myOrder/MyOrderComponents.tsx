"use client";

import MainContainer from "@/components/container/MainContainer";
import { formatDate } from "@/components/shared/DateFormate/DateFormate";
import ViewProductModal from "@/components/shared/modal/ViewProductModal";
import { useGetData } from "@/lib/fetch/useGetData";
import { cn } from "@/lib/utils";
import {
  Order,
  OrderListResponse,
} from "@/types/myOrderHistory/myOrderHistory";
import { useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const MyOrderComponents = () => {
  const { data: myorder, isLoading } = useGetData<OrderListResponse>(
    ["myorder"],
    "/my-orders"
  );

  const [open, setOpen] = useState(false);
  const [data, setData] = useState<Order>();
  const handleData = (data: Order) => {
    setData(data);
    setOpen(true);
  };
  return (
    <>
      <ViewProductModal
        isOpen={open}
        onClose={() => setOpen(false)}
        order={data}
      />
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
                    key={order.number}
                    className="border rounded-2xl flex items-center justify-between p-3"
                  >
                    <div className="text-[12px] md:text-[16px] md:w-4/12 w-9/12">
                      <h6>
                        Name :{" "}
                        {order.item !== null
                          ? order.item.name
                          : order.customer_data}
                      </h6>
                      <p>Date: {formatDate(order.created_at)}</p>
                      <p
                        className={cn(
                          "text-[12px] md:text-[16px] md:hidden block"
                        )}
                      >
                        Status:{" "}
                        <span
                          className={cn(
                            order.status === "hold"
                              ? "text-yellow-500"
                              : order.status === "processing"
                              ? "text-blue-500"
                              : order.status === "Delivery Running"
                              ? "text-indigo-500"
                              : order.status === "delivered"
                              ? "text-green-500"
                              : order.status === "cancelled"
                              ? "text-red-500"
                              : order.status === "refunded"
                              ? "text-gray-400"
                              : ""
                          )}
                        >
                          {" "}
                          {order.status}
                        </span>{" "}
                      </p>
                      <p className="text-[12px] md:text-[16px] md:hidden block">
                        {" "}
                        <h6>Amount: ৳{Number(order.total).toLocaleString()}</h6>
                      </p>
                    </div>
                    <div className="text-[12px] md:text-[16px] w-2/12 md:block hidden">
                      <h6>Amount: ৳{Number(order.total).toLocaleString()}</h6>
                    </div>
                    <p
                      className={cn(
                        "text-[12px] md:text-[16px] w-3/12 md:block hidden"
                      )}
                    >
                      Status:{" "}
                      <span
                        className={cn(
                          order.status === "hold"
                            ? "text-yellow-500"
                            : order.status === "processing"
                            ? "text-blue-500"
                            : order.status === "Delivery Running"
                            ? "text-indigo-500"
                            : order.status === "delivered"
                            ? "text-green-500"
                            : order.status === "cancelled"
                            ? "text-red-500"
                            : order.status === "refunded"
                            ? "text-gray-400"
                            : ""
                        )}
                      >
                        {" "}
                        {order.status}
                      </span>{" "}
                    </p>

                    <div className="w-3/12 flex justify-end">
                      <button
                        onClick={() => handleData(order)}
                        className="px-6 md:py-2 py-1 text-[12px] md:text-[16px] rounded-lg bg-green-600 hover:bg-green-600/70 cursor-pointer"
                      >
                        Details
                      </button>
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
    </>
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
