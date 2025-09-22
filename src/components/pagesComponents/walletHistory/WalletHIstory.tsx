"use client";

import MainContainer from "@/components/container/MainContainer";
import { useGetData } from "@/lib/fetch/useGetData";
import { cn } from "@/lib/utils";
import { ITransactionHistoryRes } from "@/types/wallet_history/wallet_history";
import { format } from "date-fns";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const MyWalletHistory = () => {
  const { data: walletHistory, isLoading } = useGetData<ITransactionHistoryRes>(
    ["history"],
    "/history"
  );

  return (
    <div className="w-full px-3 py-8">
      <MainContainer>
        <div className="mb-8 border-b pb-5">
          <h1 className="text-2xl font-bold">Wallet History</h1>
          <p>View details of your wallet transactions.</p>
        </div>

        {isLoading ? (
          <ProfileLoading />
        ) : (
          <div className="mx-auto space-y-6">
            {walletHistory?.history?.length ? (
              walletHistory.history.map((item) => (
                <div
                  key={item.id}
                  className="border rounded-2xl p-5 shadow-md space-y-4"
                >
                  {/* Header Info */}
                  <div className="space-y-1">
                    <h2 className="text-lg font-semibold text-white">
                      {item.description}
                    </h2>
                    <p className="text-sm text-white">
                      Transaction ID: {item.id}
                    </p>
                    <p className="text-sm text-white">
                      Amount:{" "}
                      <span
                        className={cn(
                          "font-semibold",
                          item.type === "debit"
                            ? "text-red-500"
                            : "text-green-500"
                        )}
                      >
                        {item.type === "debit" ? "-" : "+"}৳{item.amount}
                      </span>
                    </p>
                    <p className="text-sm text-white">
                      Status:{" "}
                      <span
                        className={cn(
                          "font-medium",
                          item.status === 1
                            ? "text-green-500"
                            : "text-yellow-500"
                        )}
                      >
                        {item.status === 1 ? "Success" : "Pending"}
                      </span>
                    </p>
                    <p className="text-sm text-white">
                      Date:{" "}
                      {format(
                        new Date(item.created_at),
                        "dd MMM yyyy, hh:mm a"
                      )}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-white">
                No wallet history found.
              </div>
            )}
          </div>
        )}
      </MainContainer>
    </div>
  );
};

export default MyWalletHistory;

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
