"use client";

import { GenericForm, GenericFormRef } from "@/components/Form/GenericForm";
import { TextField } from "@/components/Form/fields/TextField";
import MainContainer from "@/components/container/MainContainer";
import { CopyToClipboard } from "@/components/shared/copyClipboard/copyClipboard";
import { LoadingButton } from "@/components/shared/submitButton/submitButton";
import {
  showErrorAlert,
  showSuccessAlert,
} from "@/components/shared/toast/ToastModal";
import axiosInstance from "@/lib/axios/AxiosInstance";
import { useGetData } from "@/lib/fetch/useGetData";
import { cn } from "@/lib/utils";
import { WalletSchema } from "@/schema/addWalletSchema/addWalletSchema";
import { Order } from "@/types/orderDataType/orderDataType";
import {
  PaymentMethod,
  paymentMethodResponse,
} from "@/types/paymentMethod/paymentMethod";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import Image from "next/image";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FaCopy } from "react-icons/fa";
import { IoCheckmarkDone } from "react-icons/io5";
import { z } from "zod";

export default function AddWalletComponent() {
  const searchParams = useSearchParams();
  const amountFromParams = searchParams.get("amount") || "";
  if (!amountFromParams) {
    redirect("/");
  }
  type FormType = z.infer<ReturnType<typeof WalletSchema>>;
  const formRef = useRef<GenericFormRef<FormType>>(null);
  const { copy, copied } = CopyToClipboard();
  const { data: paymentMethod } = useGetData<paymentMethodResponse>(
    ["paymentMethod"],
    `/payment-method`
  );
  const filteredPaymentMethods = paymentMethod?.data.filter(
    (item) => item.method !== "Wallet"
  );
  const [method, setMethod] = useState<PaymentMethod | undefined>(undefined);
  const [phoneAllow, setPhoneAllow] = useState<boolean>(true);
  const [transactionAllow, setTransactionAllow] = useState<boolean>(true);
  const router = useRouter();
  const initialValues: FormType = {
    amount: amountFromParams,
    payment_id: "",
    payment_number: "",
    transaction_id: "",
  };

  useEffect(() => {
    if (
      filteredPaymentMethods &&
      filteredPaymentMethods.length > 0 &&
      !method
    ) {
      setMethod(filteredPaymentMethods[0]);
      formRef.current?.reset({
        amount: amountFromParams,
        payment_id: filteredPaymentMethods[0].id.toString(),
        payment_number: "",
        transaction_id: "",
      });
    }
  }, [filteredPaymentMethods, amountFromParams, method]);

  useEffect(() => {
    if (method && method?.id === 4) {
      setTransactionAllow(false);
    } else {
      setTransactionAllow(true);
    }
  }, [method]);

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: FormType) => {
      console.log(data);
      const response = await axiosInstance.post<Order>(`/add-money`, data);
      return response.data;
    },
    onSuccess: (data: Order) => {
      if (data.status === false) {
        showErrorAlert(data.message);
      } else {
        showSuccessAlert(data.message);
        router.push("/wallet-history");
        formRef.current?.reset();
      }
    },
    onError: (
      err: AxiosError<{ message: { message: string } }> & {
        message: { message: string };
      }
    ) => {
      if (
        err.message.message ===
        "Transaction ID and payment number are required for this payment method."
      ) {
        setPhoneAllow(false);
      }
      showErrorAlert(err.message.message);
    },
  });

  const handleSubmit = (data: FormType | React.FormEvent<HTMLFormElement>) => {
    mutate(data as FormType);
  };

  return (
    <>
      <MainContainer className="px-4 md:pb-10 md:py-12 py-5">
        <div className=" max-w-3xl mx-auto w-full ">
          <p className="text-lg text-gray-200 text-start font-semibold mb-6 tracking-wide">
            Add Wallet Balance
          </p>
          <p className="mb-2">Wallet Amount : ৳{amountFromParams}</p>
        </div>
        <div className="h-full overflow-auto max-w-3xl mx-auto w-full bg-gradient-to-br from-gray-900/80 via-gray-800/80 to-gray-900/70 backdrop-blur-xl p-3 rounded-2xl shadow-xl border border-gray-700">
          <div className="mt-2">
            <GenericForm
              schema={WalletSchema(phoneAllow, transactionAllow)}
              initialValues={initialValues}
              onSubmit={handleSubmit}
              ref={formRef}
            >
              <div className="mt-5 space-y-5">
                {/* Payment Methods */}
                <div className="grid grid-cols-2 gap-5">
                  {filteredPaymentMethods?.map((item, index) => (
                    <div
                      key={index}
                      onClick={(e) => {
                        e.stopPropagation();
                        setMethod(item);
                        formRef.current?.setValue(
                          "payment_id",
                          item.id.toString()
                        );
                      }}
                      className={`p-3 rounded-xl cursor-pointer border-2 transition-all duration-300 bg-white/95 shadow-sm flex items-center justify-center hover:scale-105 ${
                        method?.id.toString() === item.id.toString()
                          ? "border-purple-500 shadow-md shadow-purple-300 bg-purple-200"
                          : "border-gray-200 hover:border-gray-400"
                      }`}
                    >
                      <Image
                        src={item.icon}
                        alt={`payment-${index}`}
                        width={120}
                        height={50}
                        className="object-contain h-10"
                      />
                    </div>
                  ))}
                </div>

                {/* Selected Method Info */}
                {method?.id !== 4 && (
                  <div className="mt-5 p- rounded-xl bg-gray-900/80 border p-3 border-gray-700 shadow-inner">
                    <p className=" text-gray-100 flex items-center justify-between gap-3">
                      <span className="font-mono tracking-wide">
                        {method?.number}
                      </span>
                      <span
                        className="px-4 py-1 border border-gray-600 rounded hover:bg-gray-700 cursor-pointer transition-all"
                        onClick={() => copy(String(method?.id))}
                      >
                        {copied ? (
                          <IoCheckmarkDone className="text-green-400" />
                        ) : (
                          <FaCopy />
                        )}
                      </span>
                    </p>{" "}
                  </div>
                )}

                {/* Inputs */}
                <div className="space-y-5">
                  {!phoneAllow && (
                    <TextField
                      label="Payment Number"
                      name="payment_number"
                      type="number"
                      placeholder="Enter payment number"
                      inputClass="px-3 border border-gray-300 rounded-lg text-gray-800 text-[16px] bg-gray-50"
                    />
                  )}
                  {transactionAllow && (
                    <TextField
                      label="Transaction ID"
                      name="transaction_id"
                      type="text"
                      placeholder="Enter your transaction id"
                      inputClass="px-3 border border-gray-300 rounded-lg text-gray-800 text-[16px] bg-gray-50"
                    />
                  )}
                </div>

                <div className="mt-3 rounded-xl border border-gray-700 shadow-inner">
                  {method && (
                    <div
                      className="game-description-content border rounded-md"
                      dangerouslySetInnerHTML={{
                        __html: (method?.description || "").replaceAll(
                          "[amount]",
                          amountFromParams.toString()
                        ),
                      }}
                    />
                  )}
                </div>

                {/* Submit Button */}
                <LoadingButton
                  disabled={isPending}
                  className={cn(
                    "w-full mt-4 py-3 rounded-xl font-semibold text-white shadow-md transition-all duration-300",
                    "bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 hover:shadow-xl"
                  )}
                  type="submit"
                >
                  {isPending ? "Processing..." : "Add Wallet"}
                </LoadingButton>
              </div>
            </GenericForm>
          </div>
        </div>
      </MainContainer>
    </>
  );
}
