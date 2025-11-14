"use client";

import MainContainer from "@/components/container/MainContainer";
import { TextField } from "@/components/Form/fields/TextField";
import { GenericForm, GenericFormRef } from "@/components/Form/GenericForm";
import { CopyToClipboard } from "@/components/shared/copyClipboard/copyClipboard";
import CouponModal from "@/components/shared/modal/CouponModal";
import LoginModal from "@/components/shared/modal/loginModal";
import PhoneNumberUpdateModal from "@/components/shared/modal/PhoneNumberUpdateModal";
import SectionOne from "@/components/shared/modal/SectionOne";
import ThankyouModal from "@/components/shared/modal/ThankyouModal";
import { LoadingButton } from "@/components/shared/submitButton/submitButton";
import { showErrorAlert } from "@/components/shared/toast/ToastModal";
import axiosInstance from "@/lib/axios/AxiosInstance";
import { getProfile } from "@/lib/fetch/profile";
import { useGetData } from "@/lib/fetch/useGetData";
import { usePurchaseStore } from "@/lib/store/checkoutStore/checkoutStore";
import { useProductSelectionStore } from "@/lib/store/productSelectStore/productSelectStore";
import { cn } from "@/lib/utils";
import { playerAddressSchema } from "@/schema/playerAddressSchema/playerAddressSchema";
import { IModalData } from "@/types/modalData/modalData";
import { IOrderResponse } from "@/types/orderDataType/orderDataType";
import {
  PaymentMethod,
  paymentMethodResponse,
} from "@/types/paymentMethod/paymentMethod";
import { Profile } from "@/types/profile/profile";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { z } from "zod";

export default function CheckoutComponent() {
  const token = Cookies.get("FFT");
  const { data: paymentMethod } = useGetData<paymentMethodResponse>(
    ["paymentMethod"],
    `/payment-method`
  );
  const { data: profileData, refetch } = useGetData<Profile>(
    ["profile"],
    `/my-profile`
  );

  const filteredPaymentMethods = !token
    ? paymentMethod?.data.filter((item) => item.method !== "Wallet")
    : paymentMethod?.data;

  type FormType = z.infer<ReturnType<typeof playerAddressSchema>>;
  const loggedIn = !!token && token !== "undefined";
  const formRef = useRef<GenericFormRef<FormType>>(null);
  const [method, setMethod] = useState<PaymentMethod>();
  console.log(method);
  const [wallet, setWallet] = useState<boolean>(false);
  useEffect(() => {
    if (filteredPaymentMethods?.length && !method) {
      const defaultMethod = token
        ? filteredPaymentMethods[0]
        : filteredPaymentMethods.find((m) => m.method !== "Wallet") ??
          filteredPaymentMethods[0];

      setMethod(defaultMethod);
    }
  }, [filteredPaymentMethods, method, token]);

  useEffect(() => {
    if (method?.method === "Wallet") {
      setWallet(true);
    } else {
      setWallet(false);
    }
  }, [method]);
  useEffect(() => {
    if (method) {
      formRef.current?.setValue("method_id", (method?.id).toString());
    }
  }, [method]);
  const { copy, copied } = CopyToClipboard();
  const { selectedItem } = useProductSelectionStore();
  const { count, formData, product_id, items_id, reset, name, balance } =
    usePurchaseStore();
  const formValue = Object.values(formData)[0];
  const { data: profile } = getProfile(loggedIn);
  const [orderData, setOrderData] = useState<IOrderResponse>();
  const [phoneAllow, setPhoneAllow] = useState<boolean>(true);
  const [transactionAllow, setTransactionAllow] = useState<boolean>(true);

  const router = useRouter();

  const initialValues: FormType = {
    number: "",
    method_id: method?.id.toString() || "",
    transaction_id: "",
    name: profile?.user?.name || "",
    phone: profile?.user?.phone || "",
    email: profile?.user?.email || "",
  };
  useEffect(() => {
    if (profile) {
      formRef.current?.reset({
        name: profile?.user?.name || "",
        phone: profile?.user?.phone || "",
        email: profile?.user?.email || "",
        number: "",
        transaction_id: "",
        method_id: method?.id.toString(),
      });
    }
  }, [profile, method]);
  const [modal, setModal] = useState(false);
  const [modalData, setModalData] = useState<IModalData>({
    item_name: "",
    product_name: "",
    method: "",
  });
  const { mutate, isPending } = useMutation({
    mutationFn: async (data: FormType) => {
      const cleanedData = Object.fromEntries(
        Object.entries(data).filter(([key, value]) => {
          if ((key === "number" || key === "transaction_id") && value === "") {
            return false;
          }
          return true;
        })
      );
      const finalData = {
        ...cleanedData,
        product_id,
        quantity: count,
        customer_data: formValue,
        items_id: Number(items_id),
        number: "",
        transaction_id: "",
      };
      // console.log("finalData", finalData);
      // return;
      setModalData({
        item_name: selectedItem?.name,
        product_name: name,
        method: method?.method,
      });
      const response = await axiosInstance.post<IOrderResponse>(
        `/add-order`,
        finalData
      );
      return response.data;
    },

    onSuccess: (data: IOrderResponse) => {
      if (data.status === false) {
        showErrorAlert(data.message);
      } else if (data.paymentUrl !== null) {
        window.open(data.paymentUrl, "_blank");
      } else {
        setOrderData(data);
        setModal(true);
        setTimeout(() => {
          formRef.current?.reset();
        }, 100);
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

  const [couponModal, setCouponModal] = useState(false);
  const [phoneNumberModal, setPhoneNumberModal] = useState(false);
  const [warningModal, setWarningModal] = useState(false);
  const [coupon, setCoupon] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (profileData?.user?.phone === null) {
      setWarningModal(true);
    }
    if (method?.id === 4) {
      setTransactionAllow(false);
    }
  }, [profile]);

  if (!formData || count === 0 || !product_id) {
    return <ContinueShopping />;
  }

  return (
    <>
      <ThankyouModal
        modalData={modalData}
        isOpen={modal}
        onClose={() => {
          setModal(false), router.push(loggedIn ? "/my-order" : "/"), reset();
        }}
        OrderData={orderData}
      />
      <CouponModal
        isOpen={couponModal}
        onClose={() => setCouponModal(false)}
        setCoupon={setCoupon}
        coupon={coupon}
      />
      {phoneNumberModal === true && (
        <PhoneNumberUpdateModal
          isOpen={phoneNumberModal}
          onClose={() => setPhoneNumberModal(false)}
          // refetch={refetch}
          setWarningModal={setWarningModal}
        />
      )}
      <LoginModal isOpen={open} onClose={() => setOpen(false)} />

      <MainContainer className="px-3 pb-8">
        <div className="w-full h-full text-gray-200 overflow-auto scroll-hidden">
          <div className="mt-3">
            <GenericForm
              schema={playerAddressSchema(
                loggedIn,
                wallet,
                phoneAllow,
                transactionAllow
              )}
              initialValues={initialValues}
              onSubmit={handleSubmit}
              ref={formRef}
            >
              {warningModal && (
                <div className="mt- border px-4 py-3 rounded mb-4 flex items-center justify-between md:w-2/4 w-full mx-auto md:text-[14px] text-[10px]">
                  <span>⚠️ Please add your mobile number to continue.</span>
                  <div
                    onClick={() => setPhoneNumberModal(true)}
                    className="ml-4 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition cursor-pointer"
                  >
                    Add Number
                  </div>
                </div>
              )}

              <div
                className={cn(
                  "grid grid-cols-12 gap-6",
                  token ? "md:w-8/12 mx-auto w-full" : "w-full"
                )}
              >
                <div
                  className={cn(
                    token
                      ? "md:col-span-12 col-span-12"
                      : "md:col-span-8 col-span-12"
                  )}
                >
                  <SectionOne />
                  {!token && (
                    <div className="mt-6">
                      <h6 className="font-semibold text-[18px]">
                        Billing details
                      </h6>

                      <div className="p-4 rounded-lg bg-mainlight mt-3">
                        <div className="mt-3 space-y-5">
                          <TextField
                            label="Full name"
                            name="name"
                            type="text"
                            placeholder="Enter your full name"
                            inputClass="px-3 border border-gray-300 rounded-lg text-gray-800 text-[16px] bg-gray-50"
                          />
                          <TextField
                            label="Phone"
                            name="phone"
                            type="number"
                            placeholder="Enter your phone number"
                            inputClass="px-3 border border-gray-300 rounded-lg text-gray-800 text-[16px] bg-gray-50"
                          />
                          <TextField
                            label="Email"
                            name="email"
                            type="text"
                            placeholder="Enter your email address"
                            inputClass="px-3 border border-gray-300 rounded-lg text-gray-800 text-[16px] bg-gray-50"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Right Column */}
                <div
                  className={cn(
                    token
                      ? "md:col-span-12 col-span-12"
                      : "md:col-span-4 col-span-12"
                  )}
                >
                  <h6 className="font-semibold text-[18px]">Payment Method</h6>
                  <div className="p-4 rounded-lg bg-mainlight space-y-4 mt-3">
                    <div className="grid grid-cols-3 gap-4">
                      {filteredPaymentMethods?.map((item, index) => (
                        <div
                          key={index}
                          onClick={(e) => {
                            e.stopPropagation();
                            setMethod(item);
                          }}
                          className={`p-2 rounded-lg cursor-pointer border-2 transition-all duration-200 ${
                            method?.id.toString() === item.id.toString()
                              ? "border-purple-500 shadow-md shadow-purple-300 bg-purple-200"
                              : "border-gray-300 hover:border-gray-400  bg-white"
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

                    {method?.method !== "Wallet" ? (
                      <>
                        {method?.id !== 4 && (
                          <>
                            {" "}
                            <p className="text-[20px] flex items-center justify-between gap-3 p-4 bg-[#20243a] rounded-xl">
                              <span>{method?.number}</span>
                              <span
                                onClick={() => copy(`${method?.number}`)}
                                className="px-3 py-1 text-sm cursor-pointer hover:text-gray-400 border border-gray-100 rounded"
                              >
                                {copied ? "Copied" : "Copy"}
                              </span>
                            </p>
                            {method?.method !== "Wallet" && (
                              <PaymentForm
                                phoneAllow={phoneAllow}
                                transactionAllow={transactionAllow}
                              />
                            )}
                            <div
                              className="game-description-content border rounded-md"
                              dangerouslySetInnerHTML={{
                                __html: (method?.description || "").replaceAll(
                                  "[amount]",
                                  (balance * count).toString()
                                ),
                              }}
                            />
                          </>
                        )}
                      </>
                    ) : (
                      <p className="text-sm font-semibold flex items-center gap-3">
                        Wallet Balance:{" "}
                        {profileData?.user?.wallet?.toLocaleString()} Tk
                      </p>
                    )}
                  </div>

                  <LoadingButton
                    disabled={warningModal || isPending}
                    className={cn("button-color w-full mt-3")}
                    type="submit"
                  >
                    {isPending ? "Processing" : "Pay Now"}
                  </LoadingButton>
                </div>
              </div>
            </GenericForm>
          </div>
        </div>
      </MainContainer>
    </>
  );
}

/* ---------- small sub-components ---------- */
const PaymentForm = ({
  phoneAllow,
  transactionAllow,
}: {
  phoneAllow: boolean;
  transactionAllow: boolean;
}) => (
  <div className="mt-4 space-y-5">
    {!phoneAllow && (
      <TextField
        label="Account Number"
        name="number"
        type="number"
        placeholder="Enter your account number"
        inputClass="px-3 border border-gray-300 rounded-lg text-gray-800 bg-gray-50"
      />
    )}
    {!transactionAllow && (
      <TextField
        label="Transaction Id"
        name="transaction_id"
        type="text"
        placeholder="transaction id"
        inputClass="px-3 border border-gray-300 rounded-lg text-gray-800 bg-gray-50"
      />
    )}
  </div>
);

const ContinueShopping = () => {
  return (
    <MainContainer className="flex flex-col items-center justify-center h-[80vh] text-gray-200 px-3 pt-8">
      <FiShoppingCart className="text-[90px] mb-4 text-red-400" />
      <h2 className="text-xl font-semibold mb-2">Not added any items</h2>
      <p className="text-gray-400 mb-6 text-center">
        Looks like you haven’t added any top-ups or subscription packages yet.{" "}
        <br />
        Explore our gaming offers and add your first package to get started!
      </p>
      <Link href="/">
        <button className="flex items-center gap-2 px-6 py-3 rounded-2xl button-color transition">
          <FaShoppingCart className="text-lg" />
          Explore
        </button>
      </Link>
    </MainContainer>
  );
};
