"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import MainContainer from "@/components/container/MainContainer";
import { GoHome, GoChevronDown } from "react-icons/go";
import { FaRegNewspaper, FaUser, FaSignOutAlt } from "react-icons/fa";
import Image from "next/image";
import LoginModal from "@/components/shared/modal/loginModal";
import MobileMenu from "./MobileMenu";
import { handleLogout } from "@/lib/logout/logout";
import { TbShoppingCartCheck } from "react-icons/tb";
import { IoWalletOutline } from "react-icons/io5";
import { Profile } from "@/types/profile/profile";
import PhoneNumberUpdateModal from "@/components/shared/modal/PhoneNumberUpdateModal";
import { FaWallet } from "react-icons/fa6";
import WalletModalCom from "@/components/shared/modal/AddWalletModal";
import { usePathname } from "next/navigation";

type NavItem = {
  id: number;
  pathName: string;
  label: string;
  icon: React.ReactNode;
};

export const navItems: NavItem[] = [
  { id: 1, pathName: "/", label: "Home", icon: <GoHome size={18} /> },
  {
    id: 2,
    pathName: "/blog",
    label: "Blog",
    icon: <FaRegNewspaper size={16} />,
  },
];

const Navbar = ({ profileData }: { profileData: Profile | null }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [warningModal, setWarningModal] = useState(false);
  const [walletModal, setWalletModal] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (profileData?.user?.phone === null) {
      setWarningModal(true);
    }
  }, [profileData]);

  useEffect(() => {
    if (pathname.startsWith("/wallet-balance")) {
      setWalletModal(false);
    }
  }, [pathname]);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {warningModal && (
        <PhoneNumberUpdateModal
          isOpen={warningModal}
          onClose={() => setWarningModal(false)}
          setWarningModal={setWarningModal}
        />
      )}
      {walletModal && (
        <WalletModalCom
          isOpen={walletModal}
          onClose={() => setWalletModal(false)}
          setWalletModal={setWalletModal}
        />
      )}
      <header
        className={cn(
          "fixed top-0 z-50 w-full transition-all duration-500 text-primary_text",
          isScrolled ? "bg-[#040B2D] shadow-md py-3" : "bg-[#040B2D] py-3"
        )}
      >
        <LoginModal isOpen={open} onClose={() => setOpen(false)} />
        <MainContainer className="px-2">
          {/* ---------- PC Navbar ---------- */}
          <nav className="hidden md:flex justify-between items-center relative h-10">
            {/* Left Menu */}
            <div className="flex items-center gap-12">
              <Link href="/" className="text-[18px] text-white">
                <Image
                  className="w-[120px]"
                  src="/logo.png"
                  alt="logo"
                  width={500}
                  height={500}
                />
              </Link>
              <div className="flex items-center gap-6">
                {navItems.map((item) => (
                  <Link
                    key={item.id}
                    href={item.pathName}
                    className={cn(
                      "text-white hover:text-blue-500 duration-200",
                      typeof window !== "undefined" &&
                        window.location.pathname === item.pathName
                        ? "border-b-2 border-[#9377FF]"
                        : ""
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Right Menu */}
            <div className="flex items-center gap-4 relative">
              {profileData && profileData ? (
                <>
                  <p className="text-white flex items-center gap-2">
                    <FaWallet />
                    <span> ৳{profileData?.user.wallet}</span>
                  </p>
                  <div
                    className="relative group"
                    onMouseEnter={() => setUserMenuOpen(true)}
                    onMouseLeave={() => setUserMenuOpen(false)}
                  >
                    <button className="flex items-center gap-1">
                      {profileData && (
                        <Image
                          className="size-8 rounded-full"
                          src={profileData?.user?.image}
                          alt="img"
                          width={30}
                          height={30}
                        />
                      )}
                      {/* <span className="text-white font-medium">
                        {profileData?.user?.name}
                      </span> */}
                      <GoChevronDown className="size-5 text-white" />
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
                        <IoWalletOutline /> Add Wallet
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
                </>
              ) : (
                <Button
                  onClick={() => setOpen(true)}
                  className="bg-gradient-to-l cursor-pointer to-[#E685FF] from-[#9F85FF] px-10 rounded text-white py-2 h-auto hover:opacity-90 transition-opacity"
                >
                  Login
                </Button>
              )}
            </div>
          </nav>

          {/* ---------- Mobile Navbar ---------- */}
          <MobileMenu
            setOpen={setOpen}
            profileData={profileData}
            setWalletModal={setWalletModal}
          />
        </MainContainer>
      </header>
    </>
  );
};

export default Navbar;
