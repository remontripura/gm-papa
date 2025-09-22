"use client";

import Image from "next/image";
import React, { useRef, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { GenericForm, GenericFormRef } from "@/components/Form/GenericForm";
import { z } from "zod";
import Cookies from "js-cookie";
import { TextField } from "@/components/Form/fields/TextField";
import { CopyToClipboard } from "../copyClipboard/copyClipboard";
import { LuCheckCheck } from "react-icons/lu";
import { FaRegCopy } from "react-icons/fa";
import { useUserStore } from "@/lib/store/authStore/authStore";
import { useScrollLockss } from "@/lib/useScrollLock/useScrollLock";
import SectionTwo from "./SectionTwo";
import { LoadingButton } from "../submitButton/submitButton";
import { playerAddressSchema } from "@/schema/playerAddressSchema/playerAddressSchema";
import SectionOne from "./SectionOne";


export default function CheckoutModal({ isOpen, onClose, couponModal }) {
  type FormType = z.infer<ReturnType<typeof playerAddressSchema>>;
  const { user } = useUserStore.getState();
  const token = Cookies.get("gmpapa_token");
  const loggedIn = !!token && token !== "undefined";
  const formRef = useRef<GenericFormRef<FormType>>(null);
  const [method, setMethod] = useState(0);
  const { copy, copied } = CopyToClipboard();

  useScrollLockss(isOpen);
  if (!isOpen) return null;

  const paymentImages = [
    {
      id: "1",
      src: "https://www.logo.wine/a/logo/BKash/BKash-bKash-Logo.wine.svg",
    },
    {
      id: "2",
      src: "https://download.logo.wine/logo/Nagad/Nagad-Logo.wine.png",
    },
  ];

  const initialValues: FormType = {
    number: "",
    method_id: method.toLocaleString() || "",
    transaction_id: "",
    name: user?.name || "",
    phone: "",
    email: user?.email || "",
  };

  const handleSubmit = (data: FormType | React.FormEvent<HTMLFormElement>) => {
    console.log(data);
  };

  return (
    <>
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/10 backdrop-blur-[4px] flex items-center justify-center z-50"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="relative rounded-lg p-3 md:w-[600px] w-[98%] h-screen overflow-hidden shadow-lg  bg-gray-100 z-[51]"
        >
          <div
            onClick={onClose}
            className="absolute right-3 top-3 size-8 flex items-center justify-center text-white rounded-full bg-gray-400 hover:bg-gray-500 cursor-pointer z-20"
          >
            <RxCross2 />
          </div>
          <div className="w-full h-full text-gray-500 overflow-auto scroll-hidden ">
            <h6 className="font-semibold text-gray-800 text-[20px]">
              Confirm order
            </h6>

            <div className="mt-3">
              <GenericForm
                schema={playerAddressSchema(loggedIn)}
                initialValues={initialValues}
                onSubmit={handleSubmit}
                ref={formRef}
              >
                <div className="h-[80vh] overflow-auto scroll-hidden ">
                  <SectionOne />
                  <SectionTwo setOpen={couponModal} />
                  {!loggedIn && (
                    <div className="p-3 rounded bg-white mt-3">
                      <h6 className="font-semibold text-[18px] text-black">
                        Billing details
                      </h6>
                      <div className="mt-3 space-y-3">
                        <TextField
                          label="Full name"
                          name="name"
                          type="text"
                          placeholder="Enter your full name"
                          inputClass="form-input"
                        />
                        <TextField
                          label="Phone"
                          name="phone"
                          type="number"
                          placeholder="Enter your phone number"
                          inputClass="form-input"
                        />
                        <TextField
                          label="Email"
                          name="email"
                          type="text"
                          placeholder="Enter your email address"
                          inputClass="form-input"
                        />
                      </div>
                    </div>
                  )}

                  <div className="p-3 rounded bg-white space-y-4 mt-3">
                    <div className="flex flex-col gap-4">
                      {paymentImages.map((item, index) => (
                        <div
                          key={index}
                          onClick={(e) => {
                            e.stopPropagation();
                            setMethod(index);
                          }}
                          className={`p-2 rounded-lg cursor-pointer border-2 border-gray-300 transition-all duration-200 bg-white ${
                            method === index
                              ? "border-purple-500"
                              : " hover:border-gray-300"
                          }`}
                        >
                          <Image
                            src={item.src}
                            alt={`payment-${index}`}
                            width={120}
                            height={50}
                            className="object-contain h-10"
                          />
                        </div>
                      ))}
                    </div>
                    <p className="text-sm font-semibold flex items-center gap-3">
                      Number: {"01645304539"}{" "}
                      <span
                        onClick={() => copy("01645304539")}
                        className="px-3 py-1 cursor-pointer hover:text-gray-400 border border-gray-100 rounded"
                      >
                        {copied ? (
                          <LuCheckCheck className="size-5" />
                        ) : (
                          <FaRegCopy className="size-5" />
                        )}
                      </span>
                    </p>
                    <PaymentForm />
                  </div>
                </div>
                <LoadingButton
                  className="button-color w-full mt-3"
                  type="submit"
                  // loading={isPending || loading}
                >
                  {"Pay Now"}
                </LoadingButton>
              </GenericForm>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/* ---------- small sub‑components ---------- */
const PaymentForm = () => (
  <div className="mt-4 space-y-3">
    <TextField
      label="Customer Number"
      name="number"
      type="number"
      placeholder="Enter your account number"
      inputClass="form-input"
    />
    <TextField
      label="Transaction Number"
      name="transaction_id"
      type="text"
      placeholder="Enter your transaction number"
      inputClass="form-input"
    />
  </div>
);
