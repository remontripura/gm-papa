import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { navItems } from "./Navbar";
import { IoIosArrowDown } from "react-icons/io";
import Image from "next/image";
import { IoMenu, IoWalletOutline } from "react-icons/io5";
import Search from "../search/Search";
import { GoMail } from "react-icons/go";
import Cookies from "js-cookie";
import { FaRegUserCircle, FaSignOutAlt, FaUser } from "react-icons/fa";
import { handleLogout } from "@/lib/logout/logout";
import { TbShoppingCartCheck } from "react-icons/tb";
import { usePathname } from "next/navigation";
import { useCategoryStore } from "@/lib/store/allProductStore/allProductStore";
import { IProduct } from "@/types/productsDataType/productsDataType";

export default function MobileMenu({
  setOpen,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [mobileGameOpen, setMobileGameOpen] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const token = Cookies.get("GM_T");
  const pathname = usePathname();
  const categories = useCategoryStore((state) => state.categories);
  const allProducts: IProduct[] = categories.flatMap(
    (category) => category.products
  );
  useEffect(() => {
    setUserMenuOpen(false);
  }, [pathname]);
  return (
    <div className="flex md:hidden flex-col gap-2">
      {/* Top logo */}
      <div className="flex items-center justify-between">
        <Link href="/" className="text-[18px] font-semibold">
          GMPAPA
        </Link>
        <GoMail className="size-6 text-primary_text hover:text-white transition-colors duration-200" />
      </div>
      <div className="flex items-center w-full justify-between">
        {/* Menu */}
        <div className="">
          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <IoMenu className="text-white size-7 cursor-pointer hover:opacity-80 transition-opacity" />
            </SheetTrigger>

            <SheetContent
              side="left"
              className="mobile-sheet w-4/5 bg-[#040B2D] text-white p-4 overflow-y-auto border-0 shadow-none"
            >
              {/* Inside menu */}
              <Link
                href="/"
                className="text-lg font-semibold block mb-4 hover:text-[#9377FF] transition-colors duration-200"
                onClick={() => setSheetOpen(false)}
              >
                GMPAPA
              </Link>
              <nav className="flex flex-col gap-1">
                {navItems.map((item) =>
                  item.label === "Game" ? (
                    <div key={item.id}>
                      <button
                        onClick={() => setMobileGameOpen((prev) => !prev)}
                        className="flex items-center gap-2 justify-between w-full p-2 hover:bg-[#51535d] rounded transition-colors duration-200"
                      >
                        <p className="flex items-center gap-2">
                          {item.icon}
                          {item.label}
                        </p>
                        <IoIosArrowDown
                          className={`transition-transform duration-300 ${
                            mobileGameOpen ? "rotate-180" : ""
                          }`}
                          size={16}
                        />
                      </button>
                      {mobileGameOpen && (
                        <div className="mt-1 ml-6 space-y-1 border-0 shadow-none">
                          {allProducts.slice(0, 10).map((item) => (
                            <Link
                              key={item.id}
                              href={`/product/${item.slug}`}
                              className="flex items-center gap-2 hover:bg-[#51535d] p-2 rounded transition-colors duration-200"
                              onClick={() => setSheetOpen(false)}
                            >
                              <Image
                                className="size-6 rounded"
                                src={`${process.env.NEXT_PUBLIC_MAIN_BASE}/${item.image}`}
                                alt="game"
                                width={20}
                                height={20}
                              />
                              <span className="text-sm">{item.name}</span>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      key={item.id}
                      href={item.pathName}
                      className="flex items-center gap-2 p-2 hover:bg-[#51535d] rounded transition-colors duration-200"
                      onClick={() => setSheetOpen(false)}
                    >
                      {item.icon}
                      {item.label}
                    </Link>
                  )
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
        <div className="w-9/12">
          <Search className="w-full px-1" resultClass="w-full" />
        </div>
        {token ? (
          <div className="relative group">
            <button className="flex items-center gap-1">
              <FaRegUserCircle
                className="size-8 text-white"
                onClick={() => setUserMenuOpen(!userMenuOpen)}
              />
            </button>

            {/* User Dropdown */}
            <div
              className={`absolute right-0 mt-3 w-48 bg-[#1c223e] rounded-xl shadow-lg overflow-hidden border border-[#2d3359] transition-all duration-300 ${
                userMenuOpen
                  ? "opacity-100 visible translate-y-0"
                  : "opacity-0 invisible -translate-y-2"
              }`}
            >
              <Link
                href="/profile"
                className="flex items-center gap-3 px-4 py-3 hover:bg-[#2d3359] transition-colors text-white"
              >
                <FaUser /> Profile
              </Link>
              <Link
                href="/my-order"
                className="flex items-center gap-3 px-4 py-3 hover:bg-[#2d3359] transition-colors text-white"
              >
                <TbShoppingCartCheck /> My-Order
              </Link>
              <Link
                href="/wallet-balance"
                className="flex items-center gap-3 px-4 py-3 hover:bg-[#2d3359] transition-colors text-white"
              >
                <IoWalletOutline /> Add Wallet 
              </Link>
              <Link
                href="/wallet-history"
                className="flex items-center gap-3 px-4 py-3 hover:bg-[#2d3359] transition-colors text-white"
              >
                <IoWalletOutline /> Wallet History
              </Link>
              <button
                onClick={handleLogout}
                className="flex w-full text-left items-center gap-3 px-4 py-3 hover:bg-[#2d3359] transition-colors text-red-400"
              >
                <FaSignOutAlt /> Logout
              </button>
            </div>
          </div>
        ) : (
          <Button
            onClick={() => setOpen(true)}
            className="bg-gradient-to-l cursor-pointer to-[#E685FF] from-[#9F85FF] px-10 rounded text-white py-2 h-auto hover:opacity-90 transition-opacity"
          >
            Login
          </Button>
        )}
      </div>
    </div>
  );
}
