// "use client";

// import { useSelectedItemStore } from "@/lib/store/productSelectStore/activeItemSelected";
// import { useProductSelectionStore } from "@/lib/store/productSelectStore/productSelectStore";
// import { cn } from "@/lib/utils";
// import { IGameData, IItem } from "@/types/productsDataType/SingleProductType";

// export default function PriceAction({
//   singleProduct,
// }: {
//   singleProduct: IGameData;
// }) {
//   const { active, setActive, setSelectedItem } = useProductSelectionStore();
//   const { setSelected } = useSelectedItemStore();
//   const isMobile = () => {
//     if (typeof window !== "undefined") {
//       return window.innerWidth <= 768;
//     }
//     return false;
//   };
//   const handleSelectItem = (item: IItem) => {
//     setSelected(true);
//     setActive(item.name);
//     setSelectedItem(item);

//     if (isMobile()) {
//       setTimeout(() => {
//         const formElement = document.getElementById("form-section");
//         formElement?.scrollIntoView({ behavior: "smooth", block: "start" });
//       }, 0);
//     }
//   };

//   return (
//     <div className="grid md:grid-cols-4 grid-cols-2 md:gap-4 gap-2 mt-8 bg-mainlight p-2 rounded-lg">
//       {singleProduct.items.map((item, idx) => {
//         const isLast = idx === singleProduct.items.length - 1;
//         const isOdd = singleProduct.items.length % 2 === 1;
//         const lastOdd = isLast && isOdd;
//         const isActive = active === item.name;

//         const isIOS =
//           typeof navigator !== "undefined" &&
//           /iPad|iPhone|iPod/.test(navigator.userAgent);

//         return (
//           <div
//             key={item.id}
//             onClick={() => {
//               if (!isIOS) handleSelectItem(item);
//             }}
//             // onTouchEnd={() => {
//             //   if (isIOS) handleSelectItem(item);
//             // }}
//             className={cn(
//               "relative rounded-lg border border-transparent p-2 py-3 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 ease-out",
//               "bg-mainDark text-white shadow-sm hover:shadow-md",
//               "hover:border-[var(--custom-orange)] hover:scale-[1.02]",
//               isActive && "border-[var(--custom-orange)] shadow-lg",
//               lastOdd &&
//               "col-span-2 md:col-span-1 justify-self-center md:justify-self-auto"
//             )}
//           >
//             <p className="text-[10px] md:text-sm font-medium text-center">
//               {item.name}
//               <sup className="ml-1 text-orange-500 font-semibold">
//                 {item.price}৳
//               </sup>
//             </p>
//           </div>
//         );
//       })}
//     </div>
//   );
// }

"use client";

import { useSelectedItemStore } from "@/lib/store/productSelectStore/activeItemSelected";
import { useProductSelectionStore } from "@/lib/store/productSelectStore/productSelectStore";
import { cn } from "@/lib/utils";
import { IGameData, IItem } from "@/types/productsDataType/SingleProductType";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export default function PriceAction({
  singleProduct,
}: {
  singleProduct: IGameData;
}) {
  const { active, setActive, setSelectedItem } = useProductSelectionStore();
  const { setSelected } = useSelectedItemStore();
  const pathname = usePathname();

  const touchStartY = useRef<number | null>(null);
  const touchEndY = useRef<number | null>(null);

  const isMobile = () => {
    if (typeof window !== "undefined") {
      return window.innerWidth <= 768;
    }
    return false;
  };
  useEffect(() => {
    // Reset whenever route changes
    setSelected(false);
    setActive("");
    setSelectedItem(null);

    // Cleanup when component unmounts (user leaves page)
    return () => {
      setSelected(false);
      // setActive("");
      // setSelectedItem(null);
    };
  }, [pathname, setSelected, setActive, setSelectedItem]);
  // const handleSelectItem = (item: IItem) => {
  //   setSelected(true);
  //   setActive(item.name);
  //   setSelectedItem(item);

  //   if (isMobile()) {
  //     setTimeout(() => {
  //       const formElement = document.getElementById("form-section");
  //       formElement?.scrollIntoView({ behavior: "smooth", block: "start" });
  //     }, 5000);
  //   }
  // };

  const handleSelectItem = (item: IItem) => {
  setSelected(true);
  setActive(item.name);
  setSelectedItem(item);

  if (isMobile()) {
    const target = document.getElementById("form-section");
    if (!target) return;

    const startY = window.scrollY; // শুরু পজিশন
    const targetY = target.getBoundingClientRect().top + window.scrollY; // টার্গেট পজিশন
    const distance = targetY - startY;
    const duration = 5000; // ৫ সেকেন্ড
    let startTime: number | null = null;

    const animateScroll = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const timeElapsed = currentTime - startTime;

      // easeInOut ফাংশন (smooth effect)
      const progress = Math.min(timeElapsed / duration, 1);
      const ease = progress < 0.5
        ? 2 * progress * progress
        : -1 + (4 - 2 * progress) * progress;

      window.scrollTo(0, startY + distance * ease);

      if (timeElapsed < duration) {
        requestAnimationFrame(animateScroll);
      }
    };

    requestAnimationFrame(animateScroll);
  }
};


  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
    touchEndY.current = null;
  };

  const handleTouchEnd = (e: React.TouchEvent, item: IItem) => {
    touchEndY.current = e.changedTouches[0].clientY;
    if (touchStartY.current !== null && touchEndY.current !== null) {
      const deltaY = Math.abs(touchEndY.current - touchStartY.current);
      if (deltaY < 10) {
        // scroll chhoto, mane tap, function call koro
        handleSelectItem(item);
      }
    }
    touchStartY.current = null;
    touchEndY.current = null;
  };

  return (
    <div className="grid md:grid-cols-4 grid-cols-2 md:gap-4 gap-2 mt-8 bg-mainlight p-2 rounded-lg">
      {singleProduct.items.map((item, idx) => {
        const isLast = idx === singleProduct.items.length - 1;
        const isOdd = singleProduct.items.length % 2 === 1;
        const lastOdd = isLast && isOdd;
        const isActive = active === item.name;

        return (
          <div
            key={item.id}
            onClick={() => handleSelectItem(item)}
            onTouchStart={handleTouchStart}
            onTouchEnd={(e) => handleTouchEnd(e, item)}
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
