"use client";

import React, { useRef, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { GenericForm, GenericFormRef } from "@/components/Form/GenericForm";
import { z } from "zod";
import { TextField } from "@/components/Form/fields/TextField";
import { cn } from "@/lib/utils";
import { useScrollLock } from "@/lib/useScrollLock/useScrollLock";
import { LoadingButton } from "../submitButton/submitButton";
import { useRouter } from "next/navigation";
import { addWalletSchema } from "@/schema/addWallet/addWallet";

type FormType = z.infer<typeof addWalletSchema>;
const initialValues: FormType = {
  amount: "",
};
type props = {
  isOpen: boolean;
  onClose: () => void;
  setWalletModal: React.Dispatch<React.SetStateAction<boolean>>;
};
export default function WalletModalCom({ isOpen, onClose }: props) {
  const formRef = useRef<GenericFormRef<FormType>>(null);
  const [loading, setLoading] = useState(false);
  useScrollLock(isOpen);
  if (!isOpen) return null;
  const router = useRouter();

  const handleSubmit = (data: FormType | React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    router.push("/wallet-balance");
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
            Add Wallet Amount
          </h6>

          <div className="mt-3">
            <GenericForm
              schema={addWalletSchema}
              initialValues={initialValues}
              onSubmit={handleSubmit}
              ref={formRef}
            >
              <div className="w-full space-y-6">
                <TextField
                  name="amount"
                  type="number"
                  placeholder="0.00"
                  inputClass="form-input w-full !text-gray-800"
                />
                <LoadingButton
                  className={cn("button-color", "w-full mt-0")}
                  type="submit"
                >
                  {loading ? "Processing" : "Add Wallet"}
                </LoadingButton>
              </div>
            </GenericForm>
          </div>
        </div>
      </div>
    </div>
  );
}
