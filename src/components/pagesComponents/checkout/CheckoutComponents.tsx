"use client";

import MainContainer from "@/components/container/MainContainer";
import { TextField } from "@/components/Form/fields/TextField";
import { GenericForm, GenericFormRef } from "@/components/Form/GenericForm";
import { useRef, useState, useEffect } from "react";
import { z } from "zod";
import Subtotal from "./SubtotalCard";
import { usePurchaseStore } from "@/lib/store/checkoutStore/checkoutStore";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { IPaymentMethod } from "@/types/paymentMethodDataType/paymentMethodDataType";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios/AxiosInstance";
import { CopyToClipboard } from "@/components/shared/copyClipboard/copyClipboard";
import { useRouter } from "next/navigation";
import { IOrderResponse } from "@/types/orderDataType/orderDataType";
import { useOrderStore } from "@/lib/store/orderStore/orderStore";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LoadingButton } from "@/components/shared/submitButton/submitButton";
import { showErrorAlert } from "@/components/shared/toast/ToastModal";
import { useUserStore } from "@/lib/store/authStore/authStore";
import { FaRegCopy } from "react-icons/fa";
import { LuCheckCheck } from "react-icons/lu";
import LoginModal from "@/components/shared/modal/loginModal";
import { playerAddressSchema } from "@/schema/palyerAddressSchema/playerAddressSchema";

/* ---------- 1. Conditional Zod schema ---------- */

/* ---------- 2. Component ---------- */
const CheckoutComponentaa = ({
  paymentMethod,
  token,
}: {
  paymentMethod: IPaymentMethod[];
  token: string | undefined;
}) => {
  const { count, formData, product_id, items_id } = usePurchaseStore();

  const { user } = useUserStore.getState();
  const loggedIn = !!token && token !== "undefined";

  type FormType = z.infer<ReturnType<typeof playerAddressSchema>>;
  const [loading, setLoading] = useState(false);
  const formRef = useRef<GenericFormRef<FormType>>(null);
  const router = useRouter();
  const [selectedMethod, setSelectedMethod] = useState(
    paymentMethod[0]?.id.toString()
  );

  /* ---------- initial form values ---------- */
  const initialValues: FormType = {
    number: "",
    method_id: selectedMethod,
    transaction_id: "",
    name: user?.name || "",
    phone: "",
    email: user?.email || "",
  };

  const { setOrder, setTitle } = useOrderStore.getState();
  const { copy, copied } = CopyToClipboard();

  /* ---------- mutation ---------- */
  const { mutate, isPending } = useMutation({
    mutationFn: async (data: FormType): Promise<IOrderResponse> => {
      const { name, email, number, method_id, transaction_id } = data;
      const [customer_data, others] = Object.values(formData);

      const finalData = {
        name: loggedIn ? user?.name : name,
        // phone: loggedIn ? user?.phone : phone,
        email: loggedIn ? user?.email : email,
        number,
        method_id: Number(method_id),
        transaction_id,
        product_id,
        quantity: count,
        items_id,
        ...(customer_data && { customer_data }),
        ...(others && { others }),
      };
      const res = await axiosInstance.post("/add-order", finalData);
      return res.data;
    },
    onSuccess: (data) => {
      if (data?.status === true) {
        setOrder(data.order);
        setTitle(data.message);
        router.replace("/thank-you");
      } else {
        showErrorAlert(data?.message);
        setLoading(false);
      }
      // setLoading(false);
    },
    onError: (err: any) => {
      showErrorAlert(err.message.message);
      setLoading(false);
    },
  });
  /* ---------- keep methodId in sync ---------- */
  useEffect(() => {
    formRef.current?.setValue("method_id", selectedMethod);
  }, [selectedMethod]);

  /* ---------- onSubmit ---------- */
  const handleSubmit = (data: FormType | React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    if ("preventDefault" in data) return; // guard for RHF internal event
    mutate(data);
  };
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(true);

  // const [modalOPen, setMOdalOpen] = useState(true);
  /* ---------- render ---------- */
  return (
    <>
      {" "}
      <LoginModal isOpen={open} onClose={() => setOpen(false)} />
      <div className="w-full">
        {!product_id && !items_id ? (
          <Shopping />
        ) : (
          <MainContainer>
            {show && (
              <div className=" mx-auto flex items-center justify-between gap-4 p-3 border border-gray-700 rounded-lg shadow-sm md:w-[700px] w-full">
                <p className="text-white font-medium">
                  ⚠ Please log in to continue
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setOpen(true)}
                    className="px-4 py-2 text-sm font-semibold text-white button-color rounded-md transition"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => setShow(false)}
                    className="px-4 py-2 text-sm font-semibold text-yellow-700 bg-white border border-yellow-400 rounded-md hover:bg-yellow-50 transition"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
            <div
              className={`${
                loggedIn ? "md:w-8/12" : "md:w-11/12"
              } w-full mx-auto text-white`}
            >
              <GenericForm
                schema={playerAddressSchema(loggedIn)}
                initialValues={initialValues}
                onSubmit={handleSubmit}
                ref={formRef}
              >
                {/* 👇 grid cols conditional */}
                <div
                  className={`grid ${
                    loggedIn ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2"
                  } gap-5 p-3`}
                >
                  {/* Billing (only guest) */}
                  {!loggedIn && (
                    <div className=" p-3 rounded bg-mainlight">
                      <h6 className="uppercase font-medium">Billing details</h6>
                      <div className="mt-5 space-y-3">
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

                  {/* Order Section */}
                  <div>
                    <Subtotal />
                    <Tabs
                      defaultValue={selectedMethod}
                      onValueChange={setSelectedMethod}
                      className="w-full"
                    >
                      <TabsList className="w-full h-auto overflow-hidden bg-mainlight">
                        {paymentMethod.map((m) => (
                          <TabsTrigger
                            key={m.id}
                            value={m.id.toString()}
                            className="h-14"
                          >
                            <Image
                              src={m.icon}
                              alt={m.method}
                              width={80}
                              height={50}
                              className="h-full w-auto"
                            />
                            {m.method}
                          </TabsTrigger>
                        ))}
                      </TabsList>

                      {paymentMethod.map((m) => (
                        <TabsContent key={m.id} value={m.id.toString()}>
                          <div className="mt-4 p-3 rounded shadow bg-mainlight">
                            <p className="text-sm whitespace-pre-line mb-4">
                              {m.description}
                            </p>
                            <p className="text-sm font-semibold flex items-center gap-3">
                              Number: {m.number}{" "}
                              <span
                                onClick={() => copy(m.number)}
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
                        </TabsContent>
                      ))}
                    </Tabs>

                    <LoadingButton
                      className="button-color"
                      type="submit"
                      loading={isPending || loading}
                    >
                      Place Order
                    </LoadingButton>
                  </div>
                </div>
              </GenericForm>
            </div>
          </MainContainer>
        )}
      </div>
    </>
  );
};

export default CheckoutComponentaa;

/* ---------- small sub‑components ---------- */
const PaymentForm = () => (
  <div className="mt-4 space-y-3 ">
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

const Shopping = () => (
  <div className="flex mt-6 flex-col items-center justify-center gap-6 bg-gray-950 p-4 text-white">
    <div className="text-center space-y-2">
      <h2 className="text-2xl font-bold">No Item Selected</h2>
      <p className="text-base text-gray-400">
        Looks like you {`haven't`} added any item yet.
      </p>
    </div>
    <Button asChild className="px-6 py-3 text-base">
      <Link href="/">Continue Shopping</Link>
    </Button>
  </div>
);
