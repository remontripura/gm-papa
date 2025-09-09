"use client";

import React, { useRef } from "react";
import { RxCross2 } from "react-icons/rx";
import { GenericForm, GenericFormRef } from "@/components/Form/GenericForm";
import { z } from "zod";
import { TextField } from "@/components/Form/fields/TextField";
import { LoadingButton } from "../submitButton/submitButton";
import { couponSchema } from "@/schema/searchSchema/searchSchema";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useScrollLock } from "@/lib/useScrollLock/useScrollLock";

export default function CouponModal({ isOpen, onClose, setCoupon, coupon }) {
  type FormType = z.infer<typeof couponSchema>;
  const formRef = useRef<GenericFormRef<FormType>>(null);
  useScrollLock(isOpen);
  if (!isOpen) return null;

  const initialValues: FormType = {
    coupon: "",
  };

  const handleSubmit = (data: FormType | React.FormEvent<HTMLFormElement>) => {
    console.log(data);
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/50 backdrop-blur-[4px] flex items-center justify-center z-[60]"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative rounded-xl p-3 md:w-[450px] w-[98%] h-fit max-h-[90vh] overflow-hidden shadow-lg bg-gray-100"
      >
        <div
          onClick={onClose}
          className="absolute right-3 top-3 size-8 flex items-center justify-center text-white rounded-full bg-gray-400 hover:bg-gray-500 cursor-pointer z-20"
        >
          <RxCross2 />
        </div>
        <div className="w-full h-full text-gray-500 overflow-auto scroll-hidden">
          <h6 className="font-semibold text-gray-800 text-[20px]">Coupon</h6>

          <div className="mt-3">
            <GenericForm
              schema={couponSchema}
              initialValues={initialValues}
              onSubmit={handleSubmit}
              ref={formRef}
            >
              <div className="flex items-center justify-between gap-1 w-full">
                <div className="w-full">
                  <TextField
                    name="name"
                    type="text"
                    placeholder="Enter your full name"
                    inputClass="form-input w-full"
                  />
                </div>

                <LoadingButton
                  className={cn("button-color", "w-fit mt-0")}
                  type="submit"
                >
                  Coupon
                </LoadingButton>
              </div>
            </GenericForm>
            {/* Coupon Cards */}
            <div className="mt-4 grid gap-3 h-[300px] overflow-auto scroll-hidden">
              {Array.from({ length: 8 }).map((_, index) => (
                <div
                  key={index}
                  onClick={() => setCoupon(index)}
                  className={cn(
                    "border-2 rounded-xl h-[120px] overflow-hidden cursor-pointer transition-all duration-200 p-2",
                    coupon === index ? "border-purple-500" : "border-gray-300"
                  )}
                >
                  <Image
                    src="https://img.freepik.com/free-vector/gaming-design-template_23-2149883145.jpg?t=st=1755166138~exp=1755169738~hmac=e248efaa14e3b8f2d5f65739c1b505229fa2e18fa3ca0e1a32bbfa9a0f4d96d5"
                    alt="coupon"
                    width={300}
                    height={300}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center mt-4">
              <p>Reduce</p>
              <p className="text-orange-500 font-semibold">-{coupon + 10}%</p>
            </div>
            <button className="w-full button-color py-2 rounded-md text-white mt-4">
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
