"use client";

import { GenericForm, GenericFormRef } from "@/components/Form/GenericForm";
import { z } from "zod";
import { TextField } from "@/components/Form/fields/TextField";
import MainContainer from "@/components/container/MainContainer";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios/AxiosInstance";
import { Order } from "@/types/orderDataType/orderDataType";
import { AxiosError } from "axios";
import {
  showErrorAlert,
  showSuccessAlert,
} from "@/components/shared/toast/ToastModal";
import { useEffect, useRef, useState } from "react";
import { LoadingButton } from "@/components/shared/submitButton/submitButton";
import { cn } from "@/lib/utils";
import { useGetData } from "@/lib/fetch/useGetData";
import {
  PaymentMethod,
  paymentMethodResponse,
} from "@/types/paymentMethod/paymentMethod";
import Image from "next/image";
import { CopyToClipboard } from "@/components/shared/copyClipboard/copyClipboard";
import { FaCopy } from "react-icons/fa";
import { IoCheckmarkDone } from "react-icons/io5";
import { useSearchParams } from "next/navigation";
import { WalletSchema } from "@/schema/addWalletSchema/addWalletSchema";

export default function AddWalletComponent() {
  type FormType = z.infer<ReturnType<typeof WalletSchema>>;
  const formRef = useRef<GenericFormRef<FormType>>(null);

  const searchParams = useSearchParams();
  const amountFromParams = searchParams.get("amount") || "";

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

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: FormType) => {
      const response = await axiosInstance.post<Order>(`/add-money`, data);
      return response.data;
    },
    onSuccess: (data: Order) => {
      if (data.status === false) {
        showErrorAlert(data.message);
      } else {
        showSuccessAlert(data.message);
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
      <MainContainer className="px-4 pb-10 py-12">
        <p className="text-lg text-gray-400 text-center font-semibold mb-6 tracking-wide">
          Add Wallet Balance
        </p>

        <div className="h-full overflow-auto max-w-3xl mx-auto w-full bg-gradient-to-br from-gray-900/80 via-gray-800/80 to-gray-900/70 backdrop-blur-xl p-6 rounded-2xl shadow-xl border border-gray-700">
          <div className="mt-2">
            <GenericForm
              schema={WalletSchema(phoneAllow)}
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
                {method && (
                  <div className="mt-5 p-4 rounded-xl bg-gray-900/80 border border-gray-700 shadow-inner">
                    {method.description && (
                      <div
                        className="text-gray-300 text-sm leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: method.description }}
                      />
                    )}

                    <p className="text-sm text-gray-100 mt-3 flex items-center gap-3">
                      <span className="font-medium">Number:</span>
                      <span className="font-mono tracking-wide">
                        {method.number}
                      </span>
                      <span
                        className="px-3 py-1 border border-gray-600 rounded-lg hover:bg-gray-700 cursor-pointer transition-all"
                        onClick={() => copy(method?.number)}
                      >
                        {copied ? (
                          <IoCheckmarkDone className="text-green-400" />
                        ) : (
                          <FaCopy />
                        )}
                      </span>
                    </p>
                  </div>
                )}

                {/* Inputs */}
                {!phoneAllow && (
                  <TextField
                    label="Payment Number"
                    name="payment_number"
                    type="number"
                    placeholder="Enter payment number"
                    inputClass="form-input rounded-lg border-gray-600 focus:ring-2 focus:ring-purple-500"
                  />
                )}
                <TextField
                  label="Transaction ID"
                  name="transaction_id"
                  type="text"
                  placeholder="Enter your transaction ID"
                  inputClass="form-input rounded-lg border-gray-600 focus:ring-2 focus:ring-purple-500"
                />

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
