"use client";

import { TextField } from "@/components/Form/fields/TextField";
import { GenericForm, GenericFormRef } from "@/components/Form/GenericForm";
import { useEffect, useRef, useState } from "react";
import { z, ZodRawShape } from "zod";
import { FiPlus, FiMinus } from "react-icons/fi";
import { SubmitHandler } from "react-hook-form";
import { usePurchaseStore } from "@/lib/store/checkoutStore/checkoutStore";
import { motion } from "framer-motion";
import { showErrorModal } from "@/components/shared/toast/ToastModal";
import { useRouter } from "next/navigation";
import { BounceLoader } from "react-spinners";
import { useProductSelectionStore } from "@/lib/store/productSelectStore/productSelectStore";
import { useSelectedItemStore } from "@/lib/store/productSelectStore/activeItemSelected";

const SingleProductComponents = ({ singleProduct }: { singleProduct: any }) => {
  const { selectedItem, setActive, setSelectedItem } =
    useProductSelectionStore();
  const { select } = useSelectedItemStore();

  // useEffect(() => {
  //   if (singleProduct.items.length > 0) {
  //     setActive(singleProduct.items[0].name);
  //     setSelectedItem(singleProduct.items[0]);
  //   }
  // }, [singleProduct, setActive, setSelectedItem]);
  const {
    count,
    setCount,
    setFormData,
    setBalance,
    setItemsId,
    setProductId,
    setName,
  } = usePurchaseStore();

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count > 1 ? count - 1 : 1);

  const inputCount = singleProduct.total_input || 1;

  const inputNames: string[] = [];
  for (let i = 0; i < inputCount; i++) {
    if (i === 0 && singleProduct["input_name"]) {
      inputNames.push(singleProduct["input_name"]);
    } else if (i === 1 && singleProduct["input_others"]) {
      inputNames.push(singleProduct["input_others"]);
    } else {
      inputNames.push(`input_${i}`);
    }
  }
  const firstRender = useRef(true);

  // useEffect(() => {
  //   if (firstRender.current) {
  //     firstRender.current = false;
  //     return;
  //   }

  //   if (select) {
  //     const firstInput = document.querySelector(
  //       `input[name="${inputNames[0]}"]`
  //     ) as HTMLInputElement;

  //     if (firstInput) {
  //       setTimeout(() => {
  //         firstInput.focus();
  //       }, 1500);
  //     }
  //   }
  // }, [select, inputNames]);
  useEffect(() => {
  if (select) {
    const firstInput = document.querySelector(
      `input[name="${inputNames[0]}"]`
    ) as HTMLInputElement;

    if (firstInput) {
      firstInput.scrollIntoView({ behavior: "smooth", block: "center" });
      setTimeout(() => {
        firstInput.focus();
      }, 700); 
    }
  }
}, [select, inputNames]);


  const schemaShape: ZodRawShape = {};
  inputNames.forEach((name) => {
    schemaShape[name] = z.string().min(1, `Enter your ${name}`);
  });
  const schema = z.object(schemaShape);
  type FormData = z.infer<typeof schema>;
  const formRef = useRef<GenericFormRef<FormData>>(null);
  const router = useRouter();

  const initialValues: FormData = inputNames.reduce((acc, curr) => {
    acc[curr] = "";
    return acc;
  }, {} as Record<string, string>);
  const [loading, setLoading] = useState(false);
  const handleSubmit: SubmitHandler<FormData> = (data) => {
    setLoading(true);
    if (!selectedItem) {
      showErrorModal("Please select an item before proceeding.");
      setLoading(false);
      return;
    }
    setFormData(data);
    setBalance(selectedItem.price);
    setName(singleProduct.name);
    setProductId(String(singleProduct.id));
    setItemsId(String(selectedItem.id));
    router.push("/checkout");
  };

  const handleClear = () => {
    setActive("");
    setSelectedItem(null);
  };

  return (
    <>
      <div className="md:col-span-4 col-span-12 sticky top-0 self-start">
        <div className="" id="form-section">
          {selectedItem ? (
            <div className="text-center animate-fade-in duration-300 bg-mainlight p-3 mb-5 rounded-lg">
              <div className="w-full flex justify-between">
                <h6 className="font-medium">Order Info :</h6>
                <div
                  onClick={handleClear}
                  className="cursor-pointer bg-red-500 text-white px-4 py-1 rounded w-fit text-14 font-semibold"
                >
                  Clear
                </div>
              </div>
              <p className="font-semibold text-gray-400 flex gap-4 items-center">
                <span>Item :</span>
                <span className="">{selectedItem?.name}</span>
              </p>
              <p className="font-semibold text-gray-400 flex gap-4 items-center">
                <span>Price :</span>
                <span className="">Tk {selectedItem?.price * count}</span>
              </p>
              <p className="text-primary">{selectedItem.description}</p>
            </div>
          ) : (
            <p className="bg-mainlight/60 rounded-lg mb-4 p-3">
              Please select a item
            </p>
          )}
          <GenericForm
            schema={schema}
            initialValues={initialValues}
            onSubmit={handleSubmit}
            ref={formRef}
          >
            <div className="space-y-6">
              <div className="bg-mainlight p-3 rounded-lg">
                {inputNames.map((name) => (
                  <TextField
                    label={name}
                    key={name}
                    name={name}
                    placeholder={`Enter ${name}`}
                    inputClass="px-3 border border-gray-300 rounded-lg text-gray-800 text-[16px] mt-1 bg-gray-50"
                  />
                ))}
              </div>

              <div className=" bg-mainlight p-3 mt-5 rounded-lg">
                <h6 className="font-medium text-[14px] mb-3">
                  Product Quantity
                </h6>
                <div className="w-full grid grid-cols-3">
                  <button
                    type="button"
                    onClick={decrement}
                    className="text-center py-2 flex justify-center items-center  cursor-pointer border border-gray-500 rounded-md "
                  >
                    <FiMinus />
                  </button>
                  <div className=" py-2 text-center font-semibold">
                    <span>{count}</span>
                  </div>
                  <button
                    type="button"
                    onClick={increment}
                    className="text-center py-2 flex justify-center items-center  cursor-pointer border border-gray-500 rounded-md "
                  >
                    <FiPlus />
                  </button>
                </div>
                <motion.button
                  type="submit"
                  whileTap={{ scale: 0.9 }}
                  className="rounded flex justify-center items-center w-full mt-3 text-white font-medium py-2 bg-gradient-to-r from-[#E377FF] to-[#9477FF] cursor-pointer"
                >
                  {!loading ? (
                    "Go Payment"
                  ) : (
                    <BounceLoader
                      color="#ffffff"
                      size={23}
                      speedMultiplier={2}
                    />
                  )}
                </motion.button>
              </div>
            </div>
          </GenericForm>
        </div>
      </div>
    </>
  );
};

export default SingleProductComponents;
