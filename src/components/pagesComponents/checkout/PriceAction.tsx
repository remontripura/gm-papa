"use client";

import { useSelectedItemStore } from "@/lib/store/productSelectStore/activeItemSelected";
import { useProductSelectionStore } from "@/lib/store/productSelectStore/productSelectStore";
import { cn } from "@/lib/utils";
import { IGameData, IItem } from "@/types/productsDataType/SingleProductType";

export default function PriceAction({
  singleProduct,
}: {
  singleProduct: IGameData;
}) {
  const { active, setActive, setSelectedItem } = useProductSelectionStore();
  const { setSelected } = useSelectedItemStore();

  // Function to detect if device is mobile
  const isMobile = () => {
    if (typeof window !== "undefined") {
      return window.innerWidth <= 768; // md breakpoint এর নিচে হলে mobile ধরবো
    }
    return false;
  };

  const handleSelectItem = (item: IItem) => {
    setSelected(true);
    setActive(item.name);
    setSelectedItem(item);

    // শুধু mobile এ scroll করবে
    if (isMobile()) {
      setTimeout(() => {
        const formElement = document.getElementById("form-section");
        formElement?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 0);
    }
  };

  return (
    <div className="grid md:grid-cols-4 grid-cols-2 md:gap-4 gap-2 mt-8 bg-mainlight p-2 rounded-lg">
      {singleProduct.items.map((item, idx) => {
        const isLast = idx === singleProduct.items.length - 1;
        const isOdd = singleProduct.items.length % 2 === 1;
        const lastOdd = isLast && isOdd;
        const isActive = active === item.name;

        const isIOS =
          typeof navigator !== "undefined" &&
          /iPad|iPhone|iPod/.test(navigator.userAgent);

        return (
          <div
            key={item.id}
            onClick={() => {
              if (!isIOS) handleSelectItem(item);
            }}
            onTouchEnd={() => {
              if (isIOS) handleSelectItem(item);
            }}
            className={cn(
              "relative rounded-lg border border-transparent p-2 py-3 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 ease-out",
              "bg-mainDark text-white shadow-sm hover:shadow-md",
              "hover:border-[var(--custom-orange)] hover:scale-[1.02]",
              isActive && "border-[var(--custom-orange)] shadow-lg",
              lastOdd &&
                "col-span-2 md:col-span-1 justify-self-center md:justify-self-auto"
            )}
          >
            <p className="text-[10px] md:text-sm font-medium text-center">
              {item.name}
              <sup className="ml-1 text-orange-500 font-semibold">
                {item.price}৳
              </sup>
            </p>
          </div>
        );
      })}
    </div>
  );
}
