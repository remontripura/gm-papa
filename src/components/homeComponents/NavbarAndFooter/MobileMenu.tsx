import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { navItems } from "./Navbar";
import Image from "next/image";
import { IoMenu, IoWalletOutline } from "react-icons/io5";
import Cookies from "js-cookie";
import { FaSignOutAlt, FaUser, FaWallet } from "react-icons/fa";
import { handleLogout } from "@/lib/logout/logout";
import { TbShoppingCartCheck } from "react-icons/tb";
import { usePathname } from "next/navigation";
import { Profile } from "@/types/profile/profile";

export default function MobileMenu({
  setOpen,
  profileData,
  setWalletModal,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  profileData: Profile | null;
  setWalletModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [sheetOpen, setSheetOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const token = Cookies.get("FFT");
  const pathname = usePathname();

  useEffect(() => {
    setUserMenuOpen(false);
  }, [pathname]);

  return (
    <div className="flex md:hidden flex-col gap-2">
      {/* Top logo */}
      <div className="flex items-center justify-between"></div>
      <div className="flex items-center w-full justify-between">
        {/* Menu */}
        <div>
          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <div className="flex items-center gap-3">
              <SheetTrigger asChild>
                <IoMenu className="text-white size-7 cursor-pointer hover:opacity-80 transition-opacity" />
              </SheetTrigger>
              <Link href="/" className="text-[18px] font-semibold">
                <Image
                  className="w-[120px]"
                  src="/logo2.png"
                  alt="logo"
                  width={500}
                  height={500}
                />
              </Link>
            </div>

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
                <Image
                  className="w-[120px]"
                  src="/logo2.png"
                  alt="logo"
                  width={500}
                  height={500}
                />
              </Link>
              <nav className="flex flex-col gap-1">
                {navItems.map((item) => (
                  <Link
                    key={item.id}
                    href={item.pathName}
                    className="flex items-center gap-2 p-2 hover:bg-[#51535d] rounded transition-colors duration-200"
                    onClick={() => setSheetOpen(false)}
                  >
                    {item.icon}
                    {item.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        {token ? (
          <div className="relative group">
            <button className="flex items-center gap-4">
              <p className="text-white flex items-center gap-2">
                <FaWallet />
                <span> ৳{profileData?.user.wallet}</span>
              </p>
              <Image
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="size-8 rounded-full"
                src={profileData?.user.image ?? ""}
                alt="img"
                width={30}
                height={30}
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
              <div
                onClick={() => setWalletModal(true)}
                className="flex items-center gap-3 px-4 py-3 hover:bg-[#2d3359] transition-colors text-white"
              >
                <IoWalletOutline /> Add Balance
              </div>
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
