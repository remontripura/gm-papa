"use client";

import React, { useRef } from "react";
import { RxCross2 } from "react-icons/rx";
import { GenericForm, GenericFormRef } from "@/components/Form/GenericForm";
import { z } from "zod";
import { TextField } from "@/components/Form/fields/TextField";
import { couponSchema } from "@/schema/searchSchema/searchSchema";
import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios/AxiosInstance";
import { AxiosError } from "axios";
import { useScrollLock } from "@/lib/useScrollLock/useScrollLock";
import { LoadingButton } from "../submitButton/submitButton";
import { showErrorAlert, showSuccessAlert } from "../toast/ToastModal";

type response = {
  status: boolean;
  message: string;
};
type FormType = z.infer<typeof couponSchema>;
const initialValues: FormType = {
  mobile: "",
};

export default function PhoneNumberUpdateModal({
  isOpen,
  onClose,
  refetch,
  setWarningModal,
}) {
  const formRef = useRef<GenericFormRef<FormType>>(null);
  useScrollLock(isOpen);
  if (!isOpen) return null;

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: FormType) => {
      const response = await axiosInstance.post<response>(
        `/mobile-number-update`,
        data
      );
      return response.data;
    },
    onSuccess: (data: response) => {
      if (data.status === false) {
        showErrorAlert(data.message);
      } else {
        showSuccessAlert(data.message);
        refetch();
        setWarningModal(false);
        onClose();
      }
    },
    onError: (
      err: AxiosError<{ message: { message: string } }> & {
        message: { message: string };
      }
    ) => {
      showErrorAlert(err.message.message || "Something went wrong");
    },
  });

  const handleSubmit = (data: FormType | React.FormEvent<HTMLFormElement>) => {
    mutate(data as FormType);
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
          <h6 className="font-semibold text-gray-800 text-[20px]">
            Update Phone
          </h6>

          <div className="mt-3">
            <GenericForm
              schema={couponSchema}
              initialValues={initialValues}
              onSubmit={handleSubmit}
              ref={formRef}
            >
              <div className="w-full space-y-6">
                <TextField
                  name="mobile"
                  type="number"
                  placeholder="Enter your phone number"
                  inputClass="form-input w-full !text-gray-800"
                />
                <LoadingButton
                  className={cn("button-color", "w-full mt-0")}
                  type="submit"
                >
                  {isPending ? "Processing" : "Update Phone"}
                </LoadingButton>
              </div>
            </GenericForm>
          </div>
        </div>
      </div>
    </div>
  );
}
