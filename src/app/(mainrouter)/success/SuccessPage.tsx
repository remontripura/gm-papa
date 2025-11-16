"use client";

import { SuccessTransactionData } from "@/types/successDataType/successDataType";
import { CheckCircle2, Copy } from "lucide-react";

export default async function SuccessPageComponent({
  successTransaction,
}: {
  successTransaction: SuccessTransactionData;
}) {
  return (
    <div className="md:min-h-screen min-h-auto bg-gradient-to-br from-background via-background to-accent/5 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Success Card */}
        <div className="bg-card rounded-2xl shadow-lg border border-border overflow-hidden">
          {/* Header with success indicator */}
          <div className="bg-gradient-to-r from-success/10 to-accent/10 px-8 pt-8 pb-6 text-center">
            <div className="flex justify-center mb-4">
              <div className="relative">
                <div className="absolute inset-0 bg-success/20 rounded-full blur-lg animate-pulse" />
                <CheckCircle2
                  className="w-16 h-16 text-success relative"
                  strokeWidth={1.5}
                />
              </div>
            </div>
            <h1 className="text-3xl font-bold mb-2 text-balance text-green-500">
              Payment Successful
            </h1>
            <p className="text-muted-foreground text-sm">
              Thank you for your purchase,{" "}
              <span className="font-semibold text-foreground">
                {successTransaction.CustomerName}
              </span>
            </p>
          </div>
          <div className="px-4 py-5 space-y-6">
            <div className="space-y-4">
              <div className="flex items-start justify-between pb-3 border-b border-border/50">
                <span className="text-muted-foreground text-sm font-medium">
                  Transaction ID
                </span>
                <div className="flex items-center gap-2">
                  <code className="text-xs font-mono text-foreground bg-muted/40 px-2.5 py-1.5 rounded">
                    {successTransaction.MerchantTransactionId.slice(0, 16)}...
                  </code>
                  <button
                    onClick={() =>
                      navigator.clipboard.writeText(
                        successTransaction.MerchantTransactionId
                      )
                    }
                    className="p-1 hover:bg-muted rounded transition-colors"
                    title="Copy transaction ID"
                  >
                    <Copy size={16} className="text-muted-foreground" />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pb-3 border-b border-border/50">
                <span className="text-muted-foreground text-sm font-medium">
                  Amount
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-success/15 text-success rounded-full text-xs font-semibold">
                  <span className="w-1.5 h-1.5 bg-success rounded-full" />
                  Tk {successTransaction.TotalAmount}
                </span>
              </div>

              <div className="flex items-center justify-between pb-3 border-b border-border/50">
                <span className="text-muted-foreground text-sm font-medium">
                  Status
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-success/15 text-success rounded-full text-xs font-semibold  !text-green-500">
                  <span className="w-1.5 h-1.5 bg-success rounded-full" />
                  {successTransaction.Status}
                </span>
              </div>

              <div className="flex items-center justify-between pb-3 border-b border-border/50">
                <span className="text-muted-foreground text-sm font-medium">
                  Date
                </span>
                <span className="text-sm text-foreground">
                  {new Date(
                    successTransaction.TransactionDate
                  ).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-muted-foreground text-sm font-medium">
                  Payment Method
                </span>
                <span className="text-sm font-medium text-foreground">
                  {successTransaction.FinancialEntity}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
