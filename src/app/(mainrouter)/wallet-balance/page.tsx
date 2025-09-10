"use client";

import { GenericForm, GenericFormRef } from "@/components/Form/GenericForm";
import { z } from "zod";
import Cookies from "js-cookie";
import { TextField } from "@/components/Form/fields/TextField";

import MainContainer from "@/components/container/MainContainer";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios/AxiosInstance";
import { Order } from "@/types/orderDataType/orderDataType";
import { AxiosError } from "axios";
import { showErrorAlert } from "@/components/shared/toast/ToastModal";
import { addWalletSchema } from "@/schema/addWalletSchema/addWalletSchema";
import { useEffect, useRef, useState } from "react";
import { LoadingButton } from "@/components/shared/submitButton/submitButton";
import { cn } from "@/lib/utils";
import { useGetData } from "@/lib/fetch/useGetData";
import {
  PaymentMethod,
  paymentMethodResponse,
} from "@/types/paymentMethod/paymentMethod";
import Image from "next/image";
export default function WalletBalance() {
  const [method, setMethod] = useState<PaymentMethod>();

  const token = Cookies.get("GM_T");
  const { data: paymentMethod } = useGetData<paymentMethodResponse>(
    ["paymentMethod"],
    `/payment-method`
  );
  const filteredPaymentMethods = paymentMethod?.data.filter(
    (item) => item.method !== "Wallet"
  );

  const formRef = useRef<GenericFormRef<FormType>>(null);
  type FormType = z.infer<typeof addWalletSchema>;
  const initialValues: FormType = {
    amount: "",
    payment_id: "22",
    payment_number: "",
    transaction_id: "",
  };
  useEffect(() => {
    if (paymentMethod) {
      formRef.current?.reset({
        amount: "",
        payment_id: filteredPaymentMethods?.[0]?.id?.toString() || "",
        payment_number: "",
        transaction_id: "",
      });
    }
  }, [paymentMethod]);
  const { mutate, isPending } = useMutation({
    mutationFn: async (data: FormType) => {
      const response = await axiosInstance.post<Order>(`/add-money`, data);
      return response.data;
    },
    onSuccess: (data: Order) => {
      if (data.status === false) {
        showErrorAlert(data.message);
      } else {
      }
    },
    onError: (
      err: AxiosError<{ message: { message: string } }> & {
        message: { message: string };
      }
    ) => {
      showErrorAlert(err.message.message);
    },
  });

  const handleSubmit = (data: FormType | React.FormEvent<HTMLFormElement>) => {
   mutate(data as FormType);
  };

  return (
    <>
      <MainContainer className="px-3 pb-8 pt-10">
        <p className="text-gray-500 text-center font-medium mb-5">
          Add Wallet Balance
        </p>
        <div className=" h-full text-gray-200 overflow-auto scroll-hidden max-w-3xl mx-auto w-full bg-mainlight p-5 rounded-xl">
          <div className="mt-3">
            <GenericForm
              schema={addWalletSchema}
              initialValues={initialValues}
              onSubmit={handleSubmit}
              ref={formRef}
            >
              <div className="mt-4 space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  {filteredPaymentMethods?.map((item, index) => (
                    <div
                      key={index}
                      onClick={(e) => {
                        e.stopPropagation();
                        setMethod(item);
                      }}
                      className={`p-2 rounded-lg cursor-pointer border-2 transition-all bg-white duration-200 ${
                        method?.id.toString() === item.id.toString()
                          ? "border-purple-500"
                          : "border-gray-300 hover:border-gray-400"
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
                {/* <TextField
                  label="Amont ৳"
                  name="payment_id"
                  type="number"
                  placeholder="Enter your account"
                  inputClass="form-input"
                /> */}
                <TextField
                  label="Amont ৳"
                  name="amount"
                  type="number"
                  placeholder="Enter your account"
                  inputClass="form-input"
                />

                <TextField
                  label="Payment Number"
                  name="payment_number"
                  type="number"
                  placeholder="Enter payment number"
                  inputClass="form-input"
                />
                <TextField
                  label="Transaction Id"
                  name="transaction_id"
                  type="text"
                  placeholder="Enter your transaction id"
                  inputClass="form-input"
                />
                <LoadingButton
                  // disabled={warningModal || isPending}
                  className={cn("button-color w-full mt-3")}
                  type="submit"
                >
                  Add Wallet
                  {/* {isPending ? "Processing" : "Pay Now"} */}
                </LoadingButton>
              </div>
            </GenericForm>
          </div>
        </div>
      </MainContainer>
    </>
  );
}
